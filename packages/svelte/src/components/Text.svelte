<script lang="ts">
  export let size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' = 'base';
  export let color: 'fg' | 'fg-subtle' | 'fg-muted' | 'accent' | 'success' | 'warning' | 'danger' = 'fg';
  export let weight: 'normal' | 'medium' | 'semibold' | 'bold' = 'normal';
  export let align: 'left' | 'center' | 'right' | undefined = undefined;
  export let animation: string | undefined = undefined;
  export let style = '';

  const weightMap = {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  };

  const baseStyles = `
    font-size: var(--renge-font-size-${size});
    line-height: var(--renge-line-height-${size});
    color: var(--renge-color-${color});
    font-weight: ${weightMap[weight]};
    ${align ? `text-align: ${align};` : ''}
    ${animation ? `animation: var(--renge-animation-${animation});` : ''}
  `;
</script>

<span style="{baseStyles} {style}" {...$$restProps}>
  <slot />
</span>
