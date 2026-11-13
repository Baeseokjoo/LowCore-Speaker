import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 주소(https://<사용자>.github.io/LowCore-Speaker/)에 맞춘 기본 경로
  base: '/LowCore-Speaker/',
  plugins: [react()],
})
