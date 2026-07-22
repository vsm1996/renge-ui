import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  minify: true,
  sourcemap: true,
  external: ["react", "react-dom", "@renge-ui/tokens"],
  // Mark the whole bundle a React Server Components client boundary. The library
  // is one bundled entry, and tsup drops per-module "use client" directives, so
  // without this ANY import (Button, etc.) evaluates module-scope client code
  // (createContext in the provider, hooks) and throws in a server component —
  // i.e. the package couldn't be imported from a Next App Router app at all.
  // A design system's interactive components are client components anyway; this
  // makes the package importable from RSC as a client boundary. (For server
  // code that wants the pure token helpers re-exported here — createRengeTheme,
  // PHI, … — import them from @renge-ui/tokens instead, which stays server-safe.
  // A future enhancement could split the bundle to keep presentational
  // primitives server-renderable; that is deliberately out of scope here.)
  banner: { js: '"use client";' },
});
