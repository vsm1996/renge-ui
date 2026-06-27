import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: false, // Preserve component files
  sourcemap: true,
  external: ["svelte", "@renge-ui/tokens", /\.svelte$/],
});
