<script lang="ts">
  let className = '';
  export { className as class };
</script>

<div
  class={className}
  style="
    padding: var(--renge-space-5);
    color: var(--renge-color-fg);
    font-size: var(--renge-font-size-base);
    line-height: var(--renge-line-height-relaxed);
  "
  {...$$restProps}
>
  <slot />
</div>
