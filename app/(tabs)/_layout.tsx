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
      tabBar={(props) => (
        <FloatingTabBar
          {...props}
          tabs={visibleTabs.map(tab => ({
            name: tab.icon,
            label: tab.title,
            icon: tab.icon,
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