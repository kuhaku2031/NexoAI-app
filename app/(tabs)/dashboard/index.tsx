import { Dimensions, StyleSheet, View } from 'react-native';

import { DropDownStyled } from '@/components/DropDwonStyled';
import { HeaderBar } from '@/components/HeaderBar';
import { KPICard } from '@/components/KPICard';
import { SafeScreen } from '@/components/SafeScreen';
import { ThemedText } from '@/components/ThemedText';
import { Colors, ComponentColors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { goBack } from 'expo-router/build/global-state/routing';
import { useState } from 'react';
import { LineChart } from "react-native-chart-kit";

// Calcular ancho correcto restando padding del SafeScreen
const SCREEN_PADDING = 40;
const screenWidth = Dimensions.get("window").width - SCREEN_PADDING;

export default function DashboardScreen() {

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100
        ]
      }
    ]
  };

  const chartConfig = {
    backgroundColor: "transparent",
    backgroundGradientFrom: "rgba(0, 0, 0, 0)", // Totalmente transparente
    backgroundGradientTo: "rgba(0, 0, 0, 0)",   // Totalmente transparente
    backgroundGradientFromOpacity: 0,           // Opacidad 0
    backgroundGradientToOpacity: 0,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: Colors.primary,
    }
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [pointsofsale, setPointsOfSale] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ]);

  return (
    <>
      <HeaderBar
        title="Dashboard"
        subtitle="Welcome back!"
        showNotifications={true}
        notificationCount={5}
        showProfile={true}
        variant="gradient"
        showBackButton={false}
        onBackPress={goBack}
      />
      <SafeScreen
        scrollable={true}
        edges={['bottom', 'left', 'right']}
        hasFloatingTabBar={true}
        hasHeader={true}
        contentContainerStyle={{
          paddingTop: 20,
        }}
      >
        {/* Point Sale */}
        <View style={styles.pointOfSaleContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ backgroundColor: Colors.bg_light_secondary, padding: 8, borderRadius: 8 }}>
              <Ionicons name="location-outline" size={24} color={Colors.accent} />
            </View>
            <View>
              <ThemedText type="defaultSemiBold" style={{ color: Colors.text_primary }}>
                Point of Sale Location
              </ThemedText>
              <ThemedText type="defaultSemiBold" style={{ color: Colors.text_seconday }}>
                Select location to view data
              </ThemedText>
            </View>
          </View>

          <View>
            <DropDownStyled
              value={value}
              onValueChange={setValue}
              open={open}
              setOpen={setOpen}
              items={pointsofsale}
              setItems={setPointsOfSale}
            />
          </View>
        </View>

        {/* KPI Cards Grid*/}
        <View style={styles.kpiContainer}>
          {/* Daily Sales */}
          <View style={styles.kpiCard}>
            <KPICard
              title="Daily Sales"
              value="$4,329"
              icon="cash"
              trend={{
                value: '+12.5%',
                type: 'up',
              }}
              subtitle="from yesterday"
              location="Downtown Branch"
              status="success"
            />
          </View>

          {/* Revenue */}
          <View style={styles.kpiCard}>
            <KPICard
              title="Revenue"
              value="$28,450"
              icon="trending-up"
              trend={{
                value: '+8.2%',
                type: 'up',
              }}
              subtitle="from last week"
              location="Downtown Branch"
              status="success"
            />
          </View>

          {/* Low Stock */}
          <View style={styles.kpiCard}>
            <KPICard
              title="Low Stock"
              value="7"
              icon="alert-circle"
              subtitle="Items need restocking"
              location="Downtown Branch"
              status="danger"
            />
          </View>

          {/* Products */}
          <View style={styles.kpiCard}>
            <KPICard
              title="Products"
              value="1,247"
              icon="cart-outline"
              trend={{
                value: '+12.5%',
                type: 'neutral',
              }}
              subtitle="from yesterday"
              location="Downtown Branch"
              status="warning"
            />
          </View>
        </View>

        {/* Analytics con Gradient - Solo visible con permiso VIEW_ANALYTICS */}
          <View style={styles.analyticsContainer}>
            <LinearGradient
              colors={[Colors.primary, Colors.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientContainer}
            >
              <View style={styles.chartTitleContainer}>
                <ThemedText type="subtitle" className='text-white mx-6' >
                  Weekly Sales
                </ThemedText>
                <ThemedText type="default" className='text-gray-200 mx-6'>
                  Sales performance for Main Store - Current week
                </ThemedText>
              </View>
              <LineChart
                data={data}
                width={screenWidth - 32}
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1}
                chartConfig={chartConfig}
                bezier
                withInnerLines={false}
                withOuterLines={true}
                withVerticalLabels={true}
                withHorizontalLabels={true}
              />
            </LinearGradient>
          </View>

        {/* AI Insights - Solo visible con permiso VIEW_AI_INSIGHTS */}
          <View style={styles.insightsContainer}>

            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ backgroundColor: Colors.bg_light_secondary, padding: 8, borderRadius: 8 }}>
                <Ionicons name="bulb-outline" size={24} color={Colors.accent} />
              </View>
              <View>
                <ThemedText type="defaultSemiBold" style={{ color: Colors.text_primary }} className='text-2xl'>
                  AI Insights
                </ThemedText>
              </View>
            </View>

            {/* Insights cards */}
            <View style={{ flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <View style={styles.insightCard}>
                <ThemedText type="defaultSemiBold" style={{ color: Colors.text_primary, marginBottom: 8 }}>
                  Stock Alert
                </ThemedText>
                <ThemedText type="default" style={{ color: Colors.text_seconday }}>
                  The inventory for Product XYZ is below the reorder level. Consider placing a new order to avoid stockouts.
                </ThemedText>
              </View>
              <View style={styles.insightCard}>
                <ThemedText type="defaultSemiBold" style={{ color: Colors.text_primary, marginBottom: 8 }}>
                  Sales Trend
                </ThemedText>
                <ThemedText type="default" style={{ color: Colors.text_seconday }}>
                  Sales for Category ABC have increased by 15% over the past month. Consider promoting related products to capitalize on this trend.
                </ThemedText>
              </View>
            </View>
          </View>

      </SafeScreen>
    </>
  );
}

const styles = StyleSheet.create({
  // =============================
  // POINT OF SALE STYLES
  // =============================
  pointOfSaleContainer: {
    marginBottom: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: Colors.bg_light_accent,
    gap: 16,
    elevation: 2,
  },

  // =======================================
  // METRICS STYLES
  // =======================================
  kpiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  kpiCard: {
    width: '48%',
    minWidth: 154,
    marginBottom: 12,
  },

  // =============================
  // CHART STYLES (CON GRADIENT)
  // =============================
  analyticsContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gradientContainer: {
    padding: 8,
    borderRadius: 16,
  },
  chartTitleContainer: {
    marginVertical: 12,
    gap: 4,
  },

  // =============================
  // INSIGHTS STYLES
  // =============================
  insightsContainer: {
    flex: 1,
    marginTop: 16,
    marginBottom: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: ComponentColors.card.background,
    gap: 16,
    elevation: 2,
  },
  insightCard: {
    flex: 1,
    backgroundColor: Colors.bg_light_secondary,
    borderRadius: 12,
    padding: 16,
  }
});