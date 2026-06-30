import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

if (typeof document !== 'undefined') {
  const id = '__renge-numberinput-css__';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
[data-renge-numberinput-btn] {
  transition: background var(--renge-duration-1) var(--renge-easing-ease-out) !important;
}
[data-renge-numberinput-btn]:not(:disabled):hover {
  background: var(--renge-color-bg-subtle) !important;
}
[data-renge-numberinput-btn]:not(:disabled):active {
  background: var(--renge-color-bg-muted) !important;
}
[data-renge-numberinput-btn]:focus-visible {
  outline: none !important;
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--renge-color-accent) 25%, transparent) inset !important;
}`;
    document.head.appendChild(s);
  }
}

export interface NumberInputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'onChange'> {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ value, onChange, min, max, step = 1, ...props }, ref) => {
    const handleIncrement = () => {
      const newValue = (value ?? 0) + step;
      if (max === undefined || newValue <= max) {
        onChange?.(newValue);
      }
    };

    const handleDecrement = () => {
      const newValue = (value ?? 0) - step;
      if (min === undefined || newValue >= min) {
        onChange?.(newValue);
      }
    };

    return (
      <div style={{ display: 'inline-flex', alignItems: 'stretch', borderRadius: 'var(--renge-radius-2)', border: '1px solid var(--renge-color-border)' }}>
        <button
          type="button"
          data-renge-numberinput-btn=""
          aria-label="Decrease"
          onClick={handleDecrement}
          disabled={min !== undefined && (value ?? 0) <= min}
          style={{
            padding: 'var(--renge-space-2)',
            background: 'var(--renge-color-bg)',
            border: 'none',
            borderRadius: 'var(--renge-radius-2) 0 0 var(--renge-radius-2)',
            color: 'var(--renge-color-fg)',
            cursor: 'pointer',
            fontSize: 'var(--renge-font-size-sm)',
            flexShrink: 0,
          }}
        >
          −
        </button>
        <input
          ref={ref}
          type="number"
          value={value ?? ''}
          onChange={(e) => onChange?.(e.currentTarget.valueAsNumber)}
          min={min}
          max={max}
          step={step}
          style={{
            flex: 1,
            minWidth: '80px',
            padding: 'var(--renge-space-2) var(--renge-space-3)',
            border: 'none',
            backgroundColor: 'var(--renge-color-bg)',
            color: 'var(--renge-color-fg)',
            fontSize: 'var(--renge-font-size-base)',
            textAlign: 'center',
          }}
          {...props}
        />
        <button
          type="button"
          data-renge-numberinput-btn=""
          aria-label="Increase"
          onClick={handleIncrement}
          disabled={max !== undefined && (value ?? 0) >= max}
          style={{
            padding: 'var(--renge-space-2)',
            background: 'var(--renge-color-bg)',
            border: 'none',
            borderRadius: '0 var(--renge-radius-2) var(--renge-radius-2) 0',
            color: 'var(--renge-color-fg)',
            cursor: 'pointer',
            fontSize: 'var(--renge-font-size-sm)',
            flexShrink: 0,
          }}
        >
          +
        </button>
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';
