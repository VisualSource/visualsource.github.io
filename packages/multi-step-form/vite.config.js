import { defineConfig } from "vite";

const ID = "/multi-step-form";

export default defineConfig(({ command }) => {
  return {
    base: command === "build" ? ID : "/",
    build: {
      outDir: `../../dist${ID}`,
      emptyOutDir: true,
    },
  };
});
