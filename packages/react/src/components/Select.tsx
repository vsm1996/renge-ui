// packages/react/src/components/Select.tsx
//
// A styled <select> element that follows Renge's Fibonacci spacing and token system.
// The chevron is rendered via a background SVG — no extra DOM node needed.

import { forwardRef, type ComponentPropsWithoutRef, type CSSProperties } from 'react';

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectState = 'default' | 'error' | 'success';

export interface SelectProps extends Omit<ComponentPropsWithoutRef<'select'>, 'size'> {
  size?: SelectSize;
  state?: SelectState;
  fullWidth?: boolean;
  placeholder?: string;
}

const sizeStyles: Record<SelectSize, CSSProperties> = {
  sm: {
    padding: 'var(--renge-space-1) var(--renge-space-5) var(--renge-space-1) var(--renge-space-2)',
    fontSize: 'var(--renge-font-size-sm)',
  },
  md: {
    padding: 'var(--renge-space-2) var(--renge-space-5) var(--renge-space-2) var(--renge-space-3)',
    fontSize: 'var(--renge-font-size-base)',
  },
  lg: {
    padding: 'var(--renge-space-2) var(--renge-space-6) var(--renge-space-2) var(--renge-space-4)',
    fontSize: 'var(--renge-font-size-base)',
  },
};

const stateColor: Record<SelectState, string> = {
  default: 'var(--renge-color-border)',
  error:   'var(--renge-color-danger)',
  success: 'var(--renge-color-success)',
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    { size = 'md', state = 'default', fullWidth = false, placeholder, style, children, ...props },
    ref
  ) {
    // Chevron SVG as data URI — color matches fg-subtle
    const chevronSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' fill='none' stroke='%23888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`;

    return (
      <select
        ref={ref}
        style={{
          ...sizeStyles[size],
          display: 'block',
          width: fullWidth ? '100%' : undefined,
          background: `${chevronSvg} no-repeat right var(--renge-space-2) center, var(--renge-color-bg)`,
          color: 'var(--renge-color-fg)',
          border: `1px solid ${stateColor[state]}`,
          borderRadius: 'var(--renge-radius-2)',
          outline: 'none',
          appearance: 'none',
          WebkitAppearance: 'none',
          cursor: 'pointer',
          transition: `border-color var(--renge-duration-1) var(--renge-easing-ease-out)`,
          boxSizing: 'border-box',
          fontFamily: 'inherit',
          ...style,
        }}
        onFocus={(e) => {
          (e.currentTarget as HTMLSelectElement).style.outline = `2px solid var(--renge-color-border-focus)`;
          (e.currentTarget as HTMLSelectElement).style.outlineOffset = '2px';
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLSelectElement).style.outline = 'none';
          props.onBlur?.(e);
        }}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    );
  }
);
