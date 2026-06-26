import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

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
          onClick={handleDecrement}
          style={{
            padding: 'var(--renge-space-2)',
            background: 'var(--renge-color-bg)',
            border: 'none',
            color: 'var(--renge-color-fg)',
            cursor: 'pointer',
            transition: 'background var(--renge-duration-1)',
            fontSize: 'var(--renge-font-size-sm)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'var(--renge-color-bg-subtle)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'var(--renge-color-bg)';
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
          onClick={handleIncrement}
          style={{
            padding: 'var(--renge-space-2)',
            background: 'var(--renge-color-bg)',
            border: 'none',
            color: 'var(--renge-color-fg)',
            cursor: 'pointer',
            transition: 'background var(--renge-duration-1)',
            fontSize: 'var(--renge-font-size-sm)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'var(--renge-color-bg-subtle)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'var(--renge-color-bg)';
          }}
        >
          +
        </button>
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';
