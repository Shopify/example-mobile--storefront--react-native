// [START accelerated-checkouts.events]
import React from 'react';
import { AcceleratedCheckoutButtons } from '@shopify/checkout-sheet-kit';

function CheckoutWithEvents({ cartID }) {
  return (
    <AcceleratedCheckoutButtons
      cartID={cartID}
      onComplete={(event) => {
        // Clear cart — cart IDs expire after checkout
      }}
      onFail={(error) => {
        // Show error
      }}
      onCancel={() => {
        // Reset state
      }}
    />
  );
}

export default CheckoutWithEvents;
// [END accelerated-checkouts.events]
