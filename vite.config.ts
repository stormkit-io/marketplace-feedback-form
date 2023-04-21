import { defineConfig } from "vite";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  define: {
    "process.env.API_URL": JSON.stringify(process.env.API_URL),
  },
  build: {
    rollupOptions: {
      input: { widget: "./src/widget.tsx" },

      output: {
        format: "esm",
        dir: `.stormkit/public`,
        entryFileNames: "[name].js",
        sourcemap: true,
      },
    },
  },
});
