// Dos guías en el mismo proyecto:
//   /        → Guía CSS   (index.html)
//   /html/   → Guía HTML  (html/index.html)
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        css: resolve(import.meta.dirname, 'index.html'),
        html: resolve(import.meta.dirname, 'html/index.html')
      }
    }
  }
})
