import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function History() {
  return (
    <SafeAreaView className="flex-1 bg-bgDark" edges={["top"]}>
      <ScrollView className="flex-1 bg-bgDark">
        <View className="p-6">
          <Text className="text-3xl font-bold text-textLight mb-2">
            QR History 📜
          </Text>
          <Text className="text-textGray mb-6">
            View your scanned and generated QR codes
          </Text>

          {/* Coming Soon Message */}
          <View className="bg-bgCard border border-border rounded-2xl p-6 mb-4">
            <View className="items-center">
              <Ionicons name="cloud-offline-outline" size={64} color="#666" />
              <Text className="text-textLight text-lg font-bold mt-4 mb-2">
                History Coming Soon
              </Text>
              <Text className="text-textGray text-center mb-4">
                Your QR code history will be available here once you login
              </Text>
              <View className="bg-primary/20 px-4 py-2 rounded-full">
                <Text className="text-primary font-bold">
                  Cloud Sync - Coming Soon ☁️
                </Text>
              </View>
            </View>
          </View>

          {/* Scan History */}
          <View className="mb-6">
            <Text className="text-textLight text-xl font-bold mb-3">
              Scanned QR Codes
            </Text>
            <View className="bg-bgCard border border-border rounded-2xl p-5">
              <View className="items-center py-8">
                <Ionicons name="scan-outline" size={48} color="#666" />
                <Text className="text-textGray mt-3 text-center">
                  No scan history yet
                </Text>
                <Text className="text-textGray text-xs mt-1 text-center">
                  Cloud sync coming soon ☁️
                </Text>
              </View>
            </View>
          </View>

          {/* Generated History */}
          <View className="mb-6">
            <Text className="text-textLight text-xl font-bold mb-3">
              Generated QR Codes
            </Text>
            <View className="bg-bgCard border border-border rounded-2xl p-5">
              <View className="items-center py-8">
                <Ionicons name="qr-code-outline" size={48} color="#666" />
                <Text className="text-textGray mt-3 text-center">
                  No generated QR codes yet
                </Text>
                <Text className="text-textGray text-xs mt-1 text-center">
                  Cloud sync coming soon ☁️
                </Text>
              </View>
            </View>
          </View>

          {/* Favorites */}
          <View>
            <Text className="text-textLight text-xl font-bold mb-3">
              Favorites ⭐
            </Text>
            <View className="bg-bgCard border border-border rounded-2xl p-5">
              <View className="items-center py-8">
                <Ionicons name="heart-outline" size={48} color="#666" />
                <Text className="text-textGray mt-3 text-center">
                  No favorites saved
                </Text>
                <Text className="text-textGray text-xs mt-1 text-center">
                  Mark QR codes as favorites to see them here
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
