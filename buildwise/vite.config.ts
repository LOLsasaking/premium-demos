import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Deploys under a sub-path (e.g. GitHub Pages project sites) set VITE_BASE.
  base: process.env.VITE_BASE ?? '/',
  // VITE_SINGLEFILE=1 produces one JS bundle (no lazy chunks) for
  // self-contained single-file distributions of the app.
  build: process.env.VITE_SINGLEFILE
    ? { rollupOptions: { output: { inlineDynamicImports: true } } }
    : undefined,
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
})
