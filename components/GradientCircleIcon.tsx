// components/GradientCircleIcon.tsx
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import * as icons from 'lucide-react-native/icons';
interface GradientCircleIconProps {
  iconName: keyof typeof icons;
  iconSize?: number;
  gradientColors?: any;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  iconColor?: string;
  circleSize?: number;
}

export function GradientCircleIcon({
  iconName,
  iconSize = 30,
  gradientColors = [],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  iconColor = "",
  circleSize = 30,
}: GradientCircleIconProps) {
  const LucideIcon = icons[iconName];
  return (
    <LinearGradient
      colors={gradientColors}
      start={start}
      end={end}
      style={[
        styles.gradientContainer,
        {
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <LucideIcon
          size={iconSize}
          color={iconColor}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});