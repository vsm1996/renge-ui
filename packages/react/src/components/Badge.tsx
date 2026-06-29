import { forwardRef, type ComponentPropsWithoutRef, type CSSProperties } from 'react';

if (typeof document !== 'undefined') {
  const id = '__renge-badge-css__';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
[data-renge-badge] {
  transition: transform var(--renge-duration-1) var(--renge-easing-spring),
              box-shadow var(--renge-duration-1) var(--renge-easing-ease-out) !important;
}
[data-renge-badge]:hover {
  transform: scale(1.05) !important;
  box-shadow: 0 1px var(--renge-space-2) color-mix(in oklch, currentColor 18%, transparent) !important;
}`;
    document.head.appendChild(s);
  }
}

export type BadgeVariant = 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const colorVars = (variant: BadgeVariant) => {
  if (variant === 'neutral') {
    return {
      background: 'var(--renge-color-bg-subtle)',
      color: 'var(--renge-color-fg-muted)',
      borderColor: 'var(--renge-color-border-subtle)',
    };
  }
  return {
    background: `var(--renge-color-${variant}-subtle)`,
    color: `var(--renge-color-${variant})`,
    borderColor: `var(--renge-color-${variant})`,
  };
};

const sizeStyles: Record<BadgeSize, CSSProperties> = {
  sm: { padding: 'var(--renge-space-1) var(--renge-space-2)', fontSize: 'var(--renge-font-size-xs)' },
  md: { padding: 'var(--renge-space-1) var(--renge-space-3)', fontSize: 'var(--renge-font-size-xs)' },
  lg: { padding: 'var(--renge-space-2) var(--renge-space-3)', fontSize: 'var(--renge-font-size-sm)' },
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge({ variant = 'neutral', size = 'md', style, children, ...props }, ref) {
    const { background, color, borderColor } = colorVars(variant);
    return (
      <span
        ref={ref}
        data-renge-badge=""
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          lineHeight: 1,
          fontWeight: 500,
          borderRadius: 'var(--renge-radius-full)',
          border: `1px solid ${borderColor}`,
          background,
          color,
          ...sizeStyles[size],
          ...style,
        }}
        {...props}
      >
        {children}
      </span>
    );
  }
);
