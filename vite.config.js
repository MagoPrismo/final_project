import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: '/final_project/',
  root: "src/",

  server: {
    proxy: {
      // Sempre que o JS pedir algo que comece com '/pdgapi', 
      // o Vite vai redirecionar para o servidor real da PDG.
      '/pdgapi': {
        target: 'https://pdgapi.lbl.gov',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pdgapi/, '')
      }
    }
  },

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
      },
    },
  },
});