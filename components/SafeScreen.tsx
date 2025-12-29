// components/SafeScreen.tsx - VERSIÓN CORREGIDA
import { Colors } from '@/constants/Colors';
import { ReactNode } from 'react';
import { Platform, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';

interface SafeScreenProps {
  children: ReactNode;
  mode?: 'margin' | 'padding';
  style?: ViewStyle;
  className?: string;
  edges?: Edge[];
  backgroundColor?: string;
  scrollable?: boolean;
  contentContainerStyle?: ViewStyle;
  centered?: boolean;
  hasFloatingTabBar?: boolean;
  hasHeader?: boolean;
}

const FLOATING_TAB_BAR_HEIGHT = Platform.select({
  ios: 88,
  android: 68,
  default: 68,
});

const HEADER_HEIGHT = Platform.select({
  ios: 108,
  android: 128,
  default: 108,
});

export function SafeScreen({
  children,
  mode = 'padding',
  style,
  className,
  edges = ['top'],
  backgroundColor = Colors.bg_light_secondary,
  scrollable = false,
  contentContainerStyle,
  centered = false,
  hasFloatingTabBar = true,
  hasHeader = false,
}: SafeScreenProps) {
  const topPadding = hasHeader ? HEADER_HEIGHT : 0;
  const bottomPadding = hasFloatingTabBar && scrollable 
    ? FLOATING_TAB_BAR_HEIGHT + 20
    : 0;

  const content = scrollable ? (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[
        styles.scrollContent,
        centered && styles.centered,
        contentContainerStyle,
        { paddingTop: topPadding, paddingBottom: bottomPadding },
      ]}
      showsVerticalScrollIndicator={false}
      bounces={true}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.nonScrollableContent, contentContainerStyle, { paddingTop: topPadding, paddingBottom: bottomPadding }]}>
      {children}
    </View>
  );

  return (
    <SafeAreaView
      mode={mode}
      className={className}
      style={[
        styles.container,
        { backgroundColor },
        style,
      ]}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  nonScrollableContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  centered: {
    justifyContent: 'center',
  },
});