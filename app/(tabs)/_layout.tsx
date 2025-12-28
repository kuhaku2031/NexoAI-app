import { FloatingTabBar } from '@/components/FloatingBar';
import { getVisibleTabs } from '@/config/tabs.config';
import { useAuth } from '@/hooks/useAuth';
import { Tabs } from 'expo-router';
import { useMemo } from 'react';


export default function TabLayout() {
  const { hasPermission, isAuthenticated } = useAuth();

  const visibleTabs = useMemo(() => {
    if (!isAuthenticated) {
      return [];
    }
    return getVisibleTabs(hasPermission);
  }, [hasPermission, isAuthenticated]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      // Usa tu tab bar personalizado
      tabBar={(props) => (
        <FloatingTabBar
          {...props}
          tabs={visibleTabs.map(tab => ({
            name: tab.name,
            label: tab.title,
            icon: tab.icon,
            // Opcional: icono activo diferente
            activeIcon: tab.icon.replace('-outline', ''),
          }))}
        />
      )}
    >
      {visibleTabs.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title: title,
          }}
        />
      ))}

      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}