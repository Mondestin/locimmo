import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 3000, // Optional: Customize the dev server port
  },
  build: {
    outDir: 'dist', // Output directory for production build
  },
  resolve: {
    alias: {
      '@': '/src', // Optional: Create aliases for cleaner imports
    },
  },
  // Optional: Rewrite rules for client-side routing
  base: '/',
});
