import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/econverse": {
        target: "https://app.econverse.com.br",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/econverse/, ""),
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
