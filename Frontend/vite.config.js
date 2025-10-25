import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'


export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
  },
  publicDir: 'public',
  server: {
    proxy: {
      "/api": "http://localhost:5000"
    }
  },
  plugins: [react()],
})
