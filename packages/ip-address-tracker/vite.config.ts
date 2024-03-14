import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

const ID = "/ip-address-tracker";
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {

  return {
    base: command === "build" ? ID : "/",
    build: {
      copyPublicDir: true,
      outDir: `../../dist${ID}`,
      emptyOutDir: true,
    },
    plugins: [
      vue(),
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }

})
