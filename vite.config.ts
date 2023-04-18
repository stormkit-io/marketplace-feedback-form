import { defineConfig } from "vite";

export default defineConfig({
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
