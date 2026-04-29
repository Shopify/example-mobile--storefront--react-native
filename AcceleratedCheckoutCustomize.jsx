// [START accelerated-checkouts.customize]
import React from 'react';
import {
  AcceleratedCheckoutButtons,
  AcceleratedCheckoutWallet,
  ApplePayStyle,
} from '@shopify/checkout-sheet-kit';

function ShopPayOnly() {
  return (
    <AcceleratedCheckoutButtons
      cartId="gid://shopify/Cart/123"
      wallets={[AcceleratedCheckoutWallet.shopPay]}
    />
  );
}

function ApplePayOnly() {
  return (
    <AcceleratedCheckoutButtons
      cartId="gid://shopify/Cart/123"
      wallets={[AcceleratedCheckoutWallet.applePay]}
    />
  );
}

function BothWallets() {
  return (
    <AcceleratedCheckoutButtons
      cartId="gid://shopify/Cart/123"
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
      cartId="gid://shopify/Cart/123"
      cornerRadius={16}
    />
  );
}

function CustomApplePayStyle() {
  return (
    <AcceleratedCheckoutButtons
      cartId="gid://shopify/Cart/123"
      applePayStyle={ApplePayStyle.whiteOutline}
    />
  );
}

export {
  ShopPayOnly,
  ApplePayOnly,
  BothWallets,
  CustomCornerRadius,
  CustomApplePayStyle,
};
// [END accelerated-checkouts.customize]
