<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  export let value: string;
  let className = '';
  export { className as class };

  const ctx = getContext<any>('tabs') || { activeTab: { subscribe: () => {} }, setActive: () => {} };
  let isActive = false;

  ctx.activeTab.subscribe((v: string) => {
    isActive = v === value;
  });

  let tabElement: HTMLButtonElement;
</script>

<button
  bind:this={tabElement}
  role="tab"
  aria-selected={isActive}
  aria-controls="tabpanel-{value}"
  id="tab-{value}"
  class={className}
  on:click={() => ctx.setActive(value)}
  style="
    padding: var(--renge-space-2) var(--renge-space-4);
    border: none;
    border-bottom: {isActive
      ? '2px solid var(--renge-color-accent)'
      : '2px solid transparent'};
    background: transparent;
    color: {isActive ? 'var(--renge-color-accent)' : 'var(--renge-color-fg-subtle)'};
    font-size: var(--renge-font-size-base);
    font-family: inherit;
    font-weight: {isActive ? '600' : '400'};
    cursor: pointer;
    white-space: nowrap;
    transition: color var(--renge-duration-2) var(--renge-easing-ease-out), border-color var(--renge-duration-2) var(--renge-easing-spring);
    margin-bottom: -1px;
  "
  {...$$restProps}
>
  <slot />
</button>
