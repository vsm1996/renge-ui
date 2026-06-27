import { defineConfig } from 'vitest/config'
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte({
    hot: !process.env.VITEST,
    preprocess: vitePreprocess(),
  })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/vitest-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
  },
})
