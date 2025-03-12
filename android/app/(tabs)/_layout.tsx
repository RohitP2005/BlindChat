import { Stack } from "expo-router";
import { Tabs } from "expo-router/tabs";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen 
        name="tabs/chats" 
        options={{ tabBarLabel: "Chats", tabBarIcon: ({ color }) => <Ionicons name="chatbubbles-outline" size={24} color={color} /> }}
      />
      <Tabs.Screen 
        name="tabs/explore" 
        options={{ tabBarLabel: "Explore", tabBarIcon: ({ color }) => <Ionicons name="people-outline" size={24} color={color} /> }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{ tabBarLabel: "Profile", tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} /> }}
      />
    </Tabs>
  );
}

