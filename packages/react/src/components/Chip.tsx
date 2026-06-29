import { forwardRef, type ComponentPropsWithoutRef } from 'react';

if (typeof document !== 'undefined') {
  const id = '__renge-chip-css__';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
[data-renge-chip] {
  transition: transform var(--renge-duration-1) var(--renge-easing-spring),
              box-shadow var(--renge-duration-1) var(--renge-easing-ease-out) !important;
}
[data-renge-chip]:hover {
  transform: scale(1.03) !important;
  box-shadow: 0 1px var(--renge-space-2) color-mix(in oklch, currentColor 14%, transparent) !important;
}
[data-renge-chip] button {
  transition: opacity var(--renge-duration-1) var(--renge-easing-ease-out),
              transform var(--renge-duration-1) var(--renge-easing-spring) !important;
}
[data-renge-chip] button:hover {
  opacity: 1 !important;
  transform: scale(1.2) !important;
}`;
    document.head.appendChild(s);
  }
}

export type ChipVariant = 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export interface ChipProps extends ComponentPropsWithoutRef<'span'> {
  variant?: ChipVariant;
  onDismiss?: () => void;
}

const colorVars = (variant: ChipVariant) => {
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

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  function Chip({ variant = 'neutral', onDismiss, style, children, ...props }, ref) {
    const { background, color, borderColor } = colorVars(variant);
    return (
      <span
        ref={ref}
        data-renge-chip=""
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--renge-space-2)',
          padding: 'var(--renge-space-2) var(--renge-space-3)',
          fontSize: 'var(--renge-font-size-sm)',
          fontWeight: 500,
          lineHeight: 1,
          borderRadius: 'var(--renge-radius-full)',
          border: `1px solid ${borderColor}`,
          background,
          color,
          ...style,
        }}
        {...props}
      >
        {children}
        {onDismiss && (
          <button
            onClick={onDismiss}
            aria-label="Dismiss"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: 'inherit',
              fontSize: 'var(--renge-font-size-sm)',
              lineHeight: 1,
              opacity: 0.7,
            }}
          >
            ×
          </button>
        )}
      </span>
    );
  }
);
