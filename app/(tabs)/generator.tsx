import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Screen = "main" | "login" | "signup" | "forgot" | "history" | "settings";

export default function Profile() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("main");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Auth form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Settings states
  const [autoSave, setAutoSave] = useState(true);
  const [scanSound, setScanSound] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  // Mock user data
  const userName = isLoggedIn ? "John Doe" : "Guest";
  const userEmail = isLoggedIn ? "john.doe@example.com" : "";

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setIsLoggedIn(true);
    setCurrentScreen("main");
    Alert.alert("Success", "Logged in successfully!");
  };

  const handleSignup = () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setIsLoggedIn(true);
    setCurrentScreen("main");
    Alert.alert("Success", "Account created successfully!");
  };

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    Alert.alert("Success", "Password reset link sent to your email");
    setCurrentScreen("login");
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          setIsLoggedIn(false);
          setEmail("");
          setPassword("");
          setName("");
        },
      },
    ]);
  };

  // Login Screen
  if (currentScreen === "login") {
    return (
      <SafeAreaView className="flex-1 bg-bgDark" edges={["top"]}>
        <ScrollView className="flex-1 bg-bgDark">
          <View className="p-6">
            <TouchableOpacity
              onPress={() => setCurrentScreen("main")}
              className="mb-4"
            >
              <Ionicons name="arrow-back" size={24} color="#BB86FC" />
            </TouchableOpacity>

            <Text className="text-3xl font-bold text-textLight mb-2">
              Welcome Back 👋
            </Text>
            <Text className="text-textGray mb-8">
              Login to sync your QR history
            </Text>

            <View className="mb-6">
              <Text className="text-textLight mb-2 font-semibold">Email</Text>
              <TextInput
                className="bg-bgCard border border-border rounded-xl p-4 text-textLight"
                placeholder="Enter your email"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-6">
              <Text className="text-textLight mb-2 font-semibold">
                Password
              </Text>
              <TextInput
                className="bg-bgCard border border-border rounded-xl p-4 text-textLight"
                placeholder="Enter your password"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              onPress={() => setCurrentScreen("forgot")}
              className="mb-6"
            >
              <Text className="text-primary text-right">Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogin}
              className="bg-primary rounded-xl p-4 mb-4"
              style={{
                shadowColor: "#7A4DFF",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <Text className="text-white text-center font-bold text-lg">
                Login
              </Text>
            </TouchableOpacity>

            <View className="flex-row justify-center">
              <Text className="text-textGray">
                Don&apos;t have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => setCurrentScreen("signup")}>
                <Text className="text-primary font-semibold">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Sign Up Screen
  if (currentScreen === "signup") {
    return (
      <SafeAreaView className="flex-1 bg-bgDark" edges={["top"]}>
        <ScrollView className="flex-1 bg-bgDark">
          <View className="p-6">
            <TouchableOpacity
              onPress={() => setCurrentScreen("main")}
              className="mb-4"
            >
              <Ionicons name="arrow-back" size={24} color="#BB86FC" />
            </TouchableOpacity>

            <Text className="text-3xl font-bold text-textLight mb-2">
              Create Account ✨
            </Text>
            <Text className="text-textGray mb-8">
              Sign up to start saving your QR codes
            </Text>

            <View className="mb-6">
              <Text className="text-textLight mb-2 font-semibold">
                Full Name
              </Text>
              <TextInput
                className="bg-bgCard border border-border rounded-xl p-4 text-textLight"
                placeholder="Enter your name"
                placeholderTextColor="#666"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View className="mb-6">
              <Text className="text-textLight mb-2 font-semibold">Email</Text>
              <TextInput
                className="bg-bgCard border border-border rounded-xl p-4 text-textLight"
                placeholder="Enter your email"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-8">
              <Text className="text-textLight mb-2 font-semibold">
                Password
              </Text>
              <TextInput
                className="bg-bgCard border border-border rounded-xl p-4 text-textLight"
                placeholder="Create a password"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              onPress={handleSignup}
              className="bg-primary rounded-xl p-4 mb-4"
              style={{
                shadowColor: "#7A4DFF",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <Text className="text-white text-center font-bold text-lg">
                Sign Up
              </Text>
            </TouchableOpacity>

            <View className="flex-row justify-center">
              <Text className="text-textGray">Already have an account? </Text>
              <TouchableOpacity onPress={() => setCurrentScreen("login")}>
                <Text className="text-primary font-semibold">Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Forgot Password Screen
  if (currentScreen === "forgot") {
    return (
      <SafeAreaView className="flex-1 bg-bgDark" edges={["top"]}>
        <ScrollView className="flex-1 bg-bgDark">
          <View className="p-6">
            <TouchableOpacity
              onPress={() => setCurrentScreen("login")}
              className="mb-4"
            >
              <Ionicons name="arrow-back" size={24} color="#BB86FC" />
            </TouchableOpacity>

            <Text className="text-3xl font-bold text-textLight mb-2">
              Forgot Password 🔐
            </Text>
            <Text className="text-textGray mb-8">
              Enter your email to receive a password reset link
            </Text>

            <View className="mb-8">
              <Text className="text-textLight mb-2 font-semibold">Email</Text>
              <TextInput
                className="bg-bgCard border border-border rounded-xl p-4 text-textLight"
                placeholder="Enter your email"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              onPress={handleForgotPassword}
              className="bg-primary rounded-xl p-4 mb-4"
              style={{
                shadowColor: "#7A4DFF",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <Text className="text-white text-center font-bold text-lg">
                Send Reset Link
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setCurrentScreen("login")}
              className="items-center"
            >
              <Text className="text-primary font-semibold">Back to Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // History Screen
  if (currentScreen === "history") {
    return (
      <SafeAreaView className="flex-1 bg-bgDark" edges={["top"]}>
        <ScrollView className="flex-1 bg-bgDark">
          <View className="p-6">
            <TouchableOpacity
              onPress={() => setCurrentScreen("main")}
              className="mb-4"
            >
              <Ionicons name="arrow-back" size={24} color="#BB86FC" />
            </TouchableOpacity>

            <Text className="text-3xl font-bold text-textLight mb-2">
              QR History 📜
            </Text>
            <Text className="text-textGray mb-6">
              View your scanned and generated QR codes
            </Text>

            {!isLoggedIn ? (
              <View className="bg-bgCard border border-border rounded-2xl p-6 mb-4">
                <View className="items-center">
                  <Ionicons
                    name="cloud-offline-outline"
                    size={64}
                    color="#666"
                  />
                  <Text className="text-textLight text-lg font-bold mt-4 mb-2">
                    Login Required
                  </Text>
                  <Text className="text-textGray text-center mb-4">
                    Please login to view and sync your QR code history
                  </Text>
                  <TouchableOpacity
                    onPress={() => setCurrentScreen("login")}
                    className="bg-primary rounded-xl px-6 py-3"
                  >
                    <Text className="text-white font-bold">Login Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
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
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Settings Screen
  if (currentScreen === "settings") {
    return (
      <SafeAreaView className="flex-1 bg-bgDark" edges={["top"]}>
        <ScrollView className="flex-1 bg-bgDark">
          <View className="p-6">
            <TouchableOpacity
              onPress={() => setCurrentScreen("main")}
              className="mb-4"
            >
              <Ionicons name="arrow-back" size={24} color="#BB86FC" />
            </TouchableOpacity>

            <Text className="text-3xl font-bold text-textLight mb-2">
              Settings ⚙️
            </Text>
            <Text className="text-textGray mb-6">
              Customize your QR Hub experience
            </Text>

            {/* General Settings */}
            <View className="mb-6">
              <Text className="text-textLight text-lg font-bold mb-3">
                General
              </Text>

              <View className="bg-bgCard border border-border rounded-2xl overflow-hidden">
                <View className="flex-row items-center justify-between p-4 border-b border-border">
                  <View className="flex-row items-center flex-1">
                    <Ionicons name="save-outline" size={24} color="#BB86FC" />
                    <View className="ml-3 flex-1">
                      <Text className="text-textLight font-semibold">
                        Auto-save to History
                      </Text>
                      <Text className="text-textGray text-xs">
                        Automatically save scanned QR codes
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={autoSave}
                    onValueChange={setAutoSave}
                    trackColor={{ false: "#3A3A3A", true: "#7A4DFF" }}
                    thumbColor={autoSave ? "#BB86FC" : "#666"}
                  />
                </View>

                <View className="flex-row items-center justify-between p-4 border-b border-border">
                  <View className="flex-row items-center flex-1">
                    <Ionicons
                      name="volume-high-outline"
                      size={24}
                      color="#BB86FC"
                    />
                    <View className="ml-3 flex-1">
                      <Text className="text-textLight font-semibold">
                        Scan Sound
                      </Text>
                      <Text className="text-textGray text-xs">
                        Play sound when QR is scanned
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={scanSound}
                    onValueChange={setScanSound}
                    trackColor={{ false: "#3A3A3A", true: "#7A4DFF" }}
                    thumbColor={scanSound ? "#BB86FC" : "#666"}
                  />
                </View>

                <View className="flex-row items-center justify-between p-4">
                  <View className="flex-row items-center flex-1">
                    <Ionicons
                      name="phone-portrait-outline"
                      size={24}
                      color="#BB86FC"
                    />
                    <View className="ml-3 flex-1">
                      <Text className="text-textLight font-semibold">
                        Vibration
                      </Text>
                      <Text className="text-textGray text-xs">
                        Vibrate on successful scan
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={vibration}
                    onValueChange={setVibration}
                    trackColor={{ false: "#3A3A3A", true: "#7A4DFF" }}
                    thumbColor={vibration ? "#BB86FC" : "#666"}
                  />
                </View>
              </View>
            </View>

            {/* Appearance */}
            <View className="mb-6">
              <Text className="text-textLight text-lg font-bold mb-3">
                Appearance
              </Text>

              <View className="bg-bgCard border border-border rounded-2xl overflow-hidden">
                <View className="flex-row items-center justify-between p-4">
                  <View className="flex-row items-center flex-1">
                    <Ionicons name="moon-outline" size={24} color="#BB86FC" />
                    <View className="ml-3 flex-1">
                      <Text className="text-textLight font-semibold">
                        Dark Mode
                      </Text>
                      <Text className="text-textGray text-xs">
                        Use dark theme
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={darkMode}
                    onValueChange={setDarkMode}
                    trackColor={{ false: "#3A3A3A", true: "#7A4DFF" }}
                    thumbColor={darkMode ? "#BB86FC" : "#666"}
                  />
                </View>
              </View>
            </View>

            {/* About */}
            <View>
              <Text className="text-textLight text-lg font-bold mb-3">
                About
              </Text>

              <View className="bg-bgCard border border-border rounded-2xl">
                <TouchableOpacity className="flex-row items-center p-4 border-b border-border">
                  <Ionicons
                    name="information-circle-outline"
                    size={24}
                    color="#BB86FC"
                  />
                  <Text className="text-textLight ml-3 flex-1">
                    App Version
                  </Text>
                  <Text className="text-textGray">1.0.0</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center p-4 border-b border-border">
                  <Ionicons
                    name="document-text-outline"
                    size={24}
                    color="#BB86FC"
                  />
                  <Text className="text-textLight ml-3 flex-1">
                    Privacy Policy
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#666" />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center p-4">
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={24}
                    color="#BB86FC"
                  />
                  <Text className="text-textLight ml-3 flex-1">
                    Terms of Service
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Main Profile Screen
  return (
    <SafeAreaView className="flex-1 bg-bgDark" edges={["top"]}>
      <ScrollView className="flex-1 bg-bgDark">
        <View className="p-6">
          <Text className="text-3xl font-bold text-textLight mb-2">
            Profile
          </Text>
          <Text className="text-textGray mb-6">
            Manage your account and preferences
          </Text>

          {/* User Profile Card */}
          <View
            className="bg-bgCard border border-border rounded-3xl p-6 mb-6"
            style={{
              shadowColor: "#7A4DFF",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View className="flex-row items-center mb-4">
              <View
                className="w-20 h-20 rounded-full items-center justify-center mr-4"
                style={{
                  backgroundColor: isLoggedIn ? "#7A4DFF" : "#3A3A3A",
                }}
              >
                <Ionicons
                  name={isLoggedIn ? "person" : "person-outline"}
                  size={40}
                  color={isLoggedIn ? "#FFF" : "#666"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-textLight text-2xl font-bold">
                  {userName}
                </Text>
                {isLoggedIn && (
                  <Text className="text-textGray mt-1">{userEmail}</Text>
                )}
                {!isLoggedIn && (
                  <Text className="text-textGray mt-1">Not logged in</Text>
                )}
              </View>
            </View>

            {!isLoggedIn && (
              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={() => setCurrentScreen("login")}
                  className="flex-1 bg-primary rounded-xl py-3"
                  style={{
                    shadowColor: "#7A4DFF",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                >
                  <Text className="text-white text-center font-bold">
                    Login
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setCurrentScreen("signup")}
                  className="flex-1 bg-bgDark border-2 border-primary rounded-xl py-3"
                >
                  <Text className="text-primary text-center font-bold">
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Cloud Sync Status */}
          {isLoggedIn && (
            <View className="bg-primary/10 border border-primary/30 rounded-2xl p-4 mb-6 flex-row items-center">
              <Ionicons name="cloud-outline" size={24} color="#BB86FC" />
              <View className="ml-3 flex-1">
                <Text className="text-textLight font-semibold">Cloud Sync</Text>
                <Text className="text-textGray text-xs">
                  Coming soon - Your history will be synced
                </Text>
              </View>
              <View className="bg-primary/20 px-3 py-1 rounded-full">
                <Text className="text-primary text-xs font-bold">Soon</Text>
              </View>
            </View>
          )}

          {/* Quick Actions */}
          <View className="mb-6">
            <Text className="text-textLight text-xl font-bold mb-4">
              Quick Actions
            </Text>

            <View className="bg-bgCard border border-border rounded-2xl overflow-hidden">
              <TouchableOpacity
                onPress={() => setCurrentScreen("history")}
                className="flex-row items-center p-4 border-b border-border"
              >
                <View
                  className="w-12 h-12 rounded-xl items-center justify-center mr-3"
                  style={{ backgroundColor: "#7A4DFF20" }}
                >
                  <Ionicons name="time-outline" size={24} color="#BB86FC" />
                </View>
                <View className="flex-1">
                  <Text className="text-textLight font-semibold text-base">
                    QR History
                  </Text>
                  <Text className="text-textGray text-xs">
                    View scanned & generated codes
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Alert.alert("Scan History", "View all your scanned QR codes")
                }
                className="flex-row items-center p-4 border-b border-border"
              >
                <View
                  className="w-12 h-12 rounded-xl items-center justify-center mr-3"
                  style={{ backgroundColor: "#66BB6A20" }}
                >
                  <Ionicons name="scan-outline" size={24} color="#66BB6A" />
                </View>
                <View className="flex-1">
                  <Text className="text-textLight font-semibold text-base">
                    Scan History
                  </Text>
                  <Text className="text-textGray text-xs">
                    Previously scanned codes
                  </Text>
                </View>
                <View className="bg-primary/20 px-2 py-1 rounded mr-2">
                  <Text className="text-primary text-xs">Soon</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Generated History",
                    "View QR codes you've created"
                  )
                }
                className="flex-row items-center p-4 border-b border-border"
              >
                <View
                  className="w-12 h-12 rounded-xl items-center justify-center mr-3"
                  style={{ backgroundColor: "#FFB74D20" }}
                >
                  <Ionicons name="qr-code-outline" size={24} color="#FFB74D" />
                </View>
                <View className="flex-1">
                  <Text className="text-textLight font-semibold text-base">
                    Generated QR Codes
                  </Text>
                  <Text className="text-textGray text-xs">
                    Your created QR codes
                  </Text>
                </View>
                <View className="bg-primary/20 px-2 py-1 rounded mr-2">
                  <Text className="text-primary text-xs">Soon</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Alert.alert("Favorites", "Your saved favorite QR codes")
                }
                className="flex-row items-center p-4"
              >
                <View
                  className="w-12 h-12 rounded-xl items-center justify-center mr-3"
                  style={{ backgroundColor: "#EF535020" }}
                >
                  <Ionicons name="heart-outline" size={24} color="#EF5350" />
                </View>
                <View className="flex-1">
                  <Text className="text-textLight font-semibold text-base">
                    Favorites
                  </Text>
                  <Text className="text-textGray text-xs">
                    Your saved QR codes
                  </Text>
                </View>
                <View className="bg-primary/20 px-2 py-1 rounded mr-2">
                  <Text className="text-primary text-xs">Soon</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Settings */}
          <View className="mb-6">
            <Text className="text-textLight text-xl font-bold mb-4">
              Settings
            </Text>

            <View className="bg-bgCard border border-border rounded-2xl overflow-hidden">
              <TouchableOpacity
                onPress={() => setCurrentScreen("settings")}
                className="flex-row items-center p-4 border-b border-border"
              >
                <View
                  className="w-12 h-12 rounded-xl items-center justify-center mr-3"
                  style={{ backgroundColor: "#BB86FC20" }}
                >
                  <Ionicons name="settings-outline" size={24} color="#BB86FC" />
                </View>
                <View className="flex-1">
                  <Text className="text-textLight font-semibold text-base">
                    Preferences
                  </Text>
                  <Text className="text-textGray text-xs">
                    App settings & customization
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Alert.alert("Help", "Contact support or view FAQs")
                }
                className="flex-row items-center p-4 border-b border-border"
              >
                <View
                  className="w-12 h-12 rounded-xl items-center justify-center mr-3"
                  style={{ backgroundColor: "#42A5F520" }}
                >
                  <Ionicons
                    name="help-circle-outline"
                    size={24}
                    color="#42A5F5"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-textLight font-semibold text-base">
                    Help & Support
                  </Text>
                  <Text className="text-textGray text-xs">
                    Get help or contact us
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Alert.alert("Share", "Share QR Hub with friends")
                }
                className="flex-row items-center p-4"
              >
                <View
                  className="w-12 h-12 rounded-xl items-center justify-center mr-3"
                  style={{ backgroundColor: "#66BB6A20" }}
                >
                  <Ionicons
                    name="share-social-outline"
                    size={24}
                    color="#66BB6A"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-textLight font-semibold text-base">
                    Share App
                  </Text>
                  <Text className="text-textGray text-xs">
                    Tell your friends about QR Hub
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Logout Button */}
          {isLoggedIn && (
            <TouchableOpacity
              onPress={handleLogout}
              className="bg-bgCard border border-red-500/30 rounded-2xl p-4 mb-6 flex-row items-center justify-center"
            >
              <Ionicons name="log-out-outline" size={24} color="#EF5350" />
              <Text className="text-red-500 font-bold text-base ml-2">
                Logout
              </Text>
            </TouchableOpacity>
          )}

          {/* App Info */}
          <View className="items-center pb-4">
            <Text className="text-textGray text-xs">QR Hub v1.0.0</Text>
            <Text className="text-textGray text-xs mt-1">
              Made with 💜 for easy QR management
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
