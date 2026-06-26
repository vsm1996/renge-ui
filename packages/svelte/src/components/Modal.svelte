<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let open: boolean = false;
  export let onClose: (() => void) | undefined = undefined;
  export let size: 'sm' | 'md' | 'lg' = 'md';
  let className = '';
  export { className as class };

  let dialogEl: HTMLDivElement;
  let overlayEl: HTMLDivElement;
  let exiting = false;

  const sizeMap = {
    sm: 'max-width: 400px;',
    md: 'max-width: 600px;',
    lg: 'max-width: 800px;',
  };

  function handleClose() {
    exiting = true;
    setTimeout(() => {
      if (onClose) onClose();
    }, 200);
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === overlayEl) {
      handleClose();
    }
  }

  onMount(() => {
    if (open && dialogEl) {
      dialogEl.focus();
    }
  });

  onDestroy(() => {
    // Cleanup
  });
</script>

{#if open}
  <div
    bind:this={overlayEl}
    role="presentation"
    style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, {exiting ? '0' : '0.5'});
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      transition: background var(--renge-duration-3);
    "
    on:click={handleBackdropClick}
  >
    <div
      bind:this={dialogEl}
      role="dialog"
      aria-modal="true"
      class={className}
      style="
        {sizeMap[size]}
        width: 90%;
        background: var(--renge-color-bg);
        border-radius: var(--renge-radius-2);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        opacity: {exiting ? '0' : '1'};
        transform: scale({exiting ? '0.95' : '1'});
        transition: opacity var(--renge-duration-2) var(--renge-easing-spring), transform var(--renge-duration-2) var(--renge-easing-spring);
        max-height: 90vh;
        overflow-y: auto;
        outline: none;
      "
    >
      <slot />
    </div>
  </div>
{/if}
