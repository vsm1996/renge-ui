<script lang="ts">
  let className = '';
  export { className as class };

  let headElement: HTMLTableSectionElement;
</script>

<thead
  bind:this={headElement}
  class={className}
  style="
    background: var(--renge-color-bg-subtle);
    border-bottom: 2px solid var(--renge-color-border);
  "
  {...$$restProps}
>
  <slot />
</thead>
