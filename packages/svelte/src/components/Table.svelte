<script lang="ts">
  export let striped: boolean = false;
  export let bordered: boolean = false;
  let className = '';
  export { className as class };

  let tableElement: HTMLTableElement;
</script>

<div
  style="
    overflow-x: auto;
    border-radius: var(--renge-radius-2);
    border: {bordered ? '1px solid var(--renge-color-border-subtle)' : 'none'};
  "
>
  <table
    bind:this={tableElement}
    class={className}
    data-striped={striped ? 'true' : undefined}
    style="
      width: 100%;
      border-collapse: collapse;
      font-size: var(--renge-font-size-base);
      color: var(--renge-color-fg);
      font-family: inherit;
    "
    {...$$restProps}
  >
    <slot />
  </table>
</div>
