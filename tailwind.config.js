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

