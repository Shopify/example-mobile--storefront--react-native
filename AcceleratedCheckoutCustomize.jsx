// [START accelerated-checkouts.customize]
import React from 'react';
import {
  AcceleratedCheckoutButtons,
  AcceleratedCheckoutWallet,
} from '@shopify/checkout-sheet-kit';

function ShopPayOnly() {
  return (
    <AcceleratedCheckoutButtons
      cartID="gid://shopify/Cart/123"
      wallets={[AcceleratedCheckoutWallet.shopPay]}
    />
  );
}

function ApplePayOnly() {
  return (
    <AcceleratedCheckoutButtons
      cartID="gid://shopify/Cart/123"
      wallets={[AcceleratedCheckoutWallet.applePay]}
    />
  );
}

function BothWallets() {
  return (
    <AcceleratedCheckoutButtons
      cartID="gid://shopify/Cart/123"
      wallets={[
        AcceleratedCheckoutWallet.shopPay,
        AcceleratedCheckoutWallet.applePay,
      ]}
    />
  );
}

function CustomCornerRadius() {
  return (
    <AcceleratedCheckoutButtons
      cartID="gid://shopify/Cart/123"
      cornerRadius={16}
    />
  );
}

export { ShopPayOnly, ApplePayOnly, BothWallets, CustomCornerRadius };
// [END accelerated-checkouts.customize]
