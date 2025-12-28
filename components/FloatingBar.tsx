// components/FloatingBar.tsx - CON LUCIDE ICONS
import { Colors } from '@/constants/Colors';
import { IconName } from '@/constants/IconMaps';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  SharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LucideIcon } from './common/LucideIcon';

interface TabItem {
  name: string;
  label: string;
  icon: IconName; 
  activeIcon?: IconName;
}

interface FloatingTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  tabs: TabItem[];
}

export function FloatingTabBar({
  state,
  descriptors,
  navigation,
  tabs,
}: FloatingTabBarProps) {
  const selectedIndex = useSharedValue(state.index);
  const insets = useSafeAreaInsets();

  const handlePress = (route: any, index: number, isFocused: boolean) => {
    selectedIndex.value = withSpring(index);

    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return (
    <View 
      style={[
        styles.container,
        { 
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 0,
        }
      ]}
    >
      <BlurView
        intensity={Platform.OS === 'ios' ? 100 : 80}
        tint="light"
        style={styles.blurContainer}
      >
        <View style={styles.tabContainer}>
          {state.routes.map((route: any, index: number) => {
            const isFocused = state.index === index;
            const tab = tabs[index];

            if (!tab) return null;

            return (
              <TabButton
                key={route.key}
                route={route}
                index={index}
                isFocused={isFocused}
                tab={tab}
                onPress={handlePress}
              />
            );
          })}
        </View>

        <AnimatedIndicator
          selectedIndex={selectedIndex}
          tabCount={tabs.length}
        />
      </BlurView>
    </View>
  );
}

interface TabButtonProps {
  route: any;
  index: number;
  isFocused: boolean;
  tab: TabItem;
  onPress: (route: any, index: number, isFocused: boolean) => void;
}

function TabButton({ route, index, isFocused, tab, onPress }: TabButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.85);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  // Determinar qué icono usar (activo o inactivo)
  const iconToShow = isFocused && tab.activeIcon ? tab.activeIcon : tab.icon;

  return (
    <Pressable
      onPress={() => onPress(route, index, isFocused)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.tabButton}
    >
      <Animated.View style={[styles.iconContainer, animatedStyle]}>
        {isFocused ? (
          <LinearGradient
            colors={[Colors.accent, Colors.primary]}
            style={styles.activeBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <LucideIcon
              name={iconToShow}
              size={24}
              color="#ffffff"
              strokeWidth={2.5}
              variant='default'
            />
          </LinearGradient>
        ) : (
          <LucideIcon
            name={iconToShow}
            size={24}
            color={Colors.text_seconday}
            strokeWidth={2}
            variant='default'
          />
        )}
      </Animated.View>

      <Text
        style={[
          styles.label,
          isFocused && styles.labelActive,
        ]}
        numberOfLines={1}
      >
        {tab.label}
      </Text>
    </Pressable>
  );
}

interface AnimatedIndicatorProps {
  selectedIndex: SharedValue<number>;
  tabCount: number;
}

function AnimatedIndicator({
  selectedIndex,
  tabCount,
}: AnimatedIndicatorProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const tabWidth = 100 / tabCount;
    return {
      transform: [
        {
          translateX: withSpring(selectedIndex.value * (tabWidth * 3.6), {
            damping: 20,
            stiffness: 85,
          }),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.indicator, animatedStyle]}>
      <LinearGradient
        colors={[Colors.primary, Colors.accent]}
        style={styles.indicatorGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    zIndex: 1000,
  },
  blurContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderBottomWidth: 0,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    marginBottom: 4,
  },
  activeBackground: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.text_seconday,
    marginTop: 4,
  },
  labelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '20%',
    height: 3,
  },
  indicatorGradient: {
    flex: 1,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
});