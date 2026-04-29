// [START accelerated-checkouts.buttons]
import React from 'react';
import { AcceleratedCheckoutButtons } from '@shopify/checkout-sheet-kit';

function CartView() {
  return (
    <AcceleratedCheckoutButtons
      cartId="gid://shopify/Cart/123"
    />
  );
}

function ProductView() {
  return (
    <AcceleratedCheckoutButtons
      variantId="gid://shopify/ProductVariant/123"
      quantity={1}
    />
  );
}

export { CartView, ProductView };
// [END accelerated-checkouts.buttons]
