/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      colors: {
        gold: {
          50: "#fdfbf7",
          100: "#faf5eb",
          200: "#f3e6cd",
          300: "#ecd7af",
          400: "#deb872",
          500: "#D4AF37",
          600: "#bf9d31",
          700: "#9f8329",
          800: "#7f6821",
          900: "#67551b",
        },
        earth: {
          50: "#f7f5f3",
          100: "#ebe7e3",
          200: "#d4ccc3",
          300: "#bcb0a3",
          400: "#8d7a63",
          500: "#8B7355",
          600: "#7d674d",
          700: "#685640",
          800: "#534433",
          900: "#44382a",
        },
      },
    },
  },
  plugins: [],
};
