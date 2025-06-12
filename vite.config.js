import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Shortcut '@' → src/
    },
  },
  base: '/', // Tetap '/' untuk Vercel (tidak perlu '/cryptoclass/')
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Ganti ke URL backend production bila perlu
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
  },
});
