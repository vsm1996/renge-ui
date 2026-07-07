<script lang="ts">
  import { onMount } from 'svelte';

  export let type: 'success' | 'error' | 'info' | 'warning' = 'info';
  export let message: string = '';
  export let duration: number | undefined = undefined;
  export let onClose: (() => void) | undefined = undefined;
  let className = '';
  export { className as class };

  let exiting = false;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const colorMap = {
    success: 'var(--renge-color-success)',
    error: 'var(--renge-color-danger)',
    info: 'var(--renge-color-accent)',
    warning: 'var(--renge-color-warning)',
  };

  const bgColorMap = {
    success: 'var(--renge-color-success-subtle)',
    error: 'var(--renge-color-danger-subtle)',
    info: 'var(--renge-color-accent-subtle)',
    warning: 'var(--renge-color-warning-subtle)',
  };

  onMount(() => {
    if (duration) {
      timeoutId = setTimeout(() => {
        exiting = true;
        setTimeout(() => onClose?.(), 200);
      }, duration);
    }
  });

  const handleClose = () => {
    exiting = true;
    setTimeout(() => onClose?.(), 200);
  };

  // Handlers live here (not inline) so their TS type casts get preprocessed —
  // vitePreprocess only strips TS from <script>, not from template expressions.
  function handleBtnEnter(e: MouseEvent) {
    (e.currentTarget as HTMLButtonElement).style.opacity = '1';
  }
  function handleBtnLeave(e: MouseEvent) {
    (e.currentTarget as HTMLButtonElement).style.opacity = '0.7';
  }
</script>

<div
  role="status"
  aria-live="polite"
  class={className}
  style="
    padding: var(--renge-space-3) var(--renge-space-4);
    border-radius: var(--renge-radius-2);
    background: {bgColorMap[type]};
    color: {colorMap[type]};
    border: 1px solid {colorMap[type]};
    font-size: var(--renge-font-size-sm);
    display: flex;
    align-items: center;
    gap: var(--renge-space-3);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    opacity: {exiting ? '0' : '1'};
    transform: translateY({exiting ? '10px' : '0'});
    transition: opacity var(--renge-duration-2) var(--renge-easing-ease-out), transform var(--renge-duration-2) var(--renge-easing-ease-out);
  "
  {...$$restProps}
>
  <span style="flex: 1;">{message}</span>
  <button
    type="button"
    style="
      background: transparent;
      border: none;
      color: inherit;
      cursor: pointer;
      padding: 0;
      font-size: var(--renge-font-size-base);
      opacity: 0.7;
      transition: opacity var(--renge-duration-1);
    "
    on:click={handleClose}
    on:mouseenter={handleBtnEnter}
    on:mouseleave={handleBtnLeave}
  >
    ✕
  </button>
</div>
