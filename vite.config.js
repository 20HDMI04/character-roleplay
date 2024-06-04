import path from "node:path";
import process from "node:process";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    open: "../src/html/index.html",
  }
});