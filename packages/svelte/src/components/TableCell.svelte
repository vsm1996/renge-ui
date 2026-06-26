<script lang="ts">
  export let muted: boolean = false;
  let className = '';
  export { className as class };

  let cellElement: HTMLTableCellElement;
</script>

<td
  bind:this={cellElement}
  class={className}
  style="
    padding: var(--renge-space-3) var(--renge-space-4);
    color: {muted ? 'var(--renge-color-fg-muted)' : 'var(--renge-color-fg)'};
    font-size: var(--renge-font-size-base);
    vertical-align: middle;
  "
  {...$$restProps}
>
  <slot />
</td>
