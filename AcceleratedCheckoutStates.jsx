// [START accelerated-checkouts.states]
import React, { useState } from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import {
  AcceleratedCheckoutButtons,
  RenderState,
} from '@shopify/checkout-sheet-kit';

function CheckoutButtons() {
  const [renderState, setRenderState] = useState(RenderState.loading);

  return (
    <View>
      {renderState === RenderState.loading && (
        <View style={styles.placeholder}>
          <ActivityIndicator />
        </View>
      )}
      {renderState === RenderState.error && (
        <View style={styles.placeholder}>
          <Text>Couldn't load checkout. Please try again.</Text>
        </View>
      )}
      <AcceleratedCheckoutButtons
        cartID="gid://shopify/Cart/123"
        onRenderStateChange={setRenderState}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: { padding: 16, alignItems: 'center' },
});

export default CheckoutButtons;
// [END accelerated-checkouts.states]
