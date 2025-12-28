import { Colors, ComponentColors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type TrendType = 'up' | 'down' | 'neutral';
type StatusType = 'success' | 'warning' | 'danger' | 'info';

interface KPICardProps {
  title: string;
  value: string | number;
  icon?: keyof typeof Ionicons.glyphMap;
  subtitle?: string;
  trend?: {
    value: string;
    type?: TrendType;
  };
  location?: string;
  status?: StatusType;
  badge?: ReactNode;
}

export function KPICard({
  title,
  value,
  icon,
  subtitle,
  trend,
  location,
  status = 'info',
}: KPICardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return '#34C759';
      case 'warning':
        return '#FF9500';
      case 'danger':
        return '#FF3B30';
      default:
        return Colors.primary;
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;

    switch (trend.type) {
      case 'up':
        return 'trending-up';
      case 'down':
        return 'trending-down';
      default:
        return 'remove';
    }
  };

  const getTrendColor = () => {
    if (!trend) return Colors.secondary;

    switch (trend.type) {
      case 'up':
        return '#34C759';
      case 'down':
        return '#FF3B30';
      default:
        return Colors.bg_light;
    }
  };

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {icon && (
          <View style={[styles.iconContainer, { backgroundColor: `${getStatusColor()}15` }]}>
            <Ionicons name={icon} size={20} color={getStatusColor()} />
          </View>
        )}
      </View>

      {/* Main Value */}
      <Text style={styles.value}>{value}</Text>

      {/* Trend/Subtitle */}
      {trend && (
        <View style={styles.trendContainer}>
          <Ionicons
            name={getTrendIcon() as any}
            size={14}
            color={getTrendColor()}
          />
          <Text style={[styles.trendText, { color: getTrendColor() }]}>
            {trend.value}
          </Text>

        </View>

      )}
      {subtitle && (
        <Text style={styles.subtitle}> {subtitle}</Text>
      )}
      {/* Location */}
      {location && (
        <Text style={styles.location}>{location}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    aspectRatio: 0.9,
    backgroundColor: ComponentColors.card.background,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    minHeight: 120,
    minWidth: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text_seconday,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  trendText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.text_seconday,
  },
  location: {
    fontSize: 12,
    color: Colors.text_seconday,
    marginTop: 4,
  },
});