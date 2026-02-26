// [START accelerated-checkouts.states]
import React, { useState } from 'react';
import {
  AcceleratedCheckoutButtons,
  RenderState,
} from '@shopify/checkout-sheet-kit';

function CheckoutButtons() {
  const [renderState, setRenderState] = useState(RenderState.loading);

  if (renderState === RenderState.loading) {
    return <ProgressView />;
  }

  if (renderState === RenderState.error) {
    return <ErrorState />;
  }

  return (
    <AcceleratedCheckoutButtons
      cartID="gid://shopify/Cart/123"
      onRenderStateChange={setRenderState}
    />
  );
}

export default CheckoutButtons;
// [END accelerated-checkouts.states]
