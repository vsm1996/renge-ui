// packages/react/src/components/Card.tsx

import { forwardRef, type ComponentPropsWithoutRef } from 'react';

if (typeof document !== 'undefined') {
  const id = '__renge-card-css__';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
[data-renge-card] {
  transition: transform var(--renge-duration-2) var(--renge-easing-spring),
              box-shadow var(--renge-duration-2) var(--renge-easing-ease-out),
              background var(--renge-duration-2) var(--renge-easing-ease-out),
              border-color var(--renge-duration-2) var(--renge-easing-ease-out) !important;
}
[data-renge-card][data-variant="elevated"]:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 var(--renge-space-2) var(--renge-space-4) color-mix(in oklch, var(--renge-color-fg) 14%, transparent) !important;
}
[data-renge-card][data-variant="outlined"]:hover {
  border-color: var(--renge-color-border) !important;
  box-shadow: 0 var(--renge-space-1) var(--renge-space-3) color-mix(in oklch, var(--renge-color-fg) 8%, transparent) !important;
}
[data-renge-card][data-variant="filled"]:hover {
  background: var(--renge-color-bg-muted) !important;
}`;
    document.head.appendChild(s);
  }
}
import type { AnimationName } from '@renge-ui/tokens';

type SpaceKey = '0' | '1' | '2' | '3' | '4' | '5' | '6';
type RadiusKey = 'none' | '1' | '2' | '3' | '4' | '5' | 'full';

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  padding?: SpaceKey;
  radius?: RadiusKey;
  variant?: 'elevated' | 'outlined' | 'filled';
  animation?: AnimationName;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card(
    {
      padding = '4',
      radius = '3',
      variant = 'elevated',
      animation,
      style,
      children,
      ...props
    },
    ref
  ) {
    const variantStyles: Record<string, React.CSSProperties> = {
      elevated: {
        backgroundColor: `var(--renge-color-bg)`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
      },
      outlined: {
        backgroundColor: `var(--renge-color-bg)`,
        border: `1px solid var(--renge-color-border)`,
      },
      filled: {
        backgroundColor: `var(--renge-color-bg-subtle)`,
      },
    };

    return (
      <div
        ref={ref}
        data-renge-card=""
        data-variant={variant}
        style={{
          padding: `var(--renge-space-${padding})`,
          borderRadius: `var(--renge-radius-${radius})`,
          ...variantStyles[variant],
          animation: animation ? `var(--renge-animation-${animation})` : undefined,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);