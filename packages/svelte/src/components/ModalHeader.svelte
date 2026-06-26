<script lang="ts">
  let className = '';
  export { className as class };
</script>

<div
  class={className}
  style="
    padding: var(--renge-space-5);
    border-bottom: 1px solid var(--renge-color-border-subtle);
    display: flex;
    align-items: center;
    justify-content: space-between;
  "
  {...$$restProps}
>
  <slot />
</div>
