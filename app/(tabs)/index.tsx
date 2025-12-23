import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-bgDark" edges={["top"]}>
      {/* Refined Header */}
      <View className="flex-row items-center justify-between px-6 py-3">
        <View className="flex-row items-center">
          <View style={{ width: 32, height: 32, marginRight: 10 }}>
            <Image
              source={require("../../assets/images/qr_logo.png")}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 9,
              }}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text className="text-xl font-bold text-textLight">QR Hub</Text>
            <Text className="text-textGray text-xs">
              Scan. Generate. Share.
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1 bg-bgDark"
        showsVerticalScrollIndicator={false}
      >
        {/* Primary Action - Scan QR Code */}
        <View className="px-6 pt-4 pb-3">
          <Pressable
            onPress={() => router.push("/(tabs)/scanner")}
            style={({ pressed }) => [
              {
                transform: [{ scale: pressed ? 0.98 : 1 }],
                shadowColor: "#7A4DFF",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.4,
                shadowRadius: 16,
                elevation: 8,
              },
            ]}
          >
            <View
              className="bg-primary rounded-3xl p-8 items-center"
              style={{
                borderWidth: 1,
                borderColor: "rgba(187, 134, 252, 0.3)",
              }}
            >
              <View
                className="w-20 h-20 rounded-full items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              >
                <Ionicons name="scan" size={44} color="#FFF" />
              </View>
              <Text className="text-white text-2xl font-bold mb-1">
                Scan QR Code
              </Text>
              <Text className="text-white/70 text-sm">
                Point camera at any QR code
              </Text>
            </View>
          </Pressable>
        </View>

        {/* Secondary Actions */}
        <View className="px-6 pb-4">
          <View className="flex-row justify-between">
            <Pressable
              onPress={() => router.push("/(tabs)/generator")}
              style={({ pressed }) => [
                {
                  width: (width - 48 - 12) / 2,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <View
                className="bg-bgCard rounded-2xl p-5 border border-border items-center"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <View
                  className="w-14 h-14 rounded-xl items-center justify-center mb-3"
                  style={{ backgroundColor: "#BB86FC20" }}
                >
                  <Ionicons name="qr-code" size={28} color="#BB86FC" />
                </View>
                <Text className="text-textLight font-bold text-base">
                  Generate
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => router.push("/(tabs)/history")}
              style={({ pressed }) => [
                {
                  width: (width - 48 - 12) / 2,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <View
                className="bg-bgCard rounded-2xl p-5 border border-border items-center"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <View
                  className="w-14 h-14 rounded-xl items-center justify-center mb-3"
                  style={{ backgroundColor: "#66BB6A20" }}
                >
                  <Ionicons name="time" size={28} color="#66BB6A" />
                </View>
                <Text className="text-textLight font-bold text-base">
                  History
                </Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="px-6 pb-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-textLight text-lg font-bold">
              Recent Activity
            </Text>
            <Pressable onPress={() => router.push("/(tabs)/history")}>
              <Text className="text-primary text-sm font-semibold">
                View All
              </Text>
            </Pressable>
          </View>

          <View
            className="bg-bgCard rounded-2xl p-6 border border-border"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 1,
            }}
          >
            <View className="items-center py-4">
              <View
                className="w-16 h-16 rounded-full items-center justify-center mb-3"
                style={{ backgroundColor: "#3A3A3A" }}
              >
                <Ionicons name="archive-outline" size={32} color="#666" />
              </View>
              <Text className="text-textLight font-semibold mb-1">
                No Activity Yet
              </Text>
              <Text className="text-textGray text-xs text-center">
                Your scans and QR codes will appear here
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Features */}
        <View className="px-6 pb-6">
          <Text className="text-textLight text-lg font-bold mb-3">
            Quick Actions
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {[
              { icon: "camera", label: "HD Scan", color: "#7A4DFF" },
              { icon: "copy", label: "Copy", color: "#BB86FC" },
              { icon: "share-social", label: "Share", color: "#66BB6A" },
              { icon: "save", label: "Save", color: "#FFB74D" },
            ].map((item, index) => (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  {
                    width: (width - 48) / 2 - 8,
                    marginBottom: 12,
                    transform: [{ scale: pressed ? 0.96 : 1 }],
                  },
                ]}
              >
                <View
                  className="bg-bgCard rounded-xl p-4 border border-border"
                  style={{
                    height: 68,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                    elevation: 1,
                  }}
                >
                  <View className="flex-row items-center">
                    <View
                      className="w-10 h-10 rounded-lg items-center justify-center mr-3"
                      style={{ backgroundColor: item.color + "20" }}
                    >
                      <Ionicons
                        name={item.icon as any}
                        size={20}
                        color={item.color}
                      />
                    </View>
                    <Text className="text-textLight text-sm font-semibold flex-1">
                      {item.label}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
