// [START accelerated-checkouts.states]
import React, { useState } from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import {
  AcceleratedCheckoutButtons,
  RenderState,
} from '@shopify/checkout-sheet-kit';

function CheckoutButtons() {
  const [renderState, setRenderState] = useState(RenderState.Loading);

  return (
    <View>
      {renderState === RenderState.Loading && (
        <View style={styles.placeholder}>
          <ActivityIndicator />
        </View>
      )}
      {renderState === RenderState.Error && (
        <View style={styles.placeholder}>
          <Text>Couldn't load checkout. Please try again.</Text>
        </View>
      )}
      <AcceleratedCheckoutButtons
        cartId="gid://shopify/Cart/123"
        onRenderStateChange={(event) => setRenderState(event.state)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: { padding: 16, alignItems: 'center' },
});

export default CheckoutButtons;
// [END accelerated-checkouts.states]
