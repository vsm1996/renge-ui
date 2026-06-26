<script lang="ts">
  export let variant: 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' = 'neutral';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let style = '';

  const colorVars = (v: string) => {
    if (v === 'neutral') {
      return {
        background: 'var(--renge-color-bg-subtle)',
        color: 'var(--renge-color-fg-muted)',
        borderColor: 'var(--renge-color-border-subtle)',
      };
    }
    return {
      background: `var(--renge-color-${v}-subtle)`,
      color: `var(--renge-color-${v})`,
      borderColor: `var(--renge-color-${v})`,
    };
  };

  const sizeStyles = {
    sm: 'padding: var(--renge-space-1) var(--renge-space-2); font-size: var(--renge-font-size-xs);',
    md: 'padding: var(--renge-space-1) var(--renge-space-3); font-size: var(--renge-font-size-xs);',
    lg: 'padding: var(--renge-space-2) var(--renge-space-3); font-size: var(--renge-font-size-sm);',
  };

  const colors = colorVars(variant);

  const baseStyles = `
    display: inline-flex;
    align-items: center;
    line-height: 1;
    font-weight: 500;
    border-radius: var(--renge-radius-full);
    border: 1px solid ${colors.borderColor};
    background: ${colors.background};
    color: ${colors.color};
    ${sizeStyles[size]}
  `;
</script>

<span style="{baseStyles} {style}" {...$$restProps}>
  <slot />
</span>
