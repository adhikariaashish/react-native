/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#7A4DFF",
        primaryLight: "#9D7FFF",
        secondary: "#C6B8FF",
        accent: "#BB86FC",
        bgDark: "#121212",
        bgCard: "#1E1E1E",
        bgSecondary: "#2A2A2A",
        textLight: "#FFFFFF",
        textGray: "#B0B0B0",
        border: "#3A3A3A",
      },
    },
  },
  plugins: [],
};
