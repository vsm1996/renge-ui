// packages/react/src/components/Checkbox.tsx
//
// Custom-styled checkbox. The box dimensions and check geometry are
// derived from Fibonacci spacing. The check itself is an SVG path
// that appears with a spring-timed stroke animation.

import { forwardRef, useState, type ComponentPropsWithoutRef, type CSSProperties } from 'react';

// Inject the check-draw keyframe once
if (typeof document !== 'undefined') {
  const id = '__renge-checkbox-kf__';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
@keyframes rengeCheckDraw {
  from { stroke-dashoffset: 14; }
  to   { stroke-dashoffset: 0; }
}`;
    document.head.appendChild(s);
  }
}

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type'> {
  size?: CheckboxSize;
  label?: string;
  indeterminate?: boolean;
}

// Fibonacci sizes: 16 (4×Fib1), 20 (4×Fib2+4), 24 (approx Fib5)
const SIZE_PX: Record<CheckboxSize, number> = { sm: 16, md: 20, lg: 24 };
const FONT: Record<CheckboxSize, string> = {
  sm: 'var(--renge-font-size-sm)',
  md: 'var(--renge-font-size-base)',
  lg: 'var(--renge-font-size-base)',
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { size = 'md', label, indeterminate = false, style, onChange, checked, defaultChecked, disabled, ...props },
    ref
  ) {
    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const px = SIZE_PX[size];
    const r = px / 2;

    const boxStyle: CSSProperties = {
      width: px,
      height: px,
      minWidth: px,
      borderRadius: 'var(--renge-radius-1)',
      border: isChecked || indeterminate
        ? '2px solid var(--renge-color-accent)'
        : '2px solid var(--renge-color-border)',
      background: isChecked || indeterminate
        ? 'var(--renge-color-accent)'
        : 'var(--renge-color-bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: `all var(--renge-duration-2) var(--renge-easing-spring)`,
      flexShrink: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
    };

    return (
      <label
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--renge-space-2)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          ...style,
        }}
      >
        {/* Hidden native input for accessibility */}
        <input
          ref={ref}
          type="checkbox"
          checked={isControlled ? checked : internalChecked}
          disabled={disabled}
          onChange={(e) => {
            if (!isControlled) setInternalChecked(e.target.checked);
            onChange?.(e);
          }}
          style={{ position: 'absolute', opacity: 0, width: 0, height: 0, margin: 0 }}
          {...props}
        />
        {/* Visual indicator */}
        <span style={boxStyle} aria-hidden="true">
          {isChecked && !indeterminate && (
            <svg
              width={px * 0.618}
              height={px * 0.618}
              viewBox="0 0 10 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4l2.5 2.5L9 1"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="14"
                strokeDashoffset="0"
                style={{
                  animation: `rengeCheckDraw var(--renge-duration-2) var(--renge-easing-spring) forwards`,
                }}
              />
            </svg>
          )}
          {indeterminate && (
            <svg width={px * 0.5} height={2} viewBox="0 0 8 2">
              <line x1="0" y1="1" x2="8" y2="1" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </span>
        {label && (
          <span
            style={{
              fontSize: FONT[size],
              color: disabled ? 'var(--renge-color-fg-muted)' : 'var(--renge-color-fg)',
              lineHeight: 'var(--renge-line-height-base)',
              userSelect: 'none',
            }}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);
