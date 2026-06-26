<script lang="ts">
  let className = '';
  export { className as class };

  let footElement: HTMLTableSectionElement;
</script>

<tfoot
  bind:this={footElement}
  class={className}
  style="
    border-top: 2px solid var(--renge-color-border);
    background: var(--renge-color-bg-subtle);
  "
  {...$$restProps}
>
  <slot />
</tfoot>
