<script lang="ts">
  import { writable, type Writable } from 'svelte/store';
  import { onMount } from 'svelte';

  interface ToastItem {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
  }

  export let toasts: Writable<ToastItem[]> = writable([]);
  let containerEl: HTMLDivElement;

  let counter = 0;

  function addToast(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration?: number) {
    const id = String(++counter);
    toasts.update((t) => [...t, { id, message, type, duration }]);
    if (duration === undefined) duration = 4000;
    setTimeout(() => removeToast(id), duration);
  }

  function removeToast(id: string) {
    toasts.update((t) => t.filter((item) => item.id !== id));
  }

  // Guard window: the instance script also runs during SSR, where it is undefined.
  if (typeof window !== 'undefined') {
    (window as any).toast = { add: addToast, remove: removeToast };
  }

  onMount(() => {
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).toast;
      }
    };
  });
</script>

<div
  bind:this={containerEl}
  style="
    position: fixed;
    bottom: var(--renge-space-4);
    right: var(--renge-space-4);
    z-index: 2000;
    display: flex;
    flex-direction: column;
    gap: var(--renge-space-2);
    pointer-events: none;
  "
>
  {#each $toasts as toast (toast.id)}
    <div style="pointer-events: auto;">
      <div
        style="
          padding: var(--renge-space-3) var(--renge-space-4);
          border-radius: var(--renge-radius-2);
          background: {toast.type === 'success'
            ? 'var(--renge-color-success-subtle)'
            : toast.type === 'error'
              ? 'var(--renge-color-danger-subtle)'
              : toast.type === 'warning'
                ? 'var(--renge-color-warning-subtle)'
                : 'var(--renge-color-accent-subtle)'};
          color: {toast.type === 'success'
            ? 'var(--renge-color-success)'
            : toast.type === 'error'
              ? 'var(--renge-color-danger)'
              : toast.type === 'warning'
                ? 'var(--renge-color-warning)'
                : 'var(--renge-color-accent)'};
          border: 1px solid;
          font-size: var(--renge-font-size-sm);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          animation: slideIn 0.3s var(--renge-easing-spring);
        "
      >
        {toast.message}
      </div>
    </div>
  {/each}
</div>

<style>
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>

<slot />
