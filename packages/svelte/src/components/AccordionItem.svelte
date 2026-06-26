<script lang="ts">
  import { getContext } from 'svelte';
  import { onMount } from 'svelte';

  export let id: string;
  export let title: string;
  let className = '';
  export { className as class };

  const ctx = getContext<any>('accordion') || { openIds: { subscribe: () => {} }, toggle: () => {} };
  let isOpen = false;
  let contentEl: HTMLDivElement;
  let scrollHeight = 0;

  ctx.openIds.subscribe((ids: Set<string>) => {
    isOpen = ids.has(id);
    if (contentEl && isOpen) {
      scrollHeight = contentEl.scrollHeight;
    }
  });

  onMount(() => {
    if (contentEl) {
      scrollHeight = contentEl.scrollHeight;
    }
  });
</script>

<div class={className} style="border-bottom: 1px solid var(--renge-color-border-subtle);">
  <button
    type="button"
    style="
      width: 100%;
      padding: var(--renge-space-4);
      text-align: left;
      background: transparent;
      border: none;
      color: var(--renge-color-fg);
      font-size: var(--renge-font-size-base);
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all var(--renge-duration-2) var(--renge-easing-ease-out);
    "
    on:click={() => ctx.toggle(id)}
  >
    <span>{title}</span>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style="transform: rotate({isOpen ? '180deg' : '0'}); transition: transform var(--renge-duration-2);"
      aria-hidden="true"
    >
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
  <div
    bind:this={contentEl}
    style="
      max-height: {isOpen ? scrollHeight + 'px' : '0'};
      overflow: hidden;
      transition: max-height var(--renge-duration-3) var(--renge-easing-ease-out);
    "
  >
    <div style="padding: 0 var(--renge-space-4) var(--renge-space-4);">
      <slot />
    </div>
  </div>
</div>
