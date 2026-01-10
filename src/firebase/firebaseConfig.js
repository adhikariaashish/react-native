import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwW0lClhjMGX7wAxwJkelXL_rcgwcSSfE",
  authDomain: "qr-app-e6b48.firebaseapp.com",
  projectId: "qr-app-e6b48",
  storageBucket: "qr-app-e6b48.firebasestorage.app",
  messagingSenderId: "420148319216",
  appId: "1:420148319216:web:6fd5ea29e07b2324428335",
};

const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
