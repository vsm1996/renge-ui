<script lang="ts">
  let className = '';
  export { className as class };

  let bodyElement: HTMLTableSectionElement;
</script>

<tbody bind:this={bodyElement} class={className} {...$$restProps}>
  <slot />
</tbody>
