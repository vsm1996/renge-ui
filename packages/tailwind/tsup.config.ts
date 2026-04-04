import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/v4-plugin.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ["@renge-ui/tokens", "tailwindcss"],
});
