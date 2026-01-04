import { HeaderBar } from '@/components/HeaderBar';
import { InputDisplay } from '@/components/InputDisplay';
import ProductsFlatList from '@/components/ProductsFlatList';
import { SafeScreen } from '@/components/SafeScreen';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { CreateProduct, useProducts } from '@/hooks/useProducts';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { goBack } from 'expo-router/build/global-state/routing';
import { useState } from 'react';
import { Button, Modal, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';


export default function ProductScreen() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', purchase_price: '', selling_price: '', stock: '' });
  const { data: products, isLoading } = useProducts();
  const CreateProductMutation = CreateProduct();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    console.log('Toggling modal. New state:', !isModalVisible);
  }

  const handleSubmit = () => {
    try {

      

      const newProductData = {
        name: newProduct.name,
        code: 212712228, // Asignar un código adecuado según la lógica de tu aplicación
        purchase_price: parseInt(newProduct.purchase_price),
        selling_price: parseInt(newProduct.selling_price),
        category: 'comida', // O asignar según la lógica de tu aplicación
        stock: parseInt(newProduct.stock, 10)
      };

      console.log('Payload enviado:', JSON.stringify(newProductData, null, 2));

      CreateProductMutation.mutate(newProductData);
      toggleModal();
      setNewProduct({ name: '', purchase_price: '', selling_price: '', stock: '' });
    } catch (error) {
      console.error('Error adding product:', CreateProductMutation.error, error);
    }
  }
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
        {isLoading ? <ThemedText>Loading products...</ThemedText> : products && <ProductsFlatList product={products} />}
      </SafeScreen>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={toggleModal}>
        <LinearGradient
          colors={[Colors.primary, Colors.accent]}
          style={styles.fabGradient}
        >
          <Ionicons name="add" size={28} color="#ffffff" />
        </LinearGradient>
      </TouchableOpacity>

      {/* El Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"  // Opciones: 'slide', 'fade', 'none'
        transparent={true}  // Hace el fondo semi-transparente
        onRequestClose={toggleModal}  // Para Android (botón back)
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ThemedText type="subtitle" style={styles.modalTitle}>Add New Product</ThemedText>
            {/* Formulario */}

            <InputDisplay
              value={newProduct.name}
              onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
              placeholder="Product Name"
              label="Product Name"
              icon={"information-circle-outline"}

            />


            <InputDisplay
              value={newProduct.purchase_price}
              onChangeText={(text) => setNewProduct({ ...newProduct, purchase_price: text })}
              placeholder="Purchase Price"
              label="Purchase Price"
              icon={"information-circle-outline"}
              keyboardType='decimal-pad'
            />


            <InputDisplay
              value={newProduct.selling_price}
              onChangeText={(text) => setNewProduct({ ...newProduct, selling_price: text })}
              placeholder="Selling Price"
              label="Selling Price"
              icon={"information-circle-outline"}
              keyboardType='decimal-pad'
            />

            <InputDisplay
              value={newProduct.stock}
              onChangeText={(text) => setNewProduct({ ...newProduct, stock: text })}
              placeholder="Stock"
              label="Stock"
              icon={"information-circle-outline"}
              keyboardType='numeric'
            />


            {/* Botones */}
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={toggleModal} />
              <Button title="Add Product" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({


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

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Fondo semi-transparente
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    elevation: 10,  // Sombra en Android
    shadowColor: '#000',  // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  modalTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});