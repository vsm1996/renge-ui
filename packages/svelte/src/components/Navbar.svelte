<script lang="ts">
  type SpaceKey = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';

  export let sticky: boolean = false;
  export let border: boolean = true;
  export let height: string = '56px';
  export let paddingX: SpaceKey = '5';
  let className = '';
  export { className as class };

  let navElement: HTMLElement;

  const baseStyles = `
    display: flex;
    align-items: center;
    min-height: ${height};
    padding: 0 var(--renge-space-${paddingX});
    background: var(--renge-color-bg);
    border-bottom: ${border ? '1px solid var(--renge-color-border-subtle)' : 'none'};
    position: ${sticky ? 'sticky' : 'relative'};
    top: ${sticky ? '0' : 'auto'};
    z-index: ${sticky ? '100' : 'auto'};
    box-sizing: border-box;
  `;
</script>

<nav
  bind:this={navElement}
  class={className}
  style={baseStyles}
  {...$$restProps}
>
  <slot />
</nav>
