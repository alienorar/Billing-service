import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@modules", replacement: "/src/modules" },
      { find: "@api", replacement: "/src/api" },
      { find: "@utils", replacement: "/src/utils" },
      { find: "@types", replacement: "/src/types" },
      { find: "@components", replacement: "/src/components" },
    ]
  },
  server: {
    port: 5173, 
    strictPort: false,
    host: true,
    cors: true, 
    proxy: {
      '/api': {
        target: 'https://4129-188-113-237-24.ngrok-free.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
