// components/HeaderBar.tsx
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderBarProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  showSearch?: boolean;
  onSearchPress?: () => void;
  showNotifications?: boolean;
  onNotificationsPress?: () => void;
  notificationCount?: number;
  showProfile?: boolean;
  onProfilePress?: () => void;
  rightComponent?: ReactNode;
  leftComponent?: ReactNode;
  variant?: 'default' | 'gradient' | 'transparent';
  backgroundColor?: string;
}

export function HeaderBar({
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
  showSearch = false,
  onSearchPress,
  showNotifications = false,
  onNotificationsPress,
  notificationCount = 0,
  showProfile = false,
  onProfilePress,
  rightComponent,
  leftComponent,
  variant = 'default',
  backgroundColor = 'transparent',
}: HeaderBarProps) {
  const insets = useSafeAreaInsets();

  // Contenido del header
  const HeaderContent = () => (
    <View style={[styles.container, { paddingTop: insets.top + 8 },]}>
      {/* Left Side */}
      <View style={styles.leftContainer}>
        {leftComponent ? (
          leftComponent
        ) : showBackButton ? (
          <TouchableOpacity onPress={onBackPress}>
            <Ionicons name="arrow-back" size={24} color={"#ffffff"} />
          </TouchableOpacity>
        ) : null}

        {title && (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        )}
      </View>

      {/* Right Side */}
      <View style={styles.rightContainer}>
        {rightComponent ? (
          rightComponent
        ) : (
          <>
            {showSearch && (
              <TouchableOpacity style={styles.iconButton} onPress={onSearchPress}>
                <Ionicons name="search-outline" size={24} color={Colors.text_primary} />
              </TouchableOpacity>
            )}

            {showNotifications && (
              <TouchableOpacity style={styles.iconButton} onPress={onNotificationsPress}>
                <View>
                  <Ionicons name="notifications-outline" size={24} color={Colors.text_primary} />
                  {notificationCount > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {notificationCount > 99 ? '99+' : notificationCount}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            )}

            {showProfile && (
              <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
                <View style={styles.avatar}>
                  <Ionicons name="person" size={20} color={Colors.primary} />
                </View>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );

  // Renderizar según variante
  if (variant === 'gradient') {
    return (
      <View style={styles.gradientContainer}>
        <LinearGradient
          colors={[Colors.bg_dark, Colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientWrapper}
        >
          <HeaderContent />
        </LinearGradient>
      </View>
    );
  }

  if (variant === 'transparent') {
    return (
      <View style={[styles.wrapper, { backgroundColor: 'transparent' }]}>
        <HeaderContent />
      </View>
    );
  }

  // Default
  return (
    <View style={[styles.wrapper, { backgroundColor: backgroundColor || Colors.primary }]}>
      <HeaderContent />
    </View>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    width: '100%',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: '#e9f1fb',
  },
  wrapper: {
    width: '100%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  gradientWrapper: {
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    minHeight: 56,
    backgroundColor: Colors.primary,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 12,
    color: Colors.bg_light,
    marginTop: 2,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.bg_light_accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButton: {
    marginLeft: 4,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.light_primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});