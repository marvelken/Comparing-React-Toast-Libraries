import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: process.env.VITE_ENTRY
        ? resolve(import.meta.dirname, process.env.VITE_ENTRY)
        : resolve(import.meta.dirname, 'index.html'),
    },
  },
})
