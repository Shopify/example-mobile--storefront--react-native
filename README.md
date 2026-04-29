# Mobile Storefront — React Native

Companion code for [shopify.dev](https://shopify.dev) tutorials covering the Storefront API, [Checkout Kit for React Native](https://github.com/Shopify/checkout-sheet-kit-react-native), and Customer Account API authentication.

> **This repository is not a standalone runnable app.** It contains the source files referenced inline by the tutorials. To use them, drop the files into an existing React Native project and add the dependencies listed below.

## Tutorials

- [Build a mobile storefront](https://shopify.dev/docs/storefronts/mobile/build-mobile-storefront)
- [Embed Checkout Kit](https://shopify.dev/docs/storefronts/mobile/checkout-kit)
- [Authenticate checkouts](https://shopify.dev/docs/storefronts/mobile/checkout-kit/authenticate-checkouts)
- [Accelerated checkouts](https://shopify.dev/docs/storefronts/mobile/checkout-kit/accelerated-checkouts)

## What's included

| File | Description |
|---|---|
| `storefrontClient.js` | Storefront API client — product queries, cart creation, cart permalinks |
| `ProductListScreen.jsx` | Product list with Add to Cart |
| `CartScreen.jsx` | Checkout Kit integration with event handling |
| `App.jsx` | App entry point with `ShopifyCheckoutSheetProvider` |
| `authClient.js` | OAuth + PKCE flow against the Customer Account API |
| `AcceleratedCheckout*.jsx` | Accelerated checkout buttons, configuration, customization, events, and render-state handling |

## Use these snippets in your project

1. Copy the relevant files into your React Native project's source tree.
2. Install the npm dependencies imported by these files:

   ```sh
   npm install @shopify/checkout-sheet-kit expo-crypto
   ```

3. In `storefrontClient.js`, replace `{shop}.myshopify.com` with your store domain and add your Storefront API access token.
4. Wrap your app's root in `ShopifyCheckoutSheetProvider` (see `App.jsx`).

## Requirements

- React Native 0.70 or later
- iOS 13 or later / Android SDK 23 or later
- A [Shopify development store](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/getting-started) with at least one product
- A Storefront API access token with `unauthenticated_read_product_listings` and `unauthenticated_write_checkouts` scopes

## Contributing

This repository doesn't accept issues or external contributions. It exists as a companion to the tutorials linked above. If you find an issue with the tutorial content, use the feedback form on the tutorial page.

## License

This project is licensed under the [MIT License](LICENSE.md).
