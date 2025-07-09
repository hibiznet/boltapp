import { Tabs } from 'expo-router';
import { Chrome as Home, MessageCircle, Info, Settings } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: '소개',
          tabBarIcon: ({ color, size }) => (
            <Info color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: '연락처',
          tabBarIcon: ({ color, size }) => (
            <MessageCircle color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '설정',
          tabBarIcon: ({ color, size }) => (
            <Settings color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}