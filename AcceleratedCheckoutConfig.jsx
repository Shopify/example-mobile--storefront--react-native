// [START accelerated-checkouts.configure]
import React, { useState } from 'react';
import {
  ShopifyCheckoutSheetProvider,
  ApplePayContactField,
} from '@shopify/checkout-sheet-kit';
import ProductListScreen from './ProductListScreen';
import CartScreen from './CartScreen';

const checkoutKitConfiguration = {
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
  const [checkoutUrl, setCheckoutUrl] = useState(null);

  return (
    <ShopifyCheckoutSheetProvider configuration={checkoutKitConfiguration}>
      {checkoutUrl ? (
        <CartScreen
          checkoutUrl={checkoutUrl}
          onOrderComplete={() => setCheckoutUrl(null)}
        />
      ) : (
        <ProductListScreen onCheckoutReady={setCheckoutUrl} />
      )}
    </ShopifyCheckoutSheetProvider>
  );
}

export default App;
// [END accelerated-checkouts.configure]
