import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import React, { useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Generator() {
  const [text, setText] = useState("");
  const [generatedQR, setGeneratedQR] = useState<string | null>(null);
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();
  const qrRef = useRef<any>(null);

  const generateQRCode = () => {
    if (text.trim() === "") {
      Alert.alert("Error", "Please enter some text or URL");
      return;
    }
    setGeneratedQR(text);
  };

  const copyText = async () => {
    if (!generatedQR) return;
    await Clipboard.setStringAsync(generatedQR);
    Alert.alert("Copied!", "Text copied to clipboard");
  };

  const shareQR = async () => {
    if (!qrRef.current) return;

    try {
      qrRef.current.toDataURL(async (data: string) => {
        const isAvailable = await Sharing.isAvailableAsync();
        if (isAvailable) {
          Alert.alert("Share", "QR Code ready to share");
        } else {
          Alert.alert("Error", "Sharing is not available on this device");
        }
      });
    } catch {
      Alert.alert("Error", "Failed to share QR code");
    }
  };

  const saveToGallery = async () => {
    if (!qrRef.current) return;

    if (!mediaPermission?.granted) {
      const { granted } = await requestMediaPermission();
      if (!granted) {
        Alert.alert(
          "Permission Denied",
          "Please grant permission to save images"
        );
        return;
      }
    }

    try {
      qrRef.current.toDataURL(async (data: string) => {
        Alert.alert(
          "Info",
          "Save functionality requires additional setup for production use"
        );
      });
    } catch {
      Alert.alert("Error", "Failed to save QR code");
    }
  };

  const clearInput = () => {
    setText("");
    setGeneratedQR(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-bgDark" edges={["top"]}>
      <ScrollView className="flex-1 bg-bgDark">
        <View className="p-6">
          <Text className="text-3xl font-bold text-textLight mb-2">
            Generate QR Code
          </Text>
          <Text className="text-textGray mb-6">
            Enter text or URL to create a QR code
          </Text>

          {/* Input Field */}
          <View className="bg-bgCard rounded-2xl p-4 border border-border mb-4">
            <TextInput
              className="text-textLight text-base min-h-[100px]"
              placeholder="Enter text or URL..."
              placeholderTextColor="#666"
              value={text}
              onChangeText={setText}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <View className="flex-row items-center justify-between mt-2">
              <Text className="text-textGray text-xs">
                {text.length} characters
              </Text>
              {text.length > 0 && (
                <TouchableOpacity onPress={clearInput}>
                  <Text className="text-primary text-xs font-semibold">
                    Clear
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity
            className="bg-primary py-4 rounded-2xl mb-6 flex-row items-center justify-center"
            onPress={generateQRCode}
            style={{
              shadowColor: "#7A4DFF",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <Ionicons name="create" size={24} color="white" />
            <Text className="text-white text-center font-bold text-lg ml-2">
              Generate QR Code
            </Text>
          </TouchableOpacity>

          {/* Generated QR Code Display */}
          {generatedQR && (
            <View className="bg-bgCard rounded-3xl p-6 border border-border items-center">
              <View className="flex-row items-center mb-4">
                <Ionicons name="checkmark-circle" size={28} color="#66BB6A" />
                <Text className="text-textLight font-bold text-xl ml-2">
                  QR Code Generated
                </Text>
              </View>

              {/* QR Code */}
              <View className="bg-white p-8 rounded-3xl mb-6 shadow-2xl">
                <QRCode
                  value={generatedQR}
                  size={240}
                  color="#000"
                  backgroundColor="white"
                  getRef={(ref) => (qrRef.current = ref)}
                />
              </View>

              {/* QR Code Text Preview */}
              <View className="bg-bgSecondary rounded-2xl p-4 mb-6 w-full border border-border">
                <Text className="text-textGray font-semibold mb-2 text-xs uppercase">
                  Content:
                </Text>
                <Text
                  className="text-textLight text-sm leading-6"
                  numberOfLines={4}
                >
                  {generatedQR}
                </Text>
              </View>

              {/* Action Buttons for QR */}
              <View className="w-full gap-3">
                <TouchableOpacity
                  className="bg-primary/20 py-4 rounded-2xl flex-row items-center justify-center border border-primary"
                  onPress={copyText}
                >
                  <Ionicons name="copy-outline" size={22} color="#BB86FC" />
                  <Text className="text-primary font-bold text-base ml-2">
                    Copy Text
                  </Text>
                </TouchableOpacity>

                <View className="flex-row gap-3">
                  <TouchableOpacity
                    className="bg-primary flex-1 py-4 rounded-2xl flex-row items-center justify-center"
                    onPress={shareQR}
                  >
                    <Ionicons
                      name="share-social-outline"
                      size={22}
                      color="white"
                    />
                    <Text className="text-white font-bold text-base ml-2">
                      Share
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="bg-primary flex-1 py-4 rounded-2xl flex-row items-center justify-center"
                    onPress={saveToGallery}
                  >
                    <Ionicons name="download-outline" size={22} color="white" />
                    <Text className="text-white font-bold text-base ml-2">
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* Empty State */}
          {!generatedQR && text.length === 0 && (
            <View className="bg-bgCard rounded-3xl p-8 items-center border border-border">
              <View className="bg-primary/10 w-24 h-24 rounded-full items-center justify-center mb-4">
                <Ionicons name="qr-code-outline" size={60} color="#BB86FC" />
              </View>
              <Text className="text-textLight font-bold text-xl mb-2">
                Create Your QR Code
              </Text>
              <Text className="text-textGray text-center text-sm leading-6">
                Enter text or a URL above and tap{"\n"}&quot;Generate QR
                Code&quot; to create your custom QR code
              </Text>
              <View className="flex-row mt-6 gap-4">
                <View className="items-center">
                  <View className="bg-primary/20 w-12 h-12 rounded-full items-center justify-center mb-2">
                    <Ionicons name="text" size={24} color="#BB86FC" />
                  </View>
                  <Text className="text-textGray text-xs">Text</Text>
                </View>
                <View className="items-center">
                  <View className="bg-primary/20 w-12 h-12 rounded-full items-center justify-center mb-2">
                    <Ionicons name="link" size={24} color="#BB86FC" />
                  </View>
                  <Text className="text-textGray text-xs">URLs</Text>
                </View>
                <View className="items-center">
                  <View className="bg-primary/20 w-12 h-12 rounded-full items-center justify-center mb-2">
                    <Ionicons name="mail" size={24} color="#BB86FC" />
                  </View>
                  <Text className="text-textGray text-xs">Email</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
