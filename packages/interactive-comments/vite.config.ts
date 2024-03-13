import { defineConfig } from "vite";

const ID = "/interactive-comments";

export default defineConfig(({ command }) => {
    return {
        base: command === "build" ? ID : "/",
        build: {
            copyPublicDir: true,
            outDir: `../../dist${ID}`,
            emptyOutDir: true,
        },
    };
});
