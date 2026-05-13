import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') // '' loads ALL env vars, including non-VITE_

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/github': {
          target: 'https://api.github.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/github/, ''),
          headers: {
            Authorization: `Bearer ${env.GITHUB_TOKEN}`, // uses loadEnv, not process.env
          }
        }
      }
    }
  }
})