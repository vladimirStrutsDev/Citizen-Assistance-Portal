import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@core": path.resolve(__dirname, "./src/core"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          redux: ["@reduxjs/toolkit", "react-redux", "redux-persist"],
          router: ["react-router-dom"],
          i18n: ["i18next", "react-i18next"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@reduxjs/toolkit", "react-redux"],
  },
});
