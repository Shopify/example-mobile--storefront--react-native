# Mobile Storefront — React Native

Sample React Native app that fetches products from Shopify using the Storefront API, creates a cart, and presents checkout with [Checkout Kit for React Native](https://github.com/Shopify/checkout-sheet-kit-react-native).

This code accompanies the following tutorials on [shopify.dev](https://shopify.dev):

- [Build a mobile storefront](https://shopify.dev/docs/storefronts/mobile/complete-tutorial)
- [Embed Checkout Kit](https://shopify.dev/docs/storefronts/mobile/checkout-kit/integrate)

## What's included

| File | Description |
|---|---|
| `storefrontClient.js` | Storefront API client — product queries and cart creation |
| `ProductListScreen.jsx` | Product list with Add to Cart |
| `CartScreen.jsx` | Checkout Kit integration with event handling |
| `App.jsx` | App entry point with ShopifyCheckoutSheetProvider |

## Run locally

1. Clone this repo.
2. Run `npm install`.
3. In `storefrontClient.js`, replace `{shop}.myshopify.com` with your store domain and add your Storefront API access token.
4. Run `npx react-native run-ios` or `npx react-native run-android`.

## Requirements

- React Native 0.70+
- iOS 13+ / Android SDK 23+
- A [Shopify development store](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/getting-started) with at least one product
- A Storefront API access token with `unauthenticated_read_product_listings` and `unauthenticated_write_checkouts` scopes

## Contributing

This repository doesn't accept issues or external contributions. It exists as a companion to the tutorials linked above. If you find an issue with the tutorial content, use the feedback form on the tutorial page.

## License

This project is licensed under the [MIT License](LICENSE.md).
