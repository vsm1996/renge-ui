// packages/react/src/components/Textarea.tsx
//
// Multi-line text input. Min-height follows Fibonacci line counts.
// Inherits all styling conventions from Input.

import { forwardRef, type ComponentPropsWithoutRef, type CSSProperties } from 'react';

export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaState = 'default' | 'error' | 'success';

export interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
  size?: TextareaSize;
  state?: TextareaState;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

// Fibonacci line counts: 3, 5, 8
const sizeStyles: Record<TextareaSize, CSSProperties> = {
  sm: {
    padding: 'var(--renge-space-1) var(--renge-space-2)',
    fontSize: 'var(--renge-font-size-sm)',
    minHeight: '80px',   // ~3 lines at sm
  },
  md: {
    padding: 'var(--renge-space-2) var(--renge-space-3)',
    fontSize: 'var(--renge-font-size-base)',
    minHeight: '120px',  // ~5 lines at md
  },
  lg: {
    padding: 'var(--renge-space-2) var(--renge-space-4)',
    fontSize: 'var(--renge-font-size-base)',
    minHeight: '200px',  // ~8 lines at lg
  },
};

const stateColor: Record<TextareaState, string> = {
  default: 'var(--renge-color-border)',
  error:   'var(--renge-color-danger)',
  success: 'var(--renge-color-success)',
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { size = 'md', state = 'default', fullWidth = false, resize = 'vertical', style, ...props },
    ref
  ) {
    return (
      <textarea
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
          resize,
          transition: `border-color var(--renge-duration-1) var(--renge-easing-ease-out)`,
          boxSizing: 'border-box',
          fontFamily: 'inherit',
          lineHeight: 'var(--renge-line-height-base)',
          ...style,
        }}
        onFocus={(e) => {
          (e.currentTarget as HTMLTextAreaElement).style.outline = `2px solid var(--renge-color-border-focus)`;
          (e.currentTarget as HTMLTextAreaElement).style.outlineOffset = '2px';
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLTextAreaElement).style.outline = 'none';
          props.onBlur?.(e);
        }}
        {...props}
      />
    );
  }
);
