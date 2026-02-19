// [START integrate.config]
const STOREFRONT_ACCESS_TOKEN = 'your-storefront-access-token';
const SHOP_DOMAIN = '{shop}.myshopify.com';
const API_VERSION = '2026-01';
// [END integrate.config]

// [START complete-tutorial.fetch-products]
async function fetchProducts() {
  const query = `
    query Products {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            featuredImage { url }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  price { amount currencyCode }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(
    `https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(errors[0].message);
  }

  return data.products.edges.map(edge => edge.node);
}
// [END complete-tutorial.fetch-products]

// [START complete-tutorial.create-cart]
async function createCart(variantId, quantity = 1) {
  const mutation = `
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const response = await fetch(
    `https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          input: {
            lines: [{ merchandiseId: variantId, quantity }],
          },
        },
      }),
    }
  );

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(errors[0].message);
  }

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  return data.cartCreate.cart;
}
// [END complete-tutorial.create-cart]

// [START integrate.cart-permalink]
function buildCartPermalink(variantId, quantity = 1) {
  return `https://${SHOP_DOMAIN}/cart/${variantId}:${quantity}`;
}
// [END integrate.cart-permalink]

export { fetchProducts, createCart, buildCartPermalink, SHOP_DOMAIN };
