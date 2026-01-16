import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { AuthProvider } from "../src/context/AuthContext";
import { SettingsProvider, useSettings } from "../src/context/SettingsContext";
import "./globals.css";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { darkMode } = useSettings();
  const router = useRouter();
  const segments = useSegments();
  const [isReady, setIsReady] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    async function prepare() {
      try {
        // Check if user has completed onboarding
        const onboardingComplete = await AsyncStorage.getItem("hasOnboarded");
        setHasOnboarded(onboardingComplete === "true");
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        // Hide splash screen after a brief moment to show the logo
        setTimeout(() => {
          SplashScreen.hideAsync();
        }, 500);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (!isReady || hasOnboarded === null) return;

    const inOnboarding = segments[0] === "onboarding";

    if (!hasOnboarded && !inOnboarding) {
      router.replace("/onboarding");
    }
  }, [isReady, hasOnboarded, segments, router]);

  if (!isReady) {
    return null;
  }

  return (
    <>
      <StatusBar
        style={darkMode ? "light" : "dark"}
        translucent
        backgroundColor="transparent"
      />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: darkMode ? "#121212" : "#FFFFFF" },
        }}
      />
    </>
  );
}

export default function RootLayout() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SettingsProvider>
  );
}
