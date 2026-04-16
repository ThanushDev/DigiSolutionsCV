import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/DigiSolutionsCV/', // ඔයාගේ repo නම මෙතන තියෙන්න ඕනේ
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    assetsInlineLimit: 4096, 
  },
  server: {
    port: 3000,
    open: true
  }
})
