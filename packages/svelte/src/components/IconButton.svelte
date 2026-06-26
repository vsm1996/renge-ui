<script lang="ts">
  export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let variant: 'solid' | 'outline' | 'ghost' = 'ghost';
  export let colorScheme: 'accent' | 'danger' | 'success' | 'neutral' = 'neutral';
  export let animation: string | undefined = undefined;
  export let style = '';

  const SIZE_PX = { xs: 20, sm: 32, md: 40, lg: 52, xl: 84 };
  const ICON_SIZE = { xs: 10, sm: 14, md: 18, lg: 22, xl: 32 };

  const px = SIZE_PX[size];
  const iconSize = ICON_SIZE[size];

  const colorToken = colorScheme === 'neutral'
    ? 'var(--renge-color-fg-subtle)'
    : `var(--renge-color-${colorScheme})`;

  const getVariantStyles = (): string => {
    switch (variant) {
      case 'solid':
        return colorScheme === 'neutral'
          ? 'background: var(--renge-color-bg-subtle); color: var(--renge-color-fg); border: none;'
          : `background: var(--renge-color-${colorScheme}); color: var(--renge-color-fg-inverse); border: none;`;
      case 'outline':
        return `background: transparent; color: ${colorToken}; border: 1px solid ${colorToken};`;
      case 'ghost':
        return `background: transparent; color: ${colorToken}; border: none;`;
    }
  };

  const baseStyles = `
    width: ${px}px;
    height: ${px}px;
    border-radius: var(--renge-radius-full);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: all var(--renge-duration-2) var(--renge-easing-ease-out);
    font-size: ${iconSize}px;
    line-height: 1;
    ${getVariantStyles()}
    ${animation ? `animation: var(--renge-animation-${animation});` : ''}
  `;

  let isHovered = false;

  const handleMouseEnter = () => {
    if (variant === 'ghost') isHovered = true;
  };

  const handleMouseLeave = () => {
    if (variant === 'ghost') isHovered = false;
  };
</script>

<button
  style="{baseStyles} {isHovered && variant === 'ghost' ? 'background: var(--renge-color-bg-subtle);' : ''} {style}"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  {...$$restProps}
>
  <slot />
</button>
