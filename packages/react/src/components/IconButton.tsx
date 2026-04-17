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
        style={{
          width: px,
          height: px,
          borderRadius: 'var(--renge-radius-full)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          transition: `all var(--renge-duration-2) var(--renge-easing-ease-out)`,
          fontSize: ICON_SIZE[size],
          lineHeight: 1,
          animation: animation ? `var(--renge-animation-${animation})` : undefined,
          ...variantStyles,
          ...style,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          if (variant === 'ghost') el.style.background = 'var(--renge-color-bg-subtle)';
          props.onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          if (variant === 'ghost') el.style.background = 'transparent';
          props.onMouseLeave?.(e);
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);
