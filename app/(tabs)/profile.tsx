import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../src/context/AuthContext";
import { useSettings } from "../../src/context/SettingsContext";

type Screen = "main" | "login" | "signup" | "forgot" | "settings";

export default function Profile() {
  const {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    forgotPassword,
  } = useAuth();
  const {
    vibration,
    setVibration,
    autoSave,
    setAutoSave,
    darkMode,
    setDarkMode,
  } = useSettings();
  const [currentScreen, setCurrentScreen] = useState<Screen>("main");

  // Auth form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      setCurrentScreen("main");
      setEmail("");
      setPassword("");
      Alert.alert("Success", "Logged in successfully!");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await register(email, password, name);
      setCurrentScreen("main");
      setEmail("");
      setPassword("");
      setName("");
      Alert.alert("Success", "Account created successfully!");
    } catch (error: any) {
      Alert.alert("Signup Failed", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    setIsSubmitting(true);
    try {
      await forgotPassword(email);
      Alert.alert("Success", "Password reset link sent to your email");
      setCurrentScreen("login");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
            Alert.alert("Success", "Logged out successfully");
          } catch (error: any) {
            Alert.alert("Error", error.message);
          }
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <SafeAreaView
        className="flex-1 bg-bgDark items-center justify-center"
        edges={["top"]}
      >
        <ActivityIndicator size="large" color="#BB86FC" />
        <Text className="text-textLight mt-4">Loading...</Text>
      </SafeAreaView>
    );
  }

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
                editable={!isSubmitting}
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
                editable={!isSubmitting}
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
              disabled={isSubmitting}
              className={`bg-primary rounded-xl p-4 mb-4 ${
                isSubmitting ? "opacity-60" : ""
              }`}
              style={{
                shadowColor: "#7A4DFF",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-center font-bold text-lg">
                  Login
                </Text>
              )}
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
                editable={!isSubmitting}
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
                editable={!isSubmitting}
              />
            </View>

            <View className="mb-8">
              <Text className="text-textLight mb-2 font-semibold">
                Password
              </Text>
              <TextInput
                className="bg-bgCard border border-border rounded-xl p-4 text-textLight"
                placeholder="Create a password (min 6 characters)"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isSubmitting}
              />
            </View>

            <TouchableOpacity
              onPress={handleSignup}
              disabled={isSubmitting}
              className={`bg-primary rounded-xl p-4 mb-4 ${
                isSubmitting ? "opacity-60" : ""
              }`}
              style={{
                shadowColor: "#7A4DFF",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-center font-bold text-lg">
                  Sign Up
                </Text>
              )}
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
                editable={!isSubmitting}
              />
            </View>

            <TouchableOpacity
              onPress={handleForgotPassword}
              disabled={isSubmitting}
              className={`bg-primary rounded-xl p-4 mb-4 ${
                isSubmitting ? "opacity-60" : ""
              }`}
              style={{
                shadowColor: "#7A4DFF",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-center font-bold text-lg">
                  Send Reset Link
                </Text>
              )}
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
                        Vibrate when QR is scanned
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

              <View className="bg-bgCard border border-border rounded-2xl overflow-hidden">
                <View className="p-4 border-b border-border">
                  <Text className="text-textLight font-semibold">Version</Text>
                  <Text className="text-textGray text-xs">1.0.0</Text>
                </View>
                <TouchableOpacity className="p-4">
                  <Text className="text-textLight font-semibold">
                    Privacy Policy
                  </Text>
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
            Profile 👤
          </Text>
          <Text className="text-textGray mb-6">
            Manage your account and settings
          </Text>

          {/* User Info Card */}
          <View className="bg-bgCard border border-border rounded-2xl p-5 mb-6">
            <View className="flex-row items-center">
              <View className="bg-primary w-16 h-16 rounded-full items-center justify-center">
                <Text className="text-white text-2xl font-bold">
                  {isAuthenticated && user?.displayName
                    ? user.displayName.charAt(0).toUpperCase()
                    : "G"}
                </Text>
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-textLight text-xl font-bold">
                  {isAuthenticated && user?.displayName
                    ? user.displayName
                    : "Guest"}
                </Text>
                {isAuthenticated && user?.email ? (
                  <Text className="text-textGray">{user.email}</Text>
                ) : (
                  <Text className="text-textGray">
                    Login to sync your QR codes
                  </Text>
                )}
              </View>
            </View>

            {!isAuthenticated && (
              <View className="flex-row mt-4 gap-3">
                <TouchableOpacity
                  onPress={() => setCurrentScreen("login")}
                  className="flex-1 bg-primary py-3 rounded-xl"
                >
                  <Text className="text-white text-center font-bold">
                    Login
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setCurrentScreen("signup")}
                  className="flex-1 bg-primary/20 py-3 rounded-xl border border-primary"
                >
                  <Text className="text-primary text-center font-bold">
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Stats Card - Only show when logged in */}
          {isAuthenticated && (
            <View className="bg-bgCard border border-border rounded-2xl p-5 mb-6">
              <Text className="text-textLight text-lg font-bold mb-4">
                Your Stats 📊
              </Text>
              <View className="flex-row justify-between">
                <View className="items-center flex-1">
                  <Ionicons name="scan-outline" size={28} color="#BB86FC" />
                  <Text className="text-textLight text-xl font-bold mt-2">
                    --
                  </Text>
                  <Text className="text-textGray text-xs">Scanned</Text>
                </View>
                <View className="items-center flex-1">
                  <Ionicons name="qr-code-outline" size={28} color="#BB86FC" />
                  <Text className="text-textLight text-xl font-bold mt-2">
                    --
                  </Text>
                  <Text className="text-textGray text-xs">Generated</Text>
                </View>
                <View className="items-center flex-1">
                  <Ionicons name="heart-outline" size={28} color="#BB86FC" />
                  <Text className="text-textLight text-xl font-bold mt-2">
                    --
                  </Text>
                  <Text className="text-textGray text-xs">Favorites</Text>
                </View>
              </View>
            </View>
          )}

          {/* Cloud Sync Status */}
          {isAuthenticated && (
            <View className="bg-green-900/30 border border-green-700 rounded-2xl p-4 mb-6">
              <View className="flex-row items-center">
                <Ionicons name="cloud-done-outline" size={24} color="#66BB6A" />
                <View className="ml-3 flex-1">
                  <Text className="text-green-400 font-semibold">
                    Cloud Sync Active
                  </Text>
                  <Text className="text-green-400/70 text-xs">
                    Your QR codes are syncing to the cloud
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Menu Items */}
          <View className="bg-bgCard border border-border rounded-2xl overflow-hidden mb-6">
            <TouchableOpacity
              onPress={() => setCurrentScreen("settings")}
              className="flex-row items-center p-4 border-b border-border"
            >
              <Ionicons name="settings-outline" size={24} color="#BB86FC" />
              <Text className="text-textLight font-semibold ml-3 flex-1">
                Settings
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-4 border-b border-border">
              <Ionicons name="help-circle-outline" size={24} color="#BB86FC" />
              <Text className="text-textLight font-semibold ml-3 flex-1">
                Help & Support
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-4">
              <Ionicons
                name="information-circle-outline"
                size={24}
                color="#BB86FC"
              />
              <Text className="text-textLight font-semibold ml-3 flex-1">
                About
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Logout Button - Only show when logged in */}
          {isAuthenticated && (
            <TouchableOpacity
              onPress={handleLogout}
              className="bg-red-900/30 border border-red-700 rounded-2xl p-4"
            >
              <View className="flex-row items-center justify-center">
                <Ionicons name="log-out-outline" size={24} color="#EF5350" />
                <Text className="text-red-400 font-bold ml-2">Logout</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
