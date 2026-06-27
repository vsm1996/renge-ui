import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: false, // Preserve component files
  sourcemap: true,
  external: ["vue", "@renge-ui/tokens", /\.vue$/],
});
