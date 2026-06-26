<script lang="ts">
  import { onMount } from 'svelte';

  export let value: string;
  export let label = 'Copy';
  export let successLabel = 'Copied!';
  export let timeout = 2100;
  let className = '';
  export { className as class };

  let copied = false;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(value);
      copied = true;
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        copied = false;
      }, timeout);
    } catch {
      const el = document.createElement('textarea');
      el.value = value;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      copied = true;
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        copied = false;
      }, timeout);
    }
  }

  onMount(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  });
</script>

<button
  aria-label={copied ? successLabel : label}
  class={className}
  style="
    display: inline-flex;
    align-items: center;
    gap: var(--renge-space-1);
    padding: var(--renge-space-1) var(--renge-space-3);
    border: {copied
    ? '1px solid var(--renge-color-success)'
    : '1px solid var(--renge-color-border)'};
    border-radius: var(--renge-radius-1);
    background: {copied
    ? 'var(--renge-color-success-subtle)'
    : 'var(--renge-color-bg-subtle)'};
    color: {copied
    ? 'var(--renge-color-success)'
    : 'var(--renge-color-fg-subtle)'};
    font-size: var(--renge-font-size-sm);
    font-family: inherit;
    cursor: pointer;
    transition: all var(--renge-duration-2) var(--renge-easing-spring);
  "
  on:click={handleClick}
  {...$$restProps}
>
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {#if copied}
      <path
        d="M2 6l2.5 2.5L10 3"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    {:else}
      <rect
        x="4"
        y="4"
        width="7"
        height="7"
        rx="1"
        stroke="currentColor"
        stroke-width="1.2"
      />
      <path
        d="M3 8H2a1 1 0 01-1-1V2a1 1 0 011-1h5a1 1 0 011 1v1"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
      />
    {/if}
  </svg>
  {copied ? successLabel : label}
</button>
