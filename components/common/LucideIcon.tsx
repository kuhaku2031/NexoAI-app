import { StyleProp, View, ViewStyle, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ICON_MAP, IconName } from '@/constants/IconMaps';

interface LucideIconProps {
    name: IconName;
    size?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
    strokeWidth?: number;
    variant: 'default' | 'gradient' | 'badge';
    gradientColors?: any;
    badgeCount?: number;
    badgeColor?: string;
}

export function LucideIcon({
    name,
    size = 24,
    color = '#000',
    style,
    strokeWidth = 2,
    variant = 'default',
    gradientColors = [],
    badgeCount,
    badgeColor = '#FF3B30',
}: LucideIconProps) {
    const IconComponent = ICON_MAP[name];

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in ICON_MAP`);
        return null;
    }

    if (variant === 'gradient') {
        return (
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                    styles.gradientContainer,
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                    },
                ]}
            >
                <View style={styles.iconContainer}>
                    <IconComponent
                        size={size}
                        color={color}
                        strokeWidth={strokeWidth}
                    />
                </View>
            </LinearGradient>
        )
    }

    if (variant === 'badge') {
        return (
            <View style={styles.badgeContainer}>
                <IconComponent
                    size={size}
                    color={color}
                    strokeWidth={strokeWidth}
                />
                {badgeCount !== undefined && badgeCount > 0 && (
                    <View
                        style={[
                            styles.badge,
                            { backgroundColor: badgeColor },
                        ]}
                    >
                        <View style={styles.badgeText}>
                        </View>
                    </View>
                )}
            </View>
        )
    }
    return (
        <IconComponent
            size={size}
            color={color}
            strokeWidth={strokeWidth}
            style={style}
        />
    );
}


const styles = StyleSheet.create({

    // ===============================  
    // ESTILOS DE GRADIENTE
    // ===============================
    gradientContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    // ===============================  
    // ESTILOS DE BADGE
    // ===============================
    badgeContainer: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ffffff',
    },
    badgeText: {
        paddingHorizontal: 4,
    },
});