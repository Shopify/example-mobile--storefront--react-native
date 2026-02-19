// [START complete-tutorial.present-checkout]
// [START integrate.present-checkout]
import React, { useEffect } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { useShopifyCheckoutSheet } from '@shopify/checkout-sheet-kit';

function CartScreen({ checkoutUrl, onOrderComplete }) {
  const shopifyCheckout = useShopifyCheckoutSheet();

  useEffect(() => {
    const completedSub = shopifyCheckout.addEventListener(
      'completed',
      (event) => {
        console.log('Order completed:', event.orderDetails.id);
        onOrderComplete(event);
      }
    );

    const canceledSub = shopifyCheckout.addEventListener(
      'canceled',
      () => {
        console.log('Checkout canceled');
      }
    );

    const failedSub = shopifyCheckout.addEventListener(
      'error',
      (error) => {
        console.error('Checkout failed:', error);
      }
    );

    return () => {
      completedSub.remove();
      canceledSub.remove();
      failedSub.remove();
    };
  }, [shopifyCheckout]);

  const handleCheckout = () => {
    shopifyCheckout.present(checkoutUrl);
  };

  return (
    <View style={styles.container}>
      <Button title="Checkout" onPress={handleCheckout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
});

export default CartScreen;
// [END integrate.present-checkout]
// [END complete-tutorial.present-checkout]
