import { Platform, StyleSheet, View } from 'react-native';

import { SafeScreen } from '@/components/SafeScreen';
import { ThemedText } from '@/components/ThemedText';
import { goBack } from 'expo-router/build/global-state/routing';
import { HeaderBar } from '@/components/HeaderBar';
import { Colors } from '@/constants/Colors';
import { useProducts } from '@/hooks/useProducts';
import ProductsFlatList from '@/components/ProductsFlatList';

export default function POSScreen() {
  const { data: products, isLoading } = useProducts();

  return (
    <>
      <HeaderBar
        title="Point of Sale"
        subtitle="Always here to help!"
        showNotifications={true}
        notificationCount={5}
        showProfile={true}
        variant="gradient"
        showBackButton={true}
        onBackPress={goBack}
      />

      <SafeScreen
        edges={['bottom', 'left', 'right',]}
        hasHeader={true}
        hasFloatingTabBar={true}
        contentContainerStyle={{
          paddingTop: 16,
          paddingHorizontal: 16,
        }}
      >
        {isLoading ? <ThemedText style={styles.listContent}>Loading products...</ThemedText> : products && <ProductsFlatList product={products} />}


      </SafeScreen>
    </>
  );
}
const styles = StyleSheet.create({
  listContent: {
    textAlign: 'center',
    marginTop: 20,
    color: Colors.text_primary,
  },
});