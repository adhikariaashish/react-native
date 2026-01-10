import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../src/context/AuthContext";
import { SettingsProvider, useSettings } from "../src/context/SettingsContext";
import "./globals.css";

function AppContent() {
  const { darkMode } = useSettings();

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
