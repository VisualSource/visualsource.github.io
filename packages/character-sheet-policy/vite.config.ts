import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const ID = "/character-sheet-privacy-policy";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: command === "build" ? ID : "/",
    build: {
      copyPublicDir: true,
      outDir: `../../dist${ID}`,
      emptyOutDir: true,
    },
    plugins: [vue()],
  }
})
