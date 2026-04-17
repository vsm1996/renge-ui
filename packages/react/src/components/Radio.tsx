// packages/react/src/components/Radio.tsx
//
// Radio button + RadioGroup. The inner dot is sized at 1/φ of the outer
// circle diameter — visible golden proportion in every interaction.

import {
  forwardRef,
  useState,
  createContext,
  useContext,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { PHI } from '@renge-ui/tokens';

// ─── Context ─────────────────────────────────────────────────────────────────

interface RadioGroupCtx {
  value: string;
  onChange: (v: string) => void;
  name: string;
  size: RadioSize;
  disabled: boolean;
}

const RadioGroupContext = createContext<RadioGroupCtx | null>(null);

// ─── Types ───────────────────────────────────────────────────────────────────

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name: string;
  size?: RadioSize;
  disabled?: boolean;
  gap?: '1' | '2' | '3' | '4' | '5';
  direction?: 'vertical' | 'horizontal';
  style?: CSSProperties;
  children: ReactNode;
}

export interface RadioProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type'> {
  value: string;
  label?: string;
  size?: RadioSize;
}

// Fibonacci: 16 → 20 → 24
const OUTER_PX: Record<RadioSize, number> = { sm: 16, md: 20, lg: 24 };
const FONT: Record<RadioSize, string> = {
  sm: 'var(--renge-font-size-sm)',
  md: 'var(--renge-font-size-base)',
  lg: 'var(--renge-font-size-base)',
};

// ─── RadioGroup ───────────────────────────────────────────────────────────────

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(
    {
      value,
      defaultValue = '',
      onChange,
      name,
      size = 'md',
      disabled = false,
      gap = '3',
      direction = 'vertical',
      style,
      children,
    },
    ref
  ) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = value !== undefined;
    const current = isControlled ? value! : internalValue;

    const handleChange = (v: string) => {
      if (!isControlled) setInternalValue(v);
      onChange?.(v);
    };

    return (
      <RadioGroupContext.Provider value={{ value: current, onChange: handleChange, name, size, disabled }}>
        <div
          ref={ref}
          role="radiogroup"
          style={{
            display: 'flex',
            flexDirection: direction === 'vertical' ? 'column' : 'row',
            flexWrap: direction === 'horizontal' ? 'wrap' : undefined,
            gap: `var(--renge-space-${gap})`,
            ...style,
          }}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

// ─── Radio ────────────────────────────────────────────────────────────────────

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  function Radio({ value, label, size: sizeProp, disabled: disabledProp, style, onChange, ...props }, ref) {
    const ctx = useContext(RadioGroupContext);
    const size = sizeProp ?? ctx?.size ?? 'md';
    const disabled = disabledProp ?? ctx?.disabled ?? false;
    const isChecked = ctx ? ctx.value === value : false;

    const outer = OUTER_PX[size];
    // Inner dot = outer / φ (golden proportion)
    const inner = Math.round(outer / PHI);

    const handleChange = () => {
      if (disabled) return;
      ctx?.onChange(value);
    };

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
        <input
          ref={ref}
          type="radio"
          value={value}
          name={ctx?.name}
          checked={isChecked}
          disabled={disabled}
          onChange={(e) => {
            handleChange();
            onChange?.(e);
          }}
          style={{ position: 'absolute', opacity: 0, width: 0, height: 0, margin: 0 }}
          {...props}
        />
        {/* Visible circle */}
        <span
          aria-hidden="true"
          style={{
            width: outer,
            height: outer,
            minWidth: outer,
            borderRadius: 'var(--renge-radius-full)',
            border: isChecked
              ? '2px solid var(--renge-color-accent)'
              : '2px solid var(--renge-color-border)',
            background: 'var(--renge-color-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: `all var(--renge-duration-2) var(--renge-easing-spring)`,
            flexShrink: 0,
          }}
        >
          {/* Inner dot — appears at 1/φ size of outer */}
          <span
            style={{
              width: isChecked ? inner : 0,
              height: isChecked ? inner : 0,
              borderRadius: 'var(--renge-radius-full)',
              background: 'var(--renge-color-accent)',
              transition: `all var(--renge-duration-2) var(--renge-easing-spring)`,
            }}
          />
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
