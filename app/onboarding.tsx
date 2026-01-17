import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
  ViewToken,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  bgGradient: string;
}

const slides: OnboardingSlide[] = [
  {
    id: "1",
    title: "Welcome to QR Hub",
    description:
      "Your all-in-one QR code companion. Scan, generate, and manage QR codes with ease.",
    icon: "qr-code",
    iconColor: "#7A4DFF",
    bgGradient: "#7A4DFF",
  },
  {
    id: "2",
    title: "Scan Instantly",
    description:
      "Point your camera at any QR code and get instant results. Fast, accurate, and reliable scanning.",
    icon: "scan",
    iconColor: "#00D4AA",
    bgGradient: "#00D4AA",
  },
  {
    id: "3",
    title: "Generate QR Codes",
    description:
      "Create custom QR codes for URLs, text, contacts, WiFi, and more. Share them easily with anyone.",
    icon: "create",
    iconColor: "#FF6B6B",
    bgGradient: "#FF6B6B",
  },
  {
    id: "4",
    title: "Save Your History",
    description:
      "All your scanned and generated QR codes are saved. Access them anytime from your history.",
    icon: "time",
    iconColor: "#4ECDC4",
    bgGradient: "#4ECDC4",
  },
];

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem("hasOnboarded", "true");
      router.replace("/(tabs)");
    } catch (e) {
      console.warn(e);
    }
  };

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem("hasOnboarded", "true");
      router.replace("/(tabs)");
    } catch (e) {
      console.warn(e);
    }
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={{ width }} className="flex-1 items-center justify-center px-8">
      {/* Icon Container */}
      <View
        style={{
          backgroundColor: `${item.iconColor}15`,
          borderColor: `${item.iconColor}30`,
        }}
        className="w-40 h-40 rounded-full items-center justify-center mb-12 border-2"
      >
        <View
          style={{ backgroundColor: `${item.iconColor}25` }}
          className="w-28 h-28 rounded-full items-center justify-center"
        >
          <Ionicons name={item.icon} size={56} color={item.iconColor} />
        </View>
      </View>

      {/* Title */}
      <Text className="text-white text-3xl font-bold text-center mb-4">
        {item.title}
      </Text>

      {/* Description */}
      <Text className="text-gray-400 text-lg text-center leading-7 px-4">
        {item.description}
      </Text>
    </View>
  );

  const isLastSlide = currentIndex === slides.length - 1;

  return (
    <SafeAreaView className="flex-1 bg-bgDark">
      {/* Skip Button */}
      {!isLastSlide && (
        <View className="absolute top-14 right-6 z-10">
          <Pressable onPress={handleSkip} className="py-2 px-4">
            <Text className="text-gray-400 text-base font-medium">Skip</Text>
          </Pressable>
        </View>
      )}

      {/* Logo at top */}
      <View className="items-center pt-8 pb-4">
        <Image
          source={require("../assets/images/qr_logo.png")}
          style={{ width: 60, height: 60, borderRadius: 12 }}
          resizeMode="contain"
        />
      </View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        bounces={false}
        className="flex-1"
      />

      {/* Pagination and Buttons */}
      <View className="pb-12 px-8">
        {/* Dots */}
        <View className="flex-row justify-center mb-10">
          {slides.map((_, index) => (
            <View
              key={index}
              style={{
                backgroundColor: index === currentIndex ? "#7A4DFF" : "#3A3A3A",
                width: index === currentIndex ? 28 : 10,
              }}
              className="h-2.5 rounded-full mx-1.5"
            />
          ))}
        </View>

        {/* Buttons */}
        {isLastSlide ? (
          <Pressable
            onPress={handleGetStarted}
            style={({ pressed }) => [
              {
                transform: [{ scale: pressed ? 0.98 : 1 }],
                shadowColor: "#7A4DFF",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              },
            ]}
            className="bg-primary rounded-2xl py-5 items-center"
          >
            <Text className="text-white text-lg font-bold">Get Started</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={handleNext}
            style={({ pressed }) => [
              {
                transform: [{ scale: pressed ? 0.98 : 1 }],
              },
            ]}
            className="bg-bgCard border border-border rounded-2xl py-5 items-center flex-row justify-center"
          >
            <Text className="text-white text-lg font-semibold mr-2">Next</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
