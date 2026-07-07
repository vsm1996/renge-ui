<script lang="ts">
  export let current: boolean = false;
  export let href: string | null = null;
  let className = '';
  export { className as class };

  // Handlers live here (not inline) so their TS type casts get preprocessed —
  // vitePreprocess only strips TS from <script>, not from template expressions.
  function handleEnter(e: MouseEvent) {
    const el = e.currentTarget as HTMLAnchorElement;
    el.style.color = 'var(--renge-color-accent-hover)';
    el.style.textDecoration = 'underline';
  }
  function handleLeave(e: MouseEvent) {
    const el = e.currentTarget as HTMLAnchorElement;
    el.style.color = 'var(--renge-color-accent)';
    el.style.textDecoration = 'none';
  }
</script>

<li style="display: flex; align-items: center; gap: var(--renge-space-1);">
  {#if href && !current}
    <a
      {href}
      class={className}
      style="
        color: var(--renge-color-accent);
        text-decoration: none;
        transition: color var(--renge-duration-1) var(--renge-easing-ease-out);
      "
      on:mouseenter={handleEnter}
      on:mouseleave={handleLeave}
      {...$$restProps}
    >
      <slot />
    </a>
  {:else}
    <span
      class={className}
      aria-current={current ? 'page' : undefined}
      style="
        color: {current ? 'var(--renge-color-fg)' : 'var(--renge-color-fg-subtle)'};
        font-weight: {current ? '500' : 'normal'};
      "
      {...$$restProps}
    >
      <slot />
    </span>
  {/if}
</li>
