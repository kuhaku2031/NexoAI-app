// components/PasswordInput.tsx
import { Colors, ComponentColors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface PasswordInputProps {
    value: string;
    onChangeText: (text: string) => void;
    icon?: any;
    placeholder?: string;
    label?: string;
    showToggle?: boolean;
    className?: string;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'decimal-pad' | 'number-pad';
}

export function InputDisplay({
    value,
    onChangeText,
    placeholder = '',
    label = '',
    icon = '',
    showToggle = true,
    className = '',
    keyboardType = 'default',
}: PasswordInputProps) {

    const [showPassword, setShowPassword] = useState(false);

    // Opción 1: Mostrar puntos en lugar del texto

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View  className={className} style={styles.inputWrapper}>
                {/* Icono del candado */}
                <Ionicons
                    name={icon}
                    size={20}
                    color={Colors.accent}
                    style={styles.icon}
                />

                {/* Input con puntos */}
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    secureTextEntry={showToggle === true ? false : !showPassword  }
                    keyboardType={keyboardType}
                />

                {/* Botón toggle */}
                {showToggle === true ? null : 
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.iconButton}
                >
                    <Ionicons
                        name={showPassword ? 'eye' : 'eye-off'}
                        size={20}
                        color={Colors.accent}
                    />
                </TouchableOpacity>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
    },
    label: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ComponentColors.input.background,
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 50,
        borderWidth: 1,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: ComponentColors.input.text,
        fontSize: 14,
    },
    iconButton: {
        padding: 8,
        marginLeft: 10,
    },
});