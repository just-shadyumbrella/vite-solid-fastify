import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

const DEV = new URL(process.env.DEV_URL || 'http://localhost:5173')
const API = new URL(process.env.API_ENDPOINT || 'http://localhost:3000/api')

export default defineConfig({
  plugins: [solid()],
  server: {
    host: DEV.hostname,
    port: Number(DEV.port),
    proxy: {
      // Proxy server requests to the backend, you can adjust based on your server endpoints
      [API.pathname]: {
        target: API,
        changeOrigin: true,
      },
    },
  },
})
