import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#BB86FC",
        tabBarInactiveTintColor: "#666",
        tabBarStyle: {
          backgroundColor: "#1E1E1E",
          borderTopWidth: 1,
          borderTopColor: "#3A3A3A",
          height: 80,
          paddingBottom: 15,
          paddingTop: 10,
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 4,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="generator"
        options={{
          title: "Generate",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "qr-code" : "qr-code-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                width: 56,
                height: 56,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? "#7A4DFF" : "#BB86FC",
                borderRadius: 16,
                marginBottom: 20,
              }}
            >
              <Ionicons
                name={focused ? "scan" : "scan-outline"}
                size={32}
                color="#FFF"
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "time" : "time-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
