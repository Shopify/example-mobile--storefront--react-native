import {useEffect} from 'react';
import {Linking} from 'react-native';
import {useShopifyCheckoutSheet} from '@shopify/checkout-sheet-kit';

// [START universal-links.route-url]
class StorefrontURL {
  constructor(url) {
    this.url = url;
    this.parsedUrl = new URL(url);
  }

  isCheckout() {
    return this.parsedUrl.pathname.includes('/checkouts/');
  }

  isCart() {
    return (
      this.parsedUrl.pathname === '/cart' ||
      this.parsedUrl.pathname.startsWith('/cart/')
    );
  }

  isThankYouPage() {
    return /\/thank[-_]you/i.test(this.parsedUrl.pathname);
  }
}

export function useUniversalLinksRouter({navigation}) {
  const shopifyCheckout = useShopifyCheckoutSheet();

  useEffect(() => {
    async function routeUrl(url) {
      const storefrontUrl = new StorefrontURL(url);

      if (storefrontUrl.isCheckout() && !storefrontUrl.isThankYouPage()) {
        shopifyCheckout.present(url);
        return;
      }

      if (storefrontUrl.isCart()) {
        navigation.navigate('Cart');
        return;
      }

      if (await Linking.canOpenURL(url)) {
        await Linking.openURL(url);
      }
    }

    Linking.getInitialURL().then((url) => {
      if (url) routeUrl(url);
    });

    const subscription = Linking.addEventListener('url', ({url}) => {
      routeUrl(url);
    });

    return () => subscription.remove();
  }, [navigation, shopifyCheckout]);
}
// [END universal-links.route-url]

// [START universal-links.use-router]
function Routes({navigation}) {
  useUniversalLinksRouter({navigation});

  return null;
}
// [END universal-links.use-router]
