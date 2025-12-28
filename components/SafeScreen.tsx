// components/SafeScreen.tsx
import { Colors } from '@/constants/Colors';
import { ReactNode } from 'react';
import { Animated, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SafeScreenProps {
  children: ReactNode;
  mode?: 'margin' | 'padding';
  style?: ViewStyle;
  clasName?: string;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
  backgroundColor?: string;
  scrollable?: boolean;
  contentContainerStyle?: ViewStyle;
  centered?: boolean;
}

export function SafeScreen({
  children,
  mode = 'margin',
  style,
  clasName,
  edges = ['top', 'bottom'],
  backgroundColor = '',
  scrollable = false,
  contentContainerStyle,
  centered = false,
}: SafeScreenProps) {
  const content = scrollable ? (
    <Animated.ScrollView>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          centered && styles.centered,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </Animated.ScrollView>
  ) : children;

  return (
    <SafeAreaView
      mode={mode}
      className={clasName}
      style={[styles.container, backgroundColor ? { backgroundColor } : { backgroundColor: Colors.bg_light_secondary }, style, contentContainerStyle]}
      edges={edges}
    >
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  centered: {
    justifyContent: 'center',
  },
});