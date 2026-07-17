import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// No backend calls are made from the frontend build — the FastAPI
// service only serves the built static files. Keeping this config
// minimal on purpose.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist'
  }
})
