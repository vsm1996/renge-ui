import { forwardRef, useState } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export interface MultiSelectProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  options: Array<{ label: string; value: string }>;
  values?: string[];
  onChange?: (values: string[]) => void;
}

export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  ({ options, values = [], onChange, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleValue = (value: string) => {
      const newValues = values.includes(value) ? values.filter((v) => v !== value) : [...values, value];
      onChange?.(newValues);
    };

    return (
      <div ref={ref} style={{ position: 'relative' }} {...props}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            padding: 'var(--renge-space-2) var(--renge-space-3)',
            border: '1px solid var(--renge-color-border)',
            borderRadius: 'var(--renge-radius-2)',
            background: 'var(--renge-color-bg)',
            cursor: 'pointer',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--renge-space-2)',
          }}
        >
          {values.length === 0 ? (
            <span style={{ color: 'var(--renge-color-fg-muted)' }}>Select options...</span>
          ) : (
            values.map((value) => (
              <span
                key={value}
                style={{
                  background: 'var(--renge-color-accent)',
                  color: 'var(--renge-color-bg)',
                  padding: 'var(--renge-space-1) var(--renge-space-2)',
                  borderRadius: 'var(--renge-radius-1)',
                  fontSize: 'var(--renge-font-size-xs)',
                }}
              >
                {options.find((o) => o.value === value)?.label}
              </span>
            ))
          )}
        </div>
        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: 'var(--renge-space-1)',
              background: 'var(--renge-color-bg)',
              border: '1px solid var(--renge-color-border-subtle)',
              borderRadius: 'var(--renge-radius-2)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              zIndex: 50,
            }}
          >
            {options.map((option) => (
              <label
                key={option.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 'var(--renge-space-2) var(--renge-space-3)',
                  cursor: 'pointer',
                  gap: 'var(--renge-space-2)',
                  transition: 'background var(--renge-duration-1)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--renge-color-bg-subtle)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                <input
                  type="checkbox"
                  checked={values.includes(option.value)}
                  onChange={() => toggleValue(option.value)}
                  style={{ cursor: 'pointer' }}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
