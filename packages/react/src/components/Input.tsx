import { forwardRef, type ComponentPropsWithoutRef, type CSSProperties } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputState = 'default' | 'error' | 'success';

export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
  size?: InputSize;
  state?: InputState;
  fullWidth?: boolean;
}

const sizeStyles: Record<InputSize, CSSProperties> = {
  sm: {
    padding: 'var(--renge-space-1) var(--renge-space-2)',
    fontSize: 'var(--renge-font-size-sm)',
  },
  md: {
    padding: 'var(--renge-space-2) var(--renge-space-3)',
    fontSize: 'var(--renge-font-size-base)',
  },
  lg: {
    padding: 'var(--renge-space-2) var(--renge-space-4)',
    fontSize: 'var(--renge-font-size-base)',
  },
};

const stateColor: Record<InputState, string> = {
  default: 'var(--renge-color-border)',
  error: 'var(--renge-color-danger)',
  success: 'var(--renge-color-success)',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ size = 'md', state = 'default', fullWidth = false, style, ...props }, ref) {
    return (
      <input
        ref={ref}
        style={{
          ...sizeStyles[size],
          display: 'block',
          width: fullWidth ? '100%' : undefined,
          background: 'var(--renge-color-bg)',
          color: 'var(--renge-color-fg)',
          border: `1px solid ${stateColor[state]}`,
          borderRadius: 'var(--renge-radius-2)',
          outline: 'none',
          transition: `border-color var(--renge-duration-1) var(--renge-easing-ease-out)`,
          // Focus is handled via :focus-visible pseudo-class but inline styles can't do that.
          // We set a CSS custom property approach via box-shadow as focus ring instead.
          boxSizing: 'border-box',
          fontFamily: 'inherit',
          ...style,
        }}
        onFocus={(e) => {
          (e.currentTarget as HTMLInputElement).style.outline = `2px solid var(--renge-color-border-focus)`;
          (e.currentTarget as HTMLInputElement).style.outlineOffset = '2px';
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLInputElement).style.outline = 'none';
          props.onBlur?.(e);
        }}
        {...props}
      />
    );
  }
);
