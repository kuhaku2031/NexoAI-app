import { Colors } from "@/constants/Colors";
import { useRef, useState } from "react";
import { FlatList, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { FilterBottomSheetRef } from '@/components/FilterBottomSheet';
import { useProducts } from "@/hooks/useProducts";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { ThemedText } from "./ThemedText";
import { PaginatedProducts, Product } from "@/services/productService";
import { isLoading } from "expo-font";
import { SearchBar } from "./SearchBar";

interface ProductsFlatListProps {
    product: PaginatedProducts;
}

export default function ProductsFlatList(productsFlatListProps: ProductsFlatListProps) {

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'in-stock' | 'low-stock' | 'out-of-stock'>('all');

    const filterSheetRef = useRef<FilterBottomSheetRef>(null);

    // Funciones de filtrado y búsqueda
    const getStockStatus = (product: Product) => {
        if (product.stock === 0) return 'out-of-stock';
        if (product.stock <= 5) return 'low-stock';
        return 'in-stock';
    };

    // const filteredProducts = productsFlatListProps?.product?.filter(product => {
    //     // Filtro por búsqueda
    //     const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         product.category.category_name.toLowerCase().includes(searchQuery.toLowerCase());

    //     // Filtro por estado de stock
    //     const status = getStockStatus(product);
    //     const matchesFilter = selectedFilter === 'all' || status === selectedFilter;

    //     return matchesSearch && matchesFilter;
    // });


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
                    <View style={styles.productImagePlaceholder}>
                        <Ionicons name="cube-outline" size={40} color={Colors.text_seconday} />
                    </View>
                </View>

                {/* Info */}
                <View style={styles.productInfo}>
                    <ThemedText type="defaultSemiBold" style={styles.productName}>
                        {item.name}
                    </ThemedText>
                    {/* <ThemedText style={styles.productCategory}>
            {item.category} • {item.sku}
          </ThemedText> */}

                    <View style={styles.productFooter}>
                        <ThemedText type="defaultSemiBold" style={styles.productPrice}>
                            ${item.selling_price}
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
                </View>

                <FlatList
                    data={productsFlatListProps.product?.data}
                    renderItem={productsItem => renderProduct(productsItem)}
                    keyExtractor={item => productsFlatListProps.product?.data.indexOf(item).toString() || ''}
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
        </>
    )
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