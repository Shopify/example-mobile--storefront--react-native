// [START accelerated-checkouts.configure]
import React from 'react';
import {
  Configuration,
  ShopifyCheckoutSheetProvider,
  ApplePayContactField,
} from '@shopify/checkout-sheet-kit';

const checkoutKitConfiguration: Configuration = {
  acceleratedCheckouts: {
    storefrontDomain: '{shop}.myshopify.com',
    storefrontAccessToken: 'your-storefront-access-token',
    customer: {
      email: 'customer@example.com',
      phoneNumber: '0123456789',
      accessToken: 'your-customer-access-token',
    },
    wallets: {
      applePay: {
        merchantIdentifier: 'merchant.com.yourcompany',
        contactFields: [ApplePayContactField.email, ApplePayContactField.phone],
      },
    },
  },
};

function App() {
  return (
    <ShopifyCheckoutSheetProvider configuration={checkoutKitConfiguration}>
      <App />
    </ShopifyCheckoutSheetProvider>
  );
}

export default App;
// [END accelerated-checkouts.configure]
