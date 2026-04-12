import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages වලදී path ප්‍රශ්න ඇති නොවීමට මෙම base කොටස අනිවාර්ය වේ.
  // මෙතැනදී ඔයාගේ repository නම නිවැරදිව ඇතුළත් කර ඇත.
  base: '/DigiSolutionsCV/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // කුඩා images කෙලින්ම JS එකට ඇතුළත් කර වේගය වැඩි කිරීමට
    assetsInlineLimit: 4096, 
  },
  server: {
    port: 3000,
    open: true
  }
})
