<script lang="ts">
  export let className = '';
  export { className as class };

  let tabListElement: HTMLDivElement;
</script>

<div
  bind:this={tabListElement}
  role="tablist"
  class={className}
  style="
    display: flex;
    gap: 0;
    border-bottom: 1px solid var(--renge-color-border-subtle);
    overflow-x: auto;
  "
  {...$$restProps}
>
  <slot />
</div>
