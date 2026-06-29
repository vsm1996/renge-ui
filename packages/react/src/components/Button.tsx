// packages/react/src/components/Button.tsx

import { forwardRef, type ComponentPropsWithoutRef } from 'react';

if (typeof document !== 'undefined') {
  const id = '__renge-button-css__';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
[data-renge-button] {
  transition: transform var(--renge-duration-1) var(--renge-easing-spring),
              filter var(--renge-duration-2) var(--renge-easing-ease-out),
              box-shadow var(--renge-duration-2) var(--renge-easing-ease-out),
              background var(--renge-duration-2) var(--renge-easing-ease-out) !important;
}
[data-renge-button][data-variant="solid"]:not(:disabled):hover {
  filter: brightness(1.08) !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 var(--renge-space-1) var(--renge-space-3) color-mix(in oklch, var(--renge-color-fg) 12%, transparent) !important;
}
[data-renge-button][data-variant="outline"]:not(:disabled):hover {
  background: color-mix(in oklch, currentColor 8%, transparent) !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 var(--renge-space-1) var(--renge-space-2) color-mix(in oklch, var(--renge-color-fg) 8%, transparent) !important;
}
[data-renge-button][data-variant="ghost"]:not(:disabled):hover {
  background: var(--renge-color-bg-subtle) !important;
  transform: translateY(-1px) !important;
}
[data-renge-button]:not(:disabled):active {
  transform: translateY(0) scale(0.97) !important;
  box-shadow: none !important;
  filter: brightness(1) !important;
}
[data-renge-button]:disabled { opacity: 0.45; cursor: not-allowed; }
[data-renge-button]:focus-visible {
  outline: none !important;
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--renge-color-accent) 28%, transparent) !important;
}`;
    document.head.appendChild(s);
  }
}
import type { AnimationName } from '@renge-ui/tokens';

type SizeKey = 'sm' | 'md' | 'lg';
type Variant = 'solid' | 'outline' | 'ghost';
type ColorScheme = 'accent' | 'danger' | 'success';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  size?: SizeKey;
  variant?: Variant;
  colorScheme?: ColorScheme;
  fullWidth?: boolean;
  animation?: AnimationName;
}

const sizeStyles: Record<SizeKey, React.CSSProperties> = {
  sm: {
    padding: 'var(--renge-space-1) var(--renge-space-2)',
    fontSize: 'var(--renge-font-size-sm)',
  },
  md: {
    padding: 'var(--renge-space-2) var(--renge-space-4)',
    fontSize: 'var(--renge-font-size-base)',
  },
  lg: {
    padding: 'var(--renge-space-3) var(--renge-space-5)',
    fontSize: 'var(--renge-font-size-lg)',
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      size = 'md',
      variant = 'solid',
      colorScheme = 'accent',
      fullWidth = false,
      animation,
      style,
      children,
      ...props
    },
    ref
  ) {
    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'solid':
          return {
            backgroundColor: `var(--renge-color-${colorScheme})`,
            color: 'var(--renge-color-fg-inverse)',
            border: 'none',
          };
        case 'outline':
          return {
            backgroundColor: 'transparent',
            color: `var(--renge-color-${colorScheme})`,
            border: `1px solid var(--renge-color-${colorScheme})`,
          };
        case 'ghost':
          return {
            backgroundColor: 'transparent',
            color: `var(--renge-color-${colorScheme})`,
            border: 'none',
          };
      }
    };

    return (
      <button
        ref={ref}
        data-renge-button=""
        data-variant={variant}
        style={{
          ...sizeStyles[size],
          ...getVariantStyles(),
          borderRadius: 'var(--renge-radius-2)',
          fontWeight: 500,
          cursor: 'pointer',
          width: fullWidth ? '100%' : undefined,
          animation: animation ? `var(--renge-animation-${animation})` : undefined,
          ...style,
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);