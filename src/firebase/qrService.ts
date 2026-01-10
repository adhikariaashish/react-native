import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

// Types
export interface QRCode {
  id?: string;
  userId: string;
  content: string;
  type: "scanned" | "generated";
  title?: string;
  isFavorite: boolean;
  createdAt: Timestamp | Date;
}

export interface QRCodeWithId extends QRCode {
  id: string;
}

const QR_COLLECTION = "qrcodes";

// Helper function to convert createdAt to Date
const getDateFromTimestamp = (
  createdAt: Timestamp | Date | undefined
): Date => {
  if (!createdAt) return new Date(0);
  if (createdAt instanceof Date) return createdAt;
  if (typeof (createdAt as Timestamp).toDate === "function") {
    return (createdAt as Timestamp).toDate();
  }
  return new Date(0);
};

// Helper function to sort QR codes by date
const sortByDateDesc = (a: QRCodeWithId, b: QRCodeWithId): number => {
  const dateA = getDateFromTimestamp(a.createdAt);
  const dateB = getDateFromTimestamp(b.createdAt);
  return dateB.getTime() - dateA.getTime();
};

// Save scanned QR code
export const saveScannedQR = async (
  userId: string,
  content: string,
  title?: string
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, QR_COLLECTION), {
      userId,
      content,
      type: "scanned",
      title: title || getDefaultTitle(content),
      isFavorite: false,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch {
    throw new Error("Failed to save scanned QR code. Please try again.");
  }
};

// Save generated QR code
export const saveGeneratedQR = async (
  userId: string,
  content: string,
  title?: string
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, QR_COLLECTION), {
      userId,
      content,
      type: "generated",
      title: title || getDefaultTitle(content),
      isFavorite: false,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch {
    throw new Error("Failed to save generated QR code. Please try again.");
  }
};

// Toggle favorite status
export const toggleFavorite = async (
  qrId: string,
  isFavorite: boolean
): Promise<void> => {
  try {
    const qrRef = doc(db, QR_COLLECTION, qrId);
    await updateDoc(qrRef, {
      isFavorite,
      updatedAt: serverTimestamp(),
    });
  } catch {
    throw new Error("Failed to update favorite status. Please try again.");
  }
};

// Update QR title
export const updateQRTitle = async (
  qrId: string,
  title: string
): Promise<void> => {
  try {
    const qrRef = doc(db, QR_COLLECTION, qrId);
    await updateDoc(qrRef, {
      title,
      updatedAt: serverTimestamp(),
    });
  } catch {
    throw new Error("Failed to update title. Please try again.");
  }
};

// Delete QR code
export const deleteQR = async (qrId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, QR_COLLECTION, qrId));
  } catch {
    throw new Error("Failed to delete QR code. Please try again.");
  }
};

// Fetch all QR codes for a user
export const fetchQRHistory = async (
  userId: string
): Promise<QRCodeWithId[]> => {
  try {
    // Simple query without ordering to avoid index requirement
    const q = query(
      collection(db, QR_COLLECTION),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);
    const qrCodes: QRCodeWithId[] = [];

    querySnapshot.forEach((doc) => {
      qrCodes.push({
        id: doc.id,
        ...doc.data(),
      } as QRCodeWithId);
    });

    // Sort client-side by createdAt descending
    qrCodes.sort(sortByDateDesc);

    return qrCodes;
  } catch (error: any) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch QR history. Please try again.");
  }
};

// Fetch scanned QR codes
export const fetchScannedQRs = async (
  userId: string
): Promise<QRCodeWithId[]> => {
  try {
    const q = query(
      collection(db, QR_COLLECTION),
      where("userId", "==", userId),
      where("type", "==", "scanned")
    );

    const querySnapshot = await getDocs(q);
    const qrCodes: QRCodeWithId[] = [];

    querySnapshot.forEach((doc) => {
      qrCodes.push({
        id: doc.id,
        ...doc.data(),
      } as QRCodeWithId);
    });

    // Sort client-side
    qrCodes.sort(sortByDateDesc);

    return qrCodes;
  } catch {
    throw new Error("Failed to fetch scanned QR codes. Please try again.");
  }
};

// Fetch generated QR codes
export const fetchGeneratedQRs = async (
  userId: string
): Promise<QRCodeWithId[]> => {
  try {
    const q = query(
      collection(db, QR_COLLECTION),
      where("userId", "==", userId),
      where("type", "==", "generated")
    );

    const querySnapshot = await getDocs(q);
    const qrCodes: QRCodeWithId[] = [];

    querySnapshot.forEach((doc) => {
      qrCodes.push({
        id: doc.id,
        ...doc.data(),
      } as QRCodeWithId);
    });

    // Sort client-side
    qrCodes.sort(sortByDateDesc);

    return qrCodes;
  } catch {
    throw new Error("Failed to fetch generated QR codes. Please try again.");
  }
};

// Fetch favorite QR codes
export const fetchFavoriteQRs = async (
  userId: string
): Promise<QRCodeWithId[]> => {
  try {
    const q = query(
      collection(db, QR_COLLECTION),
      where("userId", "==", userId),
      where("isFavorite", "==", true)
    );

    const querySnapshot = await getDocs(q);
    const qrCodes: QRCodeWithId[] = [];

    querySnapshot.forEach((doc) => {
      qrCodes.push({
        id: doc.id,
        ...doc.data(),
      } as QRCodeWithId);
    });

    // Sort client-side
    qrCodes.sort(sortByDateDesc);

    return qrCodes;
  } catch {
    throw new Error("Failed to fetch favorite QR codes. Please try again.");
  }
};

// Helper function to generate default title
const getDefaultTitle = (content: string): string => {
  // Check if it's a URL
  if (content.match(/^(https?:\/\/|www\.)/i)) {
    try {
      const url = new URL(
        content.startsWith("www.") ? `https://${content}` : content
      );
      return url.hostname;
    } catch {
      return content.substring(0, 30);
    }
  }
  // Truncate if too long
  return content.length > 30 ? content.substring(0, 30) + "..." : content;
};

// Format date for display
export const formatDate = (timestamp: Timestamp | Date): string => {
  const date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
};
