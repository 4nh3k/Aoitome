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
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // this to workaround the fact that flowbite react 
        // dóes not support customizing the primary color
        // cyan is used in all components as the default "primary" color
        // here we are actually overriding it to some purple color
        // so practically, the cyan means primary
        // in this we use blue color as primary
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
        'background': '#F3F4F6',
        'textColor': '#1F2A37',
        'primary': '#1A56DB',
        'secondary': '#8FA8DE',
        'accent': '#6189DF',
        'error': '#E02424',
        'success': '#0E9F6E',
        'textSub': '#6B7280',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

