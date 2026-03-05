import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'
import { copyFileSync } from 'node:fs'

function spaFallback() {
  return {
    name: 'spa-fallback',
    closeBundle() {
      copyFileSync(resolve('dist/index.html'), resolve('dist/404.html'))
    },
  }
}

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    spaFallback()],
})
