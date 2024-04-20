/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', "sans-serif"],
      },
      // that is actual animation
      keyframes: () => ({
        fadeOut: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      }),
      colors: {
        // this to workaround the fact that flowbite react
        // dóes not support customizing the primary color
        // cyan is used in all components as the default "primary" color
        // here we are actually overriding it to some purple color
        // so practically, the cyan means primary
        // in this we use blue color as primary
        cyan: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#c48c46",
          800: "#854d0e",
          900: "#713f12",
        },
        background: "#F3F4F6",
        textColor: "#1F2A37",
        primary: "#c48c46",
        secondary: "#fef08a",
        accent: "#6189DF",
        error: "#E02424",
        success: "#0E9F6E",
        textSub: "#6B7280",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
