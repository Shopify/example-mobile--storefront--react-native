// [START integrate.import]
import React, { useState } from 'react';
import { ShopifyCheckoutSheetProvider } from '@shopify/checkout-sheet-kit';
import ProductListScreen from './ProductListScreen';
import CartScreen from './CartScreen';

function App() {
  const [checkoutUrl, setCheckoutUrl] = useState(null);

  return (
    <ShopifyCheckoutSheetProvider>
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
// [END integrate.import]
