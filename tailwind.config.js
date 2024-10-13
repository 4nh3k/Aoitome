/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    screens: {
      sm: "640px", // Small devices (min-width: 640px)
      md: "768px", // Medium devices (min-width: 768px)
      lg: "1024px", // Large devices (min-width: 1024px)
      xl: "1280px", // Extra large devices (min-width: 1280px)
      "2xl": "1536px", // 2X extra large devices (min-width: 1536px)
      // Custom breakpoints
      tablet: "640px", // Custom breakpoint for tablet
      desktop: "1024px", // Custom breakpoint for desktop
    },
    extend: {
      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, minmax(200px, 1fr))',
        'auto-fit': 'repeat(auto-fit, minmax(200px, 1fr))',
      },
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
        cyan: {
          50: "#EBF5FF",
          100: "#E1EFFE",
          200: "#C3DDFD",
          300: "#A4CAFE",
          400: "#76A9FA",
          500: "#3F83F8",
          600: "#1C64F2",
          700: "#1A56DB",
          800: "#1E429F",
          900: "#233876",
        },
        background: "#F3F4F6",
        textColor: "#1F2A37",
        primary: "#1A56DB",
        secondary: "#8FA8DE",
        accent: "#6189DF",
        error: "#E02424",
        success: "#0E9F6E",
        textSub: "#6B7280",
      },
      borderWidth: {
        1: "1px",
      },
      transitionProperty: {
        'height': 'height'
      }
    },
  },
  plugins: [require("flowbite/plugin")],
};
