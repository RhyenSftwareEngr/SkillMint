/// <reference types="vitest" />
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import environment from "vite-plugin-environment";
import dotenv from "dotenv";

// Load environment variables from root .env file
dotenv.config({ path: "../../.env" });

export default defineConfig({
  build: {
    emptyOutDir: true, // Clear the dist directory before each build
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis", // Required for agent-js compatibility
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943", // Proxy to DFX replica
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
  ],
  test: {
    environment: "jsdom",
    setupFiles: "src/setupTests.js",
  },
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(new URL("../declarations", import.meta.url)),
      },
    ],
    dedupe: ["@dfinity/agent"], // Avoid duplication error with agent-js
  },
});
