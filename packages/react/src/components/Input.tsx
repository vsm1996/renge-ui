import { forwardRef, type ComponentPropsWithoutRef, type CSSProperties } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputState = 'default' | 'error' | 'success';

export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
  size?: InputSize;
  state?: InputState;
  fullWidth?: boolean;
}

if (typeof document !== 'undefined') {
  const id = '__renge-input-css__';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
[data-renge-input] {
  transition: border-color var(--renge-duration-1) var(--renge-easing-ease-out),
              box-shadow var(--renge-duration-2) var(--renge-easing-ease-out) !important;
}
[data-renge-input]:hover:not(:focus):not(:disabled) {
  border-color: color-mix(in oklch, var(--renge-color-border) 60%, var(--renge-color-fg)) !important;
}
[data-renge-input]:focus {
  border-color: var(--renge-color-border-focus) !important;
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--renge-color-accent) 16%, transparent) !important;
  outline: none !important;
}
[data-renge-input]:disabled { opacity: 0.5; cursor: not-allowed; }`;
    document.head.appendChild(s);
  }
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
        data-renge-input=""
        style={{
          ...sizeStyles[size],
          display: 'block',
          width: fullWidth ? '100%' : undefined,
          background: 'var(--renge-color-bg)',
          color: 'var(--renge-color-fg)',
          border: `1px solid ${stateColor[state]}`,
          borderRadius: 'var(--renge-radius-2)',
          outline: 'none',
          boxSizing: 'border-box',
          fontFamily: 'inherit',
          ...style,
        }}
        {...props}
      />
    );
  }
);
