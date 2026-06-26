<script lang="ts">
  type SpaceKey = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';

  export let orientation: 'horizontal' | 'vertical' = 'horizontal';
  export let radius: 'none' | '1' | '2' | '3' | 'full' = '2';
  export let attached: boolean = true;
  let className = '';
  export { className as class };

  let groupElement: HTMLElement;

  const baseStyles = `
    display: inline-flex;
    flex-direction: ${orientation === 'horizontal' ? 'row' : 'column'};
    border-radius: var(--renge-radius-${radius});
    gap: ${attached ? '0' : 'var(--renge-space-1)'};
  `;
</script>

<div
  bind:this={groupElement}
  role="group"
  data-button-group
  class={className}
  style={baseStyles}
  {...$$restProps}
>
  <slot />
</div>
