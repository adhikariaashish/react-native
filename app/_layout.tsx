import { Stack } from "expo-router";
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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Small delay to show splash screen
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

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
