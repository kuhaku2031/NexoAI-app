// app/(tabs)/products/index.tsx
import { FilterBottomSheetRef } from '@/components/FilterBottomSheet';
import { HeaderBar } from '@/components/HeaderBar';
import { SafeScreen } from '@/components/SafeScreen';
import { SearchBar } from '@/components/SearchBar';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { goBack } from 'expo-router/build/global-state/routing';
import { useRef, useState } from 'react';
import { FlatList, Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

// Tipos
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
  image?: string;
  sku: string;
}

export default function ProductScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'in-stock' | 'low-stock' | 'out-of-stock'>('all');

  const filterSheetRef = useRef<FilterBottomSheetRef>(null);
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 79.99,
      stock: 45,
      lowStockThreshold: 10,
      sku: 'WH-001',
    },
    {
      id: '2',
      name: 'Coffee Maker',
      category: 'Appliances',
      price: 129.99,
      stock: 8,
      lowStockThreshold: 10,
      sku: 'CM-002',
    },
    {
      id: '3',
      name: 'Running Shoes',
      category: 'Sports',
      price: 89.99,
      stock: 0,
      lowStockThreshold: 5,
      sku: 'RS-003',
    },
    {
      id: '4',
      name: 'Backpack',
      category: 'Accessories',
      price: 49.99,
      stock: 23,
      lowStockThreshold: 10,
      sku: 'BP-004',
    },
    {
      id: '5',
      name: 'Smart Watch',
      category: 'Electronics',
      price: 299.99,
      stock: 3,
      lowStockThreshold: 5,
      sku: 'SW-005',
    },
  ]);

  // Funciones de filtrado y búsqueda
  const getStockStatus = (product: Product) => {
    if (product.stock === 0) return 'out-of-stock';
    if (product.stock <= product.lowStockThreshold) return 'low-stock';
    return 'in-stock';
  };

  const filteredProducts = products.filter(product => {
    // Filtro por búsqueda
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());

    // Filtro por estado de stock
    const status = getStockStatus(product);
    const matchesFilter = selectedFilter === 'all' || status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  // Stats
  // const stats = {
  //   total: products.length,
  //   inStock: products.filter(p => getStockStatus(p) === 'in-stock').length,
  //   lowStock: products.filter(p => getStockStatus(p) === 'low-stock').length,
  //   outOfStock: products.filter(p => getStockStatus(p) === 'out-of-stock').length,
  // };

  // Renderizar producto
  const renderProduct = ({ item }: { item: Product }) => {
    const status = getStockStatus(item);
    const statusConfig = {
      'in-stock': { color: Colors.success, text: 'In Stock', icon: 'checkmark-circle' as const },
      'low-stock': { color: Colors.warning, text: 'Low Stock', icon: 'alert-circle' as const },
      'out-of-stock': { color: Colors.error, text: 'Out of Stock', icon: 'close-circle' as const },
    };

    const config = statusConfig[status];

    return (
      <TouchableOpacity style={styles.productCard}>
        {/* Image */}
        <View style={styles.productImageContainer}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.productImage} />
          ) : (
            <View style={styles.productImagePlaceholder}>
              <Ionicons name="cube-outline" size={40} color={Colors.text_seconday} />
            </View>
          )}
        </View>

        {/* Info */}
        <View style={styles.productInfo}>
          <ThemedText type="defaultSemiBold" style={styles.productName}>
            {item.name}
          </ThemedText>
          <ThemedText style={styles.productCategory}>
            {item.category} • {item.sku}
          </ThemedText>

          <View style={styles.productFooter}>
            <ThemedText type="defaultSemiBold" style={styles.productPrice}>
              ${item.price.toFixed(2)}
            </ThemedText>

            <View style={[styles.statusBadge, { backgroundColor: `${config.color}15` }]}>
              <Ionicons name={config.icon} size={14} color={config.color} />
              <ThemedText style={[styles.statusText, { color: config.color }]}>
                {item.stock} units
              </ThemedText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <HeaderBar
        title="Chat AI"
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
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search by name, category or SKU..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            showFilter={true}
            onFilterPress={() => filterSheetRef.current?.open()}
          />
        </View>

        {/* Products List */}
        <View style={styles.listContainer}>
          <View style={styles.listHeader}>
            <ThemedText type="subtitle" style={styles.listTitle}>
              {selectedFilter === 'all' ? 'All Products' : selectedFilter === 'in-stock' ? 'In Stock' : selectedFilter === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
            </ThemedText>
            <ThemedText style={styles.listCount}>
              {filteredProducts.length} products
            </ThemedText>
          </View>

          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={item => item.id}
            contentContainerStyle={[styles.listContent, { paddingBottom: 120 }]}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Ionicons name="search-outline" size={64} color={Colors.disabled} />
                <ThemedText type="subtitle" style={styles.emptyTitle}>
                  No products found
                </ThemedText>
                <ThemedText style={styles.emptySubtitle}>
                  Try adjusting your search or filters
                </ThemedText>
              </View>
            }
          />
        </View>
      </SafeScreen>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <LinearGradient
          colors={[Colors.primary, Colors.accent]}
          style={styles.fabGradient}
        >
          <Ionicons name="add" size={28} color="#ffffff" />
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginBottom: 16,
  },

  // Stats Cards
  statsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statCardActive: {
    borderColor: Colors.primary,
  },
  statGradient: {
    width: '100%',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  statNumberWhite: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 11,
    color: Colors.text_seconday,
    marginTop: 4,
  },
  statLabelWhite: {
    fontSize: 11,
    color: '#ffffff',
    marginTop: 4,
  },

  // List
  listContainer: {
    flex: 1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  listTitle: {
    color: Colors.text_primary,
  },
  listCount: {
    color: Colors.text_seconday,
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 20,
  },

  // Product Card
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  productImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.bg_light_accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    color: Colors.text_primary,
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    color: Colors.text_seconday,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  productPrice: {
    fontSize: 18,
    color: Colors.primary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    color: Colors.text_primary,
    marginTop: 16,
  },
  emptySubtitle: {
    color: Colors.text_seconday,
    marginTop: 8,
  },

  // FAB
  fab: {
    position: 'absolute',
    right: 20,
    bottom: Platform.OS === 'ios' ? 120 : 100,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});