import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// GitHub Pages base path. If deploying to https://<user>.github.io/<repo>/,
// set base to "/<repo>/". For a user/organization site (https://<user>.github.io),
// keep "/".
//
// Example for nrudev.github.io/portfolio:
//   base: "/portfolio/"
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
