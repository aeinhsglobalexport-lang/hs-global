import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import progress from 'vite-plugin-progress';

export default defineConfig({
  plugins: [
    react(),
    progress(),
  ],

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react-router-dom',
    ]
  },

  build: {
    minify: 'esbuild',
    
    rollupOptions: {
      output: {
        // Use object-based manual chunks - more reliable
        manualChunks: {
          // Keep ALL React together - CRITICAL
          'react-vendor': [
            'react', 
            'react-dom', 
            'react-router-dom',
            'react/jsx-runtime'
          ],
          
          // Separate heavy libraries
          'animation': ['framer-motion', 'gsap'],
          'swiper': ['swiper'],
          'i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
        }
      }
    },
    
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    sourcemap: false,
    cssMinify: true,
    target: 'es2015',
    reportCompressedSize: false,
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  preview: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});