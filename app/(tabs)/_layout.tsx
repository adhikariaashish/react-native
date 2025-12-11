import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Image, View } from "react-native";

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
          tabBarIcon: ({ color, focused, size }) => (
            <View
              style={{
                width: 45,
                height: 45,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? "#7A4DFF20" : "transparent",
                borderRadius: 12,
              }}
            >
              <Image
                source={require("../../assets/images/qr_logo.png")}
                style={{
                  width: 32,
                  height: 32,
                  tintColor: color,
                }}
                resizeMode="contain"
              />
            </View>
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
                width: 65,
                height: 65,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? "#7A4DFF" : "#2A2A2A",
                borderRadius: 18,
                marginTop: -20,
                borderWidth: 4,
                borderColor: "#1E1E1E",
                elevation: 8,
                shadowColor: "#7A4DFF",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: focused ? 0.5 : 0.2,
                shadowRadius: 8,
              }}
            >
              <Ionicons
                name="scan"
                size={32}
                color={focused ? "#FFFFFF" : color}
              />
            </View>
          ),
          tabBarLabel: ({ focused, color }) => null, // Hide label for middle button
        }}
      />
      <Tabs.Screen
        name="generator"
        options={{
          title: "Generate",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                width: 45,
                height: 45,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? "#7A4DFF20" : "transparent",
                borderRadius: 12,
              }}
            >
              <Ionicons
                name={focused ? "qr-code" : "qr-code-outline"}
                size={28}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
