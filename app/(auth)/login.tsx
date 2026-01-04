// app/(auth)/login.tsx
import { DividerWithText } from '@/components/DividerWithText';
import { GradientCircleIcon } from '@/components/GradientCircleIcon';
import { InputDisplay } from '@/components/InputDisplay';
import { SafeScreen } from '@/components/SafeScreen';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { Colors, ComponentColors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { Checkbox } from 'expo-checkbox';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, StyleSheet, View } from 'react-native';

export default function LoginScreen() {

  const { login, isLoading } = useAuth();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isChecked, setChecked] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingrese email y contraseña');
      return;
    }

    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Credenciales inválidas o error de conexión' + error);
    }
  };

  return (
    <SafeScreen
      mode={"padding"}
      edges={['top', 'bottom']}
      contentContainerStyle={{ paddingTop: 20, paddingBottom: Platform.OS === 'ios' ? 88 : 68, paddingHorizontal: 24 }}
      backgroundColor={Colors.bg_light}>

      <View style={styles.content}>
        <View style={styles.header}>
          <GradientCircleIcon iconName="BrainCircuit" iconSize={40} circleSize={80} iconColor={"#ffffff"} gradientColors={[Colors.primary, Colors.secondary]}/>
          <ThemedText type='title' style={{ color: Colors.primary }}>Business POS</ThemedText>
          <ThemedText type='subtitle' style={{ color: Colors.secondary }}>Inicia sesión en tu cuenta</ThemedText>
        </View>

        {/* Form */}
        <View style={styles.form}>

          <InputDisplay className='border-[#90e0ef]' value={email} onChangeText={setEmail} placeholder='Email' label='Email' icon={"mail-outline"} />

          <InputDisplay className='border-[#90e0ef]' value={password} onChangeText={setPassword} placeholder='Contraseña' label='Contraseña' icon={"lock-closed-outline"} showToggle={false} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8 }}>
            <View style={styles.checkboxContainer}>
              <Checkbox value={isChecked} onValueChange={setChecked} style={styles.checkbox} color={Colors.primary} />
              <ThemedText style={styles.text}>Recordarme</ThemedText>
            </View>
            <ThemedText type='link'  >Olvidaste tu contraseña?</ThemedText>
          </View>

          <ThemedButton
            title={isLoading ? 'Iniciando...' : 'Iniciar Sesion'}
            onPress={handleLogin}
            type='gradient'
            disabled={isLoading}
          />

          <DividerWithText text="¿No tienes cuenta?" />

          <ThemedButton title='Crear Cuenta' type='outline' onPress={() => router.push('/register')} />
        </View>
      </View>

      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <ThemedText type='default' style={{ color: Colors.secondary, fontSize: 16, textAlign: 'center' }}>Al continuar, aceptas nuestros Términos de Servicio</ThemedText>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  content: {
    width: '100%',
  },

  header: {
    marginBottom: 20,
    alignItems: 'center',
    gap: 12,
  },

  form: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    gap: 10,
  },
  title: {
    color: "#fffffff",
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    color: ComponentColors.input.text,
  },
  checkbox: {
    marginLeft: 4,
  },
  signinButton: {
    marginTop: 10,
  },
});