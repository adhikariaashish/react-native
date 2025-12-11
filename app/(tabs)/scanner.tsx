import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Clipboard from "expo-clipboard";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Scanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [scanLineAnim] = useState(new Animated.Value(0));
  const [showModal, setShowModal] = useState(false);
  const [isLink, setIsLink] = useState(false);

  useEffect(() => {
    // Scanning animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scanLineAnim]);

  if (!permission) {
    return (
      <View className="flex-1 bg-bgDark items-center justify-center">
        <Text className="text-textLight">Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-bgDark items-center justify-center px-6">
        <Ionicons name="camera-outline" size={80} color="#BB86FC" />
        <Text className="text-textLight text-xl font-bold mt-4 text-center">
          Camera Permission Required
        </Text>
        <Text className="text-textGray text-center mt-2 mb-6">
          We need access to your camera to scan QR codes
        </Text>
        <TouchableOpacity
          className="bg-primary px-8 py-4 rounded-full"
          onPress={requestPermission}
        >
          <Text className="text-white font-bold text-lg">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isURL = (text: string): boolean => {
    const urlPattern = /^(https?:\/\/|www\.)/i;
    return urlPattern.test(text);
  };

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;

    setScanned(true);
    setLastResult(data);
    setIsLink(isURL(data));
    setShowModal(true);
  };

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("✅ Copied!", "Text copied to clipboard", [
      { text: "OK", style: "default" },
    ]);
    setShowModal(false);
    setScanned(false);
  };

  const openLink = async () => {
    if (!lastResult) return;

    const url = lastResult.startsWith("www.")
      ? `https://${lastResult}`
      : lastResult;
    const canOpen = await Linking.canOpenURL(url);

    setShowModal(false);

    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert("❌ Error", "Cannot open this URL");
    }

    setScanned(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setScanned(false);
  };

  const scanLineTranslateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300],
  });

  return (
    <View className="flex-1 bg-bgDark">
      <View className="flex-1 p-6">
        <Text className="text-3xl font-bold text-textLight mb-2">
          Scan QR Code
        </Text>
        <Text className="text-textGray mb-6">
          Point your camera at a QR code to scan
        </Text>

        {/* Camera View */}
        <View
          className="rounded-3xl overflow-hidden border-4 border-primary"
          style={styles.cameraContainer}
        >
          <CameraView
            style={styles.camera}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
          >
            {/* Corner Brackets */}
            <View style={styles.overlay}>
              <View style={styles.corner} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>

            {/* Scan Line Animation */}
            {!scanned && (
              <Animated.View
                style={[
                  styles.scanLine,
                  {
                    transform: [{ translateY: scanLineTranslateY }],
                  },
                ]}
              />
            )}
          </CameraView>
        </View>

        {/* Instructions */}
        <View className="mt-6 bg-bgCard rounded-2xl p-4 border border-border">
          <View className="flex-row items-center">
            <Ionicons name="information-circle" size={24} color="#BB86FC" />
            <Text className="text-textLight font-semibold ml-3 flex-1">
              {scanned ? "Processing..." : "Position QR code within the frame"}
            </Text>
          </View>
        </View>

        {/* Last Result Card */}
        {lastResult && !showModal && (
          <View className="mt-4 bg-bgCard rounded-2xl p-4 border border-border">
            <Text className="text-textLight font-bold text-lg mb-2">
              Last Scanned:
            </Text>
            <Text className="text-textGray mb-4" numberOfLines={2}>
              {lastResult}
            </Text>
            <TouchableOpacity
              className="bg-primary/20 py-2 rounded-full"
              onPress={() => {
                setIsLink(isURL(lastResult));
                setShowModal(true);
              }}
            >
              <Text className="text-primary text-center font-semibold">
                View Details
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Custom Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View className="items-center mb-4">
              <View className="bg-primary/20 w-16 h-16 rounded-full items-center justify-center mb-3">
                <Ionicons
                  name={isLink ? "link" : "text"}
                  size={32}
                  color="#BB86FC"
                />
              </View>
              <Text className="text-textLight text-2xl font-bold">
                {isLink ? "Link Detected!" : "Text Scanned"}
              </Text>
            </View>

            {/* Content */}
            <View className="bg-bgSecondary rounded-2xl p-4 mb-6">
              <Text className="text-textGray text-xs mb-2 uppercase">
                Content:
              </Text>
              <Text className="text-textLight text-base leading-6">
                {lastResult}
              </Text>
            </View>

            {/* Actions */}
            {isLink ? (
              <>
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={openLink}
                >
                  <Ionicons name="open-outline" size={24} color="white" />
                  <Text className="text-white font-bold text-lg ml-2">
                    OPEN LINK
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => copyToClipboard(lastResult!)}
                >
                  <Ionicons name="copy-outline" size={20} color="#BB86FC" />
                  <Text className="text-accent font-semibold ml-2">
                    Copy Link
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => copyToClipboard(lastResult!)}
              >
                <Ionicons name="copy-outline" size={24} color="white" />
                <Text className="text-white font-bold text-lg ml-2">
                  COPY TEXT
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text className="text-textGray font-semibold">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    height: 350,
    position: "relative",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#BB86FC",
    top: 20,
    left: 20,
  },
  topRight: {
    left: undefined,
    right: 20,
    borderLeftWidth: 0,
    borderRightWidth: 4,
  },
  bottomLeft: {
    top: undefined,
    bottom: 20,
    borderTopWidth: 0,
    borderBottomWidth: 4,
  },
  bottomRight: {
    top: undefined,
    left: undefined,
    bottom: 20,
    right: 20,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  scanLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#BB86FC",
    shadowColor: "#BB86FC",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#1E1E1E",
    borderRadius: 24,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    borderWidth: 1,
    borderColor: "#3A3A3A",
  },
  primaryButton: {
    backgroundColor: "#7A4DFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: "#2A2A2A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#3A3A3A",
  },
  closeButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
});
