import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          console.log('Rewriting path:', path);
          return path;
        }
      }
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  logLevel: 'info'
}) 