import { forwardRef, type ComponentPropsWithoutRef, type CSSProperties } from 'react';

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
