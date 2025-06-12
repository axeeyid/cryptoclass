import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Gunakan @ sebagai alias src/
    },
  },
  base: '/', // Ubah ini jika deploy ke sub-folder, misal '/cryptoclass/' untuk GitHub Pages
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Ganti ke URL backend kamu
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
