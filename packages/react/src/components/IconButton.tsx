// packages/react/src/components/IconButton.tsx
//
// Circular icon-only button. Sizes use the fractal scale (Fibonacci × baseUnit),
// ensuring each size step is self-similar — a precise mathematical miniature
// or magnification of the base.

import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import type { AnimationName } from '@renge-ui/tokens';

export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconButtonVariant = 'solid' | 'outline' | 'ghost';
export type IconButtonColorScheme = 'accent' | 'danger' | 'success' | 'neutral';

export interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  /** Accessible label (required for icon-only buttons) */
  'aria-label': string;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  colorScheme?: IconButtonColorScheme;
  animation?: AnimationName;
}

// Fractal sizes follow Fibonacci×baseUnit pattern
// xs:20 → sm:32 → md:40 → lg:52 → xl:84
const SIZE_PX: Record<IconButtonSize, number> = {
  xs: 20, sm: 32, md: 40, lg: 52, xl: 84,
};

const ICON_SIZE: Record<IconButtonSize, number> = {
  xs: 10, sm: 14, md: 18, lg: 22, xl: 32,
};

if (typeof document !== 'undefined') {
  const id = '__renge-icon-btn-css__';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
[data-renge-icon-btn] {
  transition: background var(--renge-duration-2) var(--renge-easing-ease-out),
              transform var(--renge-duration-1) var(--renge-easing-spring),
              filter var(--renge-duration-2) var(--renge-easing-ease-out),
              box-shadow var(--renge-duration-2) var(--renge-easing-ease-out) !important;
}
[data-renge-icon-btn][data-variant="ghost"]:not(:disabled):hover {
  background: var(--renge-color-bg-subtle) !important;
  transform: scale(1.08) !important;
}
[data-renge-icon-btn][data-variant="solid"]:not(:disabled):hover {
  filter: brightness(1.1) !important;
  transform: scale(1.08) !important;
}
[data-renge-icon-btn][data-variant="outline"]:not(:disabled):hover {
  background: color-mix(in oklch, currentColor 8%, transparent) !important;
  transform: scale(1.08) !important;
}
[data-renge-icon-btn]:not(:disabled):active {
  transform: scale(0.93) !important;
  filter: brightness(1) !important;
}
[data-renge-icon-btn]:disabled { opacity: 0.45; cursor: not-allowed; }
[data-renge-icon-btn]:focus-visible {
  outline: none !important;
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--renge-color-accent) 28%, transparent) !important;
}`;
    document.head.appendChild(s);
  }
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      size = 'md',
      variant = 'ghost',
      colorScheme = 'neutral',
      animation,
      style,
      children,
      ...props
    },
    ref
  ) {
    const px = SIZE_PX[size];

    const colorToken = colorScheme === 'neutral'
      ? 'var(--renge-color-fg-subtle)'
      : `var(--renge-color-${colorScheme})`;

    const variantStyles = (() => {
      switch (variant) {
        case 'solid':
          return {
            background: colorScheme === 'neutral'
              ? 'var(--renge-color-bg-subtle)'
              : `var(--renge-color-${colorScheme})`,
            color: colorScheme === 'neutral'
              ? 'var(--renge-color-fg)'
              : 'var(--renge-color-fg-inverse)',
            border: 'none',
          };
        case 'outline':
          return {
            background: 'transparent',
            color: colorToken,
            border: `1px solid ${colorToken}`,
          };
        case 'ghost':
          return {
            background: 'transparent',
            color: colorToken,
            border: 'none',
          };
      }
    })();

    return (
      <button
        ref={ref}
        data-renge-icon-btn=""
        data-variant={variant}
        style={{
          width: px,
          height: px,
          borderRadius: 'var(--renge-radius-full)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          fontSize: ICON_SIZE[size],
          lineHeight: 1,
          animation: animation ? `var(--renge-animation-${animation})` : undefined,
          ...variantStyles,
          ...style,
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);
