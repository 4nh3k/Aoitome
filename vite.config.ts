import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    host: true,
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo: { name: string; }) => {
          // Custom naming pattern for image files
          if (/\.(png|jpg|gif|svg|ico)$/.test(assetInfo.name)) {
            return `img/[name].[ext]?hash=[hash]`; // Output path for images
          }
          return assetInfo.name; // Default handling for other asset types
        },
      },
    },
  },
});
