import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/dashboard/', // 👈 Ruta base correcta
   build: {
    minify: false // 👈 desactiva minificación
  }
})
