import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: '/final_project/',
  root: "src/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        constants: resolve(__dirname, "src/constants.html"), // Adicione esta linha
      },
    },
  },
});