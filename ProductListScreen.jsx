// [START complete-tutorial.display-products]
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { fetchProducts, createCart } from './storefrontClient';

function ProductListScreen({ onCheckoutReady }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(error => console.error('Failed to load products:', error))
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = async (product) => {
    const variantId = product.variants.edges[0]?.node.id;
    if (!variantId) return;

    try {
      const cart = await createCart(variantId);
      onCheckoutReady(cart.checkoutUrl);
    } catch (error) {
      console.error('Failed to create cart:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {item.featuredImage?.url && (
            <Image
              source={{ uri: item.featuredImage.url }}
              style={styles.image}
            />
          )}
          <View style={styles.details}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>
              ${item.variants.edges[0]?.node.price.amount}{' '}
              {item.variants.edges[0]?.node.price.currencyCode}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAddToCart(item)}
          >
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: { width: 60, height: 60, borderRadius: 8 },
  details: { flex: 1, marginLeft: 12 },
  title: { fontSize: 16, fontWeight: '600' },
  price: { fontSize: 14, color: '#666', marginTop: 4 },
  button: {
    backgroundColor: '#008060',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});

export default ProductListScreen;
// [END complete-tutorial.display-products]
