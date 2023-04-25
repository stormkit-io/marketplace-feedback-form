import { defineConfig } from "vite";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  define: {
    "process.env.FF_API_URL": JSON.stringify(
      process.env.FF_API_URL || `${process.env.SK_ENV_URL}/api`
    ),
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
