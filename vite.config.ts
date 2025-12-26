import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// =============================================================================
// COURSE CONFIGURATION - Update these values for your course
// =============================================================================
// Course ID: 'linalg' - Short ID: 'ba', 'aa', 'crypto', etc.
// Use '/' for standalone Vercel deployment
const BASE_PATH = '/'
// =============================================================================

export default defineConfig({
  plugins: [react()],
  base: BASE_PATH,
  resolve: {
    alias: {
        '@': path.resolve(__dirname, './src'),
        '@shared': path.resolve(__dirname, './src/shared'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@lib': path.resolve(__dirname, './src/lib'),
        '@data': path.resolve(__dirname, './src/data'),
        // Shared package (local copy for standalone deployment)
        '@magic-internet-math/shared': path.resolve(__dirname, './shared'),
        // Ensure shared package can resolve katex from this package's node_modules
        'katex': path.resolve(__dirname, './node_modules/katex'),
    },
  },
  build: {
    chunkSizeWarningLimit: 500, // Lower threshold to catch issues
    rollupOptions: {
      output: {
        // Manual chunks for better caching and smaller initial load
        manualChunks: {
          // Core React libraries - changes rarely
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Math rendering - large but essential
          'vendor-math': ['katex'],
          // Animation library
          'vendor-animation': ['framer-motion'],
          // Firebase - only loaded when auth/leaderboard features are used
          'vendor-firebase': [
            'firebase/app',
            'firebase/auth',
            'firebase/firestore',
            'firebase/functions',
          ],
        },
      },
    },
  },
  define: {
    // Firebase environment variables
    'import.meta.env.VITE_FIREBASE_API_KEY': JSON.stringify(process.env.VITE_FIREBASE_API_KEY || ''),
    'import.meta.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.VITE_FIREBASE_AUTH_DOMAIN || ''),
    'import.meta.env.VITE_FIREBASE_PROJECT_ID': JSON.stringify(process.env.VITE_FIREBASE_PROJECT_ID || ''),
    'import.meta.env.VITE_FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.VITE_FIREBASE_STORAGE_BUCKET || ''),
    'import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || ''),
    'import.meta.env.VITE_FIREBASE_APP_ID': JSON.stringify(process.env.VITE_FIREBASE_APP_ID || ''),
  },
})
