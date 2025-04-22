import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // ✅ Add this

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Optional: helpful if you want absolute imports like '@/components/...'
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    fs: {
      // This ensures Vite can access node_modules/leaflet properly
      allow: ['..'],
    },
  },
});
