<script lang="ts">
  export let index: number | undefined = undefined;
  let className = '';
  export { className as class };

  let rowElement: HTMLTableRowElement;

  const isEven = index !== undefined && index % 2 === 1;
</script>

<tr
  bind:this={rowElement}
  class={className}
  style="
    background: {isEven ? 'var(--renge-color-bg-subtle)' : 'transparent'};
    border-bottom: 1px solid var(--renge-color-border-subtle);
    transition: background var(--renge-duration-1) var(--renge-easing-ease-out);
  "
  {...$$restProps}
>
  <slot />
</tr>
