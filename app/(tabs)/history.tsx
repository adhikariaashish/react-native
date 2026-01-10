import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../src/context/AuthContext";
import {
  fetchQRHistory,
  toggleFavorite,
  updateQRTitle,
  deleteQR,
  formatDate,
  QRCodeWithId,
} from "../../src/firebase/qrService";

type FilterType = "all" | "scanned" | "generated" | "favorites";

export default function History() {
  const { user, isAuthenticated } = useAuth();
  const [qrCodes, setQrCodes] = useState<QRCodeWithId[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedQR, setSelectedQR] = useState<QRCodeWithId | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");

  const loadHistory = useCallback(async () => {
    if (!user) return;

    try {
      const history = await fetchQRHistory(user.uid);
      setQrCodes(history);
    } catch (error: any) {
      console.error("Failed to load history:", error);
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      loadHistory().finally(() => setIsLoading(false));
    }
  }, [isAuthenticated, loadHistory]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHistory();
    setRefreshing(false);
  };

  const handleToggleFavorite = async (qr: QRCodeWithId) => {
    try {
      await toggleFavorite(qr.id, !qr.isFavorite);
      setQrCodes((prev) =>
        prev.map((item) =>
          item.id === qr.id ? { ...item, isFavorite: !item.isFavorite } : item
        )
      );
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const handleEditTitle = async () => {
    if (!selectedQR || !editTitle.trim()) return;

    try {
      await updateQRTitle(selectedQR.id, editTitle);
      setQrCodes((prev) =>
        prev.map((item) =>
          item.id === selectedQR.id ? { ...item, title: editTitle } : item
        )
      );
      setShowEditModal(false);
      setSelectedQR(null);
      Alert.alert("Success", "Title updated successfully");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const handleDelete = (qr: QRCodeWithId) => {
    Alert.alert(
      "Delete QR Code",
      "Are you sure you want to delete this QR code?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteQR(qr.id);
              setQrCodes((prev) => prev.filter((item) => item.id !== qr.id));
              Alert.alert("Success", "QR code deleted");
            } catch (error: any) {
              Alert.alert("Error", error.message);
            }
          },
        },
      ]
    );
  };

  const openEditModal = (qr: QRCodeWithId) => {
    setSelectedQR(qr);
    setEditTitle(qr.title || "");
    setShowEditModal(true);
  };

  const filteredQRs = qrCodes.filter((qr) => {
    switch (filter) {
      case "scanned":
        return qr.type === "scanned";
      case "generated":
        return qr.type === "generated";
      case "favorites":
        return qr.isFavorite;
      default:
        return true;
    }
  });

  const scannedCount = qrCodes.filter((qr) => qr.type === "scanned").length;
  const generatedCount = qrCodes.filter((qr) => qr.type === "generated").length;
  const favoritesCount = qrCodes.filter((qr) => qr.isFavorite).length;

  if (!isAuthenticated) {
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

            <View className="bg-bgCard border border-border rounded-2xl p-6">
              <View className="items-center">
                <Ionicons name="cloud-offline-outline" size={64} color="#666" />
                <Text className="text-textLight text-lg font-bold mt-4 mb-2">
                  Login Required
                </Text>
                <Text className="text-textGray text-center mb-4">
                  Please login to view and sync your QR code history
                </Text>
                <View className="bg-primary/20 px-4 py-2 rounded-full">
                  <Text className="text-primary font-bold">
                    Go to Profile to Login
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-bgDark" edges={["top"]}>
      <ScrollView
        className="flex-1 bg-bgDark"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="p-6">
          <Text className="text-3xl font-bold text-textLight mb-2">
            QR History 📜
          </Text>
          <Text className="text-textGray mb-6">
            View your scanned and generated QR codes
          </Text>

          {/* Stats Cards */}
          <View className="flex-row gap-3 mb-6">
            <TouchableOpacity
              onPress={() => setFilter("scanned")}
              className={`flex-1 bg-bgCard border rounded-2xl p-4 items-center ${
                filter === "scanned" ? "border-primary" : "border-border"
              }`}
            >
              <Ionicons name="scan-outline" size={24} color="#BB86FC" />
              <Text className="text-textLight text-xl font-bold mt-2">
                {scannedCount}
              </Text>
              <Text className="text-textGray text-xs">Scanned</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFilter("generated")}
              className={`flex-1 bg-bgCard border rounded-2xl p-4 items-center ${
                filter === "generated" ? "border-primary" : "border-border"
              }`}
            >
              <Ionicons name="qr-code-outline" size={24} color="#BB86FC" />
              <Text className="text-textLight text-xl font-bold mt-2">
                {generatedCount}
              </Text>
              <Text className="text-textGray text-xs">Generated</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFilter("favorites")}
              className={`flex-1 bg-bgCard border rounded-2xl p-4 items-center ${
                filter === "favorites" ? "border-primary" : "border-border"
              }`}
            >
              <Ionicons name="heart" size={24} color="#EF5350" />
              <Text className="text-textLight text-xl font-bold mt-2">
                {favoritesCount}
              </Text>
              <Text className="text-textGray text-xs">Favorites</Text>
            </TouchableOpacity>
          </View>

          {/* Filter Tabs */}
          <View className="flex-row bg-bgCard rounded-xl p-1 mb-6">
            {(["all", "scanned", "generated", "favorites"] as FilterType[]).map(
              (f) => (
                <TouchableOpacity
                  key={f}
                  onPress={() => setFilter(f)}
                  className={`flex-1 py-2 rounded-lg ${
                    filter === f ? "bg-primary" : ""
                  }`}
                >
                  <Text
                    className={`text-center font-semibold capitalize ${
                      filter === f ? "text-white" : "text-textGray"
                    }`}
                  >
                    {f}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>

          {/* Loading State */}
          {isLoading && (
            <View className="items-center py-12">
              <ActivityIndicator size="large" color="#BB86FC" />
              <Text className="text-textGray mt-4">Loading history...</Text>
            </View>
          )}

          {/* Empty State */}
          {!isLoading && filteredQRs.length === 0 && (
            <View className="bg-bgCard border border-border rounded-2xl p-8 items-center">
              <Ionicons
                name={
                  filter === "favorites"
                    ? "heart-outline"
                    : filter === "scanned"
                    ? "scan-outline"
                    : filter === "generated"
                    ? "qr-code-outline"
                    : "albums-outline"
                }
                size={64}
                color="#666"
              />
              <Text className="text-textLight text-lg font-bold mt-4 mb-2">
                No {filter === "all" ? "QR codes" : filter} yet
              </Text>
              <Text className="text-textGray text-center">
                {filter === "favorites"
                  ? "Mark QR codes as favorites to see them here"
                  : filter === "scanned"
                  ? "Scan QR codes to see them here"
                  : filter === "generated"
                  ? "Generate QR codes to see them here"
                  : "Start scanning or generating QR codes"}
              </Text>
            </View>
          )}

          {/* QR Code List */}
          {!isLoading &&
            filteredQRs.map((qr) => (
              <View
                key={qr.id}
                className="bg-bgCard border border-border rounded-2xl p-4 mb-3"
              >
                <View className="flex-row items-start">
                  <View
                    className={`w-12 h-12 rounded-xl items-center justify-center ${
                      qr.type === "scanned" ? "bg-blue-900/30" : "bg-purple-900/30"
                    }`}
                  >
                    <Ionicons
                      name={qr.type === "scanned" ? "scan" : "qr-code"}
                      size={24}
                      color={qr.type === "scanned" ? "#60A5FA" : "#BB86FC"}
                    />
                  </View>

                  <View className="flex-1 ml-3">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-textLight font-bold flex-1" numberOfLines={1}>
                        {qr.title || "Untitled"}
                      </Text>
                      <TouchableOpacity onPress={() => handleToggleFavorite(qr)}>
                        <Ionicons
                          name={qr.isFavorite ? "heart" : "heart-outline"}
                          size={22}
                          color={qr.isFavorite ? "#EF5350" : "#666"}
                        />
                      </TouchableOpacity>
                    </View>

                    <Text className="text-textGray text-sm mt-1" numberOfLines={2}>
                      {qr.content}
                    </Text>

                    <View className="flex-row items-center justify-between mt-2">
                      <View className="flex-row items-center">
                        <View
                          className={`px-2 py-1 rounded-full ${
                            qr.type === "scanned" ? "bg-blue-900/30" : "bg-purple-900/30"
                          }`}
                        >
                          <Text
                            className={`text-xs font-semibold capitalize ${
                              qr.type === "scanned" ? "text-blue-400" : "text-purple-400"
                            }`}
                          >
                            {qr.type}
                          </Text>
                        </View>
                        <Text className="text-textGray text-xs ml-2">
                          {formatDate(qr.createdAt)}
                        </Text>
                      </View>

                      <View className="flex-row gap-2">
                        <TouchableOpacity
                          onPress={() => openEditModal(qr)}
                          className="p-2"
                        >
                          <Ionicons name="pencil" size={18} color="#BB86FC" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleDelete(qr)}
                          className="p-2"
                        >
                          <Ionicons name="trash-outline" size={18} color="#EF5350" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>

      {/* Edit Title Modal */}
      <Modal
        visible={showEditModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowEditModal(false)}
      >
        <View className="flex-1 bg-black/80 items-center justify-center p-6">
          <View className="bg-bgCard w-full rounded-2xl p-6 border border-border">
            <Text className="text-textLight text-xl font-bold mb-4">
              Edit Title
            </Text>

            <TextInput
              className="bg-bgSecondary border border-border rounded-xl p-4 text-textLight mb-4"
              placeholder="Enter title"
              placeholderTextColor="#666"
              value={editTitle}
              onChangeText={setEditTitle}
            />

            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => setShowEditModal(false)}
                className="flex-1 bg-bgSecondary py-3 rounded-xl"
              >
                <Text className="text-textGray text-center font-bold">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleEditTitle}
                className="flex-1 bg-primary py-3 rounded-xl"
              >
                <Text className="text-white text-center font-bold">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
