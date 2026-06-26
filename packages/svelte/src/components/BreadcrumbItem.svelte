<script lang="ts">
  export let current: boolean = false;
  export let href: string | null = null;
  let className = '';
  export { className as class };
</script>

<li>
  {#if href && !current}
    <a
      {href}
      class={className}
      style="
        color: var(--renge-color-accent);
        text-decoration: none;
        transition: color var(--renge-duration-1) var(--renge-easing-ease-out);
      "
      on:mouseenter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--renge-color-accent-hover)';
        (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline';
      }}
      on:mouseleave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--renge-color-accent)';
        (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none';
      }}
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

<style>
  :global(li) {
    display: flex;
    align-items: center;
  }
</style>
