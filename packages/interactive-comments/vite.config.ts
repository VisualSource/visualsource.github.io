import { defineConfig } from "vite";
import minifyLiterals from 'rollup-plugin-minify-html-literals-v3';

const ID = "/interactive-comments";

export default defineConfig(({ command }) => {
    return {
        base: command === "build" ? ID : "/",
        build: {
            copyPublicDir: true,
            outDir: `../../dist${ID}`,
            emptyOutDir: true,
        },
        plugins: [
            {
                ...minifyLiterals(),
                apply: "build"
            }
        ]
    };
});
