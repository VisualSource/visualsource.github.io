import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "node:path";


const ID = "/country-viewer";
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: command === "build" ? ID : "/",
    plugins: [react()],
    build: {
      outDir: `../../dist${ID}`,
      emptyOutDir: true
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    }
  }
})
