<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let variant: 'solid' | 'outline' | 'ghost' = 'solid';
  export let colorScheme: 'accent' | 'danger' | 'success' = 'accent';
  export let fullWidth = false;
  export let animation: string | undefined = undefined;
  export let style = '';

  const sizeStyles = {
    sm: 'padding: var(--renge-space-1) var(--renge-space-2); font-size: var(--renge-font-size-sm);',
    md: 'padding: var(--renge-space-2) var(--renge-space-4); font-size: var(--renge-font-size-base);',
    lg: 'padding: var(--renge-space-3) var(--renge-space-5); font-size: var(--renge-font-size-lg);',
  };

  const getVariantStyles = (): string => {
    switch (variant) {
      case 'solid':
        return `
          background-color: var(--renge-color-${colorScheme});
          color: var(--renge-color-fg-inverse);
          border: none;
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: var(--renge-color-${colorScheme});
          border: 1px solid var(--renge-color-${colorScheme});
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: var(--renge-color-${colorScheme});
          border: none;
        `;
    }
  };

  const baseStyles = `
    ${sizeStyles[size]}
    ${getVariantStyles()}
    border-radius: var(--renge-radius-2);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--renge-duration-2) var(--renge-easing-ease-out);
    ${fullWidth ? 'width: 100%;' : ''}
    ${animation ? `animation: var(--renge-animation-${animation});` : ''}
  `;
</script>

<button style="{baseStyles} {style}" {...$$restProps} on:click>
  <slot />
</button>
