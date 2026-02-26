// [START accelerated-checkouts.buttons]
import React from 'react';
import { AcceleratedCheckoutButtons } from '@shopify/checkout-sheet-kit';

function CartView() {
  return (
    <AcceleratedCheckoutButtons
      cartID="gid://shopify/Cart/123"
    />
  );
}

function ProductView() {
  return (
    <AcceleratedCheckoutButtons
      variantID="gid://shopify/ProductVariant/123"
      quantity={1}
    />
  );
}

export { CartView, ProductView };
// [END accelerated-checkouts.buttons]
