import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/*.js",
      "**/*.mjs",
      "**/*.cjs",
    ],
  },

  // TypeScript base rules for all TS/TSX files
  ...tseslint.configs.recommended,

  // React hooks rules for packages that use React
  {
    files: ["packages/react/**/*.{ts,tsx}", "apps/**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },

  // Shared rule overrides
  {
    rules: {
      // Allow `any` in a few pragmatic spots — enforce no-explicit-any on stricter basis
      "@typescript-eslint/no-explicit-any": "warn",
      // Unused vars: error but allow underscore-prefixed params
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  }
);
