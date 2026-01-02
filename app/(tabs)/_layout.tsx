import { FloatingTabBar } from '@/components/FloatingBar';
import { TAB_CONFIGS } from '@/config/tabs.config';
import { Tabs } from 'expo-router';


export default function TabLayout() {


  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => (
        <FloatingTabBar
          {...props}
          tabs={TAB_CONFIGS.map(tab => ({
            name: tab.icon,
            label: tab.title,
            icon: tab.icon,
          }))}
        />
      )}
    >
      {TAB_CONFIGS.map(({ name, title, icon }) => (
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