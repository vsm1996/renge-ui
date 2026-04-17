// packages/react/src/components/Switch.tsx
//
// Toggle switch. Track width : height ≈ φ:1 (golden proportion visible in
// every instance). The thumb slides with spring easing.

import { forwardRef, useState, type ComponentPropsWithoutRef, type CSSProperties } from 'react';
import { PHI } from '@renge-ui/tokens';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type'> {
  size?: SwitchSize;
  label?: string;
  labelPosition?: 'left' | 'right';
}

// Track dimensions: height is Fibonacci-ish; width = height × φ (golden ratio)
// sm: h=20, w=32  (20×1.618≈32)
// md: h=24, w=40  (24×1.618≈39)
// lg: h=28, w=48  (28×1.618≈45, rounded up)
const TRACK: Record<SwitchSize, { h: number; w: number; thumb: number; padding: number }> = {
  sm: { h: 20, w: 32,  thumb: 14, padding: 3 },
  md: { h: 24, w: 40,  thumb: 18, padding: 3 },
  lg: { h: 28, w: 48,  thumb: 22, padding: 3 },
};

const FONT: Record<SwitchSize, string> = {
  sm: 'var(--renge-font-size-sm)',
  md: 'var(--renge-font-size-base)',
  lg: 'var(--renge-font-size-base)',
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  function Switch(
    {
      size = 'md',
      label,
      labelPosition = 'right',
      checked,
      defaultChecked,
      disabled = false,
      onChange,
      style,
      ...props
    },
    ref
  ) {
    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const { h, w, thumb, padding } = TRACK[size];
    // Thumb travel: from padding to w - thumb - padding
    const thumbOffset = isChecked ? w - thumb - padding : padding;

    const trackStyle: CSSProperties = {
      position: 'relative',
      display: 'inline-block',
      width: w,
      height: h,
      borderRadius: 'var(--renge-radius-full)',
      background: isChecked ? 'var(--renge-color-accent)' : 'var(--renge-color-border)',
      transition: `background var(--renge-duration-2) var(--renge-easing-ease-out)`,
      cursor: disabled ? 'not-allowed' : 'pointer',
      flexShrink: 0,
    };

    const thumbStyle: CSSProperties = {
      position: 'absolute',
      top: padding,
      left: thumbOffset,
      width: thumb,
      height: thumb,
      borderRadius: 'var(--renge-radius-full)',
      background: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      transition: `left var(--renge-duration-2) var(--renge-easing-spring)`,
    };

    const labelEl = label && (
      <span
        style={{
          fontSize: FONT[size],
          color: disabled ? 'var(--renge-color-fg-muted)' : 'var(--renge-color-fg)',
          userSelect: 'none',
          lineHeight: 'var(--renge-line-height-base)',
        }}
      >
        {label}
      </span>
    );

    return (
      <label
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--renge-space-2)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          ...style,
        }}
      >
        {labelPosition === 'left' && labelEl}
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          checked={isControlled ? checked : internalChecked}
          disabled={disabled}
          onChange={(e) => {
            if (!isControlled) setInternalChecked(e.target.checked);
            onChange?.(e);
          }}
          style={{ position: 'absolute', opacity: 0, width: 0, height: 0, margin: 0 }}
          aria-checked={isChecked}
          {...props}
        />
        <span style={trackStyle} aria-hidden="true">
          <span style={thumbStyle} />
        </span>
        {labelPosition === 'right' && labelEl}
      </label>
    );
  }
);
