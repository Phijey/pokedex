import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Encaminha /api para o backend Spring Boot (evita problemas de CORS no dev)
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
