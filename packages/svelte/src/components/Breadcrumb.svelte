<script lang="ts">
  let className = '';
  export { className as class };
</script>

<nav
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
