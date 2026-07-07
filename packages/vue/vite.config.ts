// Library build config. Tests use vitest.config.ts (vitest prefers it when
// both exist). Declarations are emitted separately by vue-tsc — see the
// build script in package.json.
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.mjs" : "index.js"),
    },
    sourcemap: true,
    rollupOptions: {
      external: ["vue", "@renge-ui/tokens"],
    },
  },
});
