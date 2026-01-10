// Firebase configuration and services
export { auth, db } from "./firebaseConfig";

// Authentication services
export {
  getCurrentUser,
  logOut,
  resetPassword,
  signIn,
  signUp,
  subscribeToAuthChanges,
} from "./authService";

// QR code services
export {
  deleteQR,
  fetchFavoriteQRs,
  fetchGeneratedQRs,
  fetchQRHistory,
  fetchScannedQRs,
  formatDate,
  saveGeneratedQR,
  saveScannedQR,
  toggleFavorite,
  updateQRTitle,
} from "./qrService";

// Types
export type { QRCode, QRCodeWithId } from "./qrService";
