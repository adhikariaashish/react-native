import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Home() {
  const features = [
    {
      icon: "scan",
      title: "Quick Scan",
      description: "Scan any QR code instantly",
      color: "#7A4DFF",
      route: "/(tabs)/scanner",
    },
    {
      icon: "qr-code",
      title: "Generate QR",
      description: "Create custom QR codes",
      color: "#BB86FC",
      route: "/(tabs)/generator",
    },
  ];

  const stats = [
    { label: "Fast Scanning", value: "⚡", color: "#FFB74D" },
    { label: "High Quality", value: "✨", color: "#7A4DFF" },
    { label: "Easy Share", value: "🚀", color: "#66BB6A" },
  ];

  return (
    <ScrollView className="flex-1 bg-bgDark">
      {/* Hero Section */}
      <View className="items-center pt-8 pb-6 px-6">
        <View className="items-center mb-6">
          <View className="bg-primary/20 p-6 rounded-full mb-4">
            <Image
              source={require("../../assets/images/qr_logo.png")}
              style={{ width: 80, height: 80, tintColor: "#BB86FC" }}
              resizeMode="contain"
            />
          </View>
          <Text className="text-4xl font-bold text-textLight mb-2">QR Hub</Text>
          <Text className="text-textGray text-center text-base">
            Your all-in-one QR code solution
          </Text>
        </View>

        {/* Quick Stats */}
        <View className="flex-row justify-around w-full mb-6">
          {stats.map((stat, index) => (
            <View key={index} className="items-center">
              <Text style={{ fontSize: 32 }}>{stat.value}</Text>
              <Text className="text-textGray text-xs mt-1">{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Main Actions */}
      <View className="px-6 pb-6">
        <Text className="text-xl font-bold text-textLight mb-4">
          Get Started
        </Text>

        {features.map((feature, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(feature.route as any)}
            className="mb-4"
          >
            <View className="bg-bgCard rounded-3xl p-6 border border-border">
              <View className="flex-row items-center">
                <View
                  style={{ backgroundColor: feature.color + "20" }}
                  className="w-16 h-16 rounded-2xl items-center justify-center mr-4"
                >
                  <Ionicons
                    name={feature.icon as any}
                    size={32}
                    color={feature.color}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-textLight text-xl font-bold mb-1">
                    {feature.title}
                  </Text>
                  <Text className="text-textGray text-sm">
                    {feature.description}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#666" />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Features Grid */}
        <Text className="text-xl font-bold text-textLight mb-4 mt-6">
          Features
        </Text>

        <View className="flex-row flex-wrap justify-between">
          {[
            { icon: "camera", label: "HD Scanning", color: "#7A4DFF" },
            { icon: "copy", label: "Quick Copy", color: "#BB86FC" },
            { icon: "share-social", label: "Easy Share", color: "#66BB6A" },
            { icon: "save", label: "Save QR", color: "#FFB74D" },
            { icon: "link", label: "URL Support", color: "#42A5F5" },
            { icon: "text", label: "Text QR", color: "#EF5350" },
          ].map((item, index) => (
            <View
              key={index}
              className="bg-bgCard rounded-2xl p-4 mb-4 border border-border items-center"
              style={{ width: (width - 60) / 2 }}
            >
              <View
                style={{ backgroundColor: item.color + "20" }}
                className="w-12 h-12 rounded-xl items-center justify-center mb-2"
              >
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={item.color}
                />
              </View>
              <Text className="text-textLight text-sm font-semibold">
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Info Section */}
        <View className="bg-primary/10 rounded-2xl p-5 mt-4 border border-primary/30">
          <View className="flex-row items-start">
            <Ionicons name="information-circle" size={24} color="#BB86FC" />
            <View className="flex-1 ml-3">
              <Text className="text-textLight font-bold text-base mb-1">
                How to use
              </Text>
              <Text className="text-textGray text-sm leading-5">
                Tap on &quot;Scan&quot; to scan any QR code with your camera, or
                use &quot;Generate&quot; to create your own custom QR codes for
                sharing text, URLs, and more.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
