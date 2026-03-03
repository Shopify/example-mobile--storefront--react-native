import * as Crypto from 'expo-crypto';
import { useShopifyCheckoutSheet } from '@shopify/checkout-sheet-kit';

const shopDomain = '{shop}.myshopify.com';
const customerAccountsApiClientId = 'your-client-id';
const customerAccountsApiRedirectUri = 'shop.{your_shop_id}.app://callback';
const storefrontAccessToken = 'your-storefront-access-token';

let codeVerifier = null;
let savedState = null;

// PKCE

// [START auth.generate-pkce]
function encodeBase64Url(bytes) {
  return Buffer.from(bytes)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function generateCodeVerifier() {
  const bytes = await Crypto.getRandomBytesAsync(32);
  return encodeBase64Url(bytes);
}

export async function generateCodeChallenge(codeVerifier) {
  const digestString = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    codeVerifier,
  );
  return encodeBase64Url(digestString);
}
// [END auth.generate-pkce]

// Endpoint Discovery

// [START auth.discover-endpoints]
async function discoverAuthEndpoints() {
  const discoveryUrl = `https://${shopDomain}/.well-known/openid-configuration`;
  const response = await fetch(discoveryUrl);
  const config = await response.json();

  return {
    authEndpoint: config.authorization_endpoint,
    tokenEndpoint: config.token_endpoint,
  };
}
// [END auth.discover-endpoints]

// Authorization URL

// [START auth.build-auth-url]
function generateRandomString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function buildAuthorizationUrl() {
  codeVerifier = await generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const { authEndpoint } = await discoverAuthEndpoints();
  savedState = generateRandomString(36);

  const url = new URL(authEndpoint);
  url.searchParams.append('scope', 'openid email customer-account-api:full');
  url.searchParams.append('client_id', customerAccountsApiClientId);
  url.searchParams.append('response_type', 'code');
  url.searchParams.append('redirect_uri', customerAccountsApiRedirectUri);
  url.searchParams.append('state', savedState);
  url.searchParams.append('code_challenge', codeChallenge);
  url.searchParams.append('code_challenge_method', 'S256');

  return url.toString();
}
// [END auth.build-auth-url]

// Callback Handling

// [START auth.handle-callback]
export function handleCallback(url) {
  if (!url?.startsWith(customerAccountsApiRedirectUri)) {
    return null;
  }

  const parsed = new URL(url);
  const state = parsed.searchParams.get('state');
  if (state !== savedState) {
    return null;
  }

  return parsed.searchParams.get('code');
}
// [END auth.handle-callback]

// Token Exchange

// [START auth.exchange-token]
export async function requestAccessToken(code) {
  const { tokenEndpoint } = await discoverAuthEndpoints();
  const requestBody = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: customerAccountsApiClientId,
    redirect_uri: customerAccountsApiRedirectUri,
    code: code,
    code_verifier: codeVerifier,
  });

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: requestBody.toString(),
  });

  const json = await response.json();
  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token,
    expiresIn: json.expires_in,
  };
}
// [END auth.exchange-token]

// Authenticated Cart

// [START auth.create-authenticated-cart]
export async function createAuthenticatedCart(variantId, accessToken) {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { checkoutUrl }
        userErrors { field message }
      }
    }
  `;

  const variables = {
    input: {
      lines: [{ merchandiseId: variantId, quantity: 1 }],
      buyerIdentity: { customerAccessToken: accessToken },
    },
  };

  const response = await fetch(
    `https://${shopDomain}/api/2026-01/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    },
  );

  const json = await response.json();
  return json.data.cartCreate.cart.checkoutUrl;
}
// [END auth.create-authenticated-cart]

// Present Checkout

// [START auth.present-checkout]
export function presentCheckout(shopifyCheckout, checkoutUrl) {
  shopifyCheckout.present(checkoutUrl);
}
// [END auth.present-checkout]
