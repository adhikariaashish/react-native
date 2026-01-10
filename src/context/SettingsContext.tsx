import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface SettingsContextType {
  // Scan settings
  vibration: boolean;
  setVibration: (value: boolean) => void;
  autoSave: boolean;
  setAutoSave: (value: boolean) => void;

  // Appearance
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;

  // Loading state
  isLoading: boolean;
}

const SETTINGS_KEY = "@qr_app_settings";

const defaultSettings = {
  vibration: true,
  autoSave: true,
  darkMode: true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [vibration, setVibrationState] = useState(defaultSettings.vibration);
  const [autoSave, setAutoSaveState] = useState(defaultSettings.autoSave);
  const [darkMode, setDarkModeState] = useState(defaultSettings.darkMode);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from AsyncStorage on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem(SETTINGS_KEY);
      if (stored) {
        const settings = JSON.parse(stored);
        setVibrationState(settings.vibration ?? defaultSettings.vibration);
        setAutoSaveState(settings.autoSave ?? defaultSettings.autoSave);
        setDarkModeState(settings.darkMode ?? defaultSettings.darkMode);
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async (newSettings: Partial<typeof defaultSettings>) => {
    try {
      const currentSettings = {
        vibration,
        autoSave,
        darkMode,
        ...newSettings,
      };
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(currentSettings));
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  const setVibration = (value: boolean) => {
    setVibrationState(value);
    saveSettings({ vibration: value });
  };

  const setAutoSave = (value: boolean) => {
    setAutoSaveState(value);
    saveSettings({ autoSave: value });
  };

  const setDarkMode = (value: boolean) => {
    setDarkModeState(value);
    saveSettings({ darkMode: value });
  };

  const value: SettingsContextType = {
    vibration,
    setVibration,
    autoSave,
    setAutoSave,
    darkMode,
    setDarkMode,
    isLoading,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
