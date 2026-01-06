// components/StyledDropdown.tsx
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ThemedText } from './ThemedText';

interface ThemedDropDownProps {
    value: any;
    onValueChange: (value: any) => void;
    items: { label: string; value: string }[];
    label?: string;
    placeholder?: string;
    searchable?: boolean;
    multiple?: boolean;
}

export function ThemedDropDown({
    value,
    onValueChange,
    items,
    label = '',
    placeholder = '',
    searchable = false,
    multiple = false,
}: ThemedDropDownProps) {
    const [open, setOpen] = useState(false);
    const [localItems, setLocalItems] = useState(items);

    return (
        <View style={styles.container}>
            <ThemedText type="subtitle" style={styles.label}>{label}</ThemedText>
            <DropDownPicker
                open={open}
                value={value}
                items={localItems}
                setOpen={setOpen}
                setValue={onValueChange}
                setItems={setLocalItems}

                // Estilo principal
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                placeholder={open ? placeholder : localItems.find(i => i.value === value)?.label || placeholder}
                placeholderStyle={styles.placeholder}

                // Dropdown list
                dropDownContainerStyle={styles.dropdownContainer}

                // Búsqueda
                searchable={searchable}
                searchTextInputStyle={styles.searchInput}
                searchPlaceholder="Search..."

                // Multi-select
                multiple={multiple}
                mode="BADGE" // o "SIMPLE"

                // Icons
                ArrowDownIconComponent={() => (
                    <Ionicons name="chevron-down" size={20} color={Colors.text_primary} />
                )}
                ArrowUpIconComponent={() => (
                    <Ionicons name="chevron-up" size={20} color={Colors.text_primary} />
                )}
                TickIconComponent={() => (
                    <Ionicons name="checkmark" size={20} color={Colors.primary} />
                )}

                // Comportamiento
                closeAfterSelecting={!multiple}
                listMode="SCROLLVIEW" // o "MODAL" o "FLATLIST"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

        marginBottom: 8,
    },
    dropdown: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: Colors.bg_light_secondary,
        borderColor: Colors.light_secondary,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        minHeight: 50,
    },
    dropdownText: {
        fontSize: 14,
        color: Colors.text_primary,
        fontWeight: '500',
    },
    placeholder: {
        color: Colors.text_seconday,
        fontSize: 14,
    },
    dropdownContainer: {
        backgroundColor: '#ffffff',
        borderColor: Colors.light_secondary,
        borderWidth: 1,
        borderRadius: 12,
        marginTop: 4,
    },
    searchInput: {
        borderColor: Colors.light_secondary,
        borderRadius: 8,
        paddingHorizontal: 12,
        color: Colors.text_primary,
    },
    label: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
});