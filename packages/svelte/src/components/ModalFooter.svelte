<script lang="ts">
  let className = '';
  export { className as class };
</script>

<div
  class={className}
  style="
    padding: var(--renge-space-5);
    border-top: 1px solid var(--renge-color-border-subtle);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--renge-space-3);
  "
  {...$$restProps}
>
  <slot />
</div>
