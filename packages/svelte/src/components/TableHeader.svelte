<script lang="ts">
  let className = '';
  export { className as class };

  let headerElement: HTMLTableCellElement;
</script>

<th
  bind:this={headerElement}
  class={className}
  style="
    padding: var(--renge-space-2) var(--renge-space-4);
    text-align: left;
    font-size: var(--renge-font-size-sm);
    font-weight: 600;
    color: var(--renge-color-fg-subtle);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    white-space: nowrap;
  "
  {...$$restProps}
>
  <slot />
</th>
