import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  return {
    base: command === "build" ? "/multi-step-form" : "/",
    build: {
      outDir: "../../dist/mutli-step-form",
      emptyOutDir: true,
    },
  };
});
