<script lang="ts">
  import { onMount } from 'svelte';

  export let separator: any = null;
  let className = '';
  export { className as class };

  let navElement: HTMLElement;
  let items: HTMLElement[] = [];

  onMount(() => {
    items = Array.from(navElement?.querySelectorAll('li') || []);
  });

  const DefaultSeparator = `
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink: 0;">
      <path d="M4 2.5l3.5 3.5L4 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
</script>

<nav
  bind:this={navElement}
  aria-label="Breadcrumb"
  class={className}
  {...$$restProps}
>
  <ol
    style="
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--renge-space-1);
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: var(--renge-font-size-sm);
      color: var(--renge-color-fg-subtle);
    "
  >
    <slot />
  </ol>
</nav>

<style>
  :global(nav ol li) {
    display: flex;
    align-items: center;
    gap: var(--renge-space-1);
  }

  :global(nav ol li:not(:last-child)::after) {
    content: '';
    color: var(--renge-color-fg-muted);
    display: flex;
    align-items: center;
  }
</style>
