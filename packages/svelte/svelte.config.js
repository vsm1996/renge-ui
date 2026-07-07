import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// Used by svelte-package (and svelte-check) to strip lang="ts" from SFCs.
export default {
  preprocess: vitePreprocess(),
};
