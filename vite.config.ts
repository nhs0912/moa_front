import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
// import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  // plugins: [vue(), tailwindcss(), cloudflare()],
  plugins: [vue(), tailwindcss()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  server: {
    proxy: {
      "/api": {
        target: "https://sajin-moa-dev.duckdns.org",
        changeOrigin: true,
      },
    },
  },
});
