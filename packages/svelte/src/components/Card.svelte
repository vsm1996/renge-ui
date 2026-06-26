<script lang="ts">
  export let padding: '0' | '1' | '2' | '3' | '4' | '5' | '6' = '4';
  export let radius: 'none' | '1' | '2' | '3' | '4' | '5' | 'full' = '3';
  export let variant: 'elevated' | 'outlined' | 'filled' = 'elevated';
  export let animation: string | undefined = undefined;
  export let style = '';

  const variantStyles = {
    elevated: `
      background-color: var(--renge-color-bg);
      box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
    `,
    outlined: `
      background-color: var(--renge-color-bg);
      border: 1px solid var(--renge-color-border);
    `,
    filled: `
      background-color: var(--renge-color-bg-subtle);
    `,
  };

  const baseStyles = `
    padding: var(--renge-space-${padding});
    border-radius: var(--renge-radius-${radius});
    ${variantStyles[variant]}
    ${animation ? `animation: var(--renge-animation-${animation});` : ''}
  `;
</script>

<div style="{baseStyles} {style}" {...$$restProps}>
  <slot />
</div>
