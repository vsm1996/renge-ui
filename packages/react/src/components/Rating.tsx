import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export interface RatingProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  readonly?: boolean;
}

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  ({ value = 0, onChange, max = 5, readonly = false, ...props }, ref) => {
    return (
      <div ref={ref} style={{ display: 'inline-flex', gap: 'var(--renge-space-2)' }} {...props}>
        {Array.from({ length: max }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => !readonly && onChange?.(idx + 1)}
            disabled={readonly}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: readonly ? 'default' : 'pointer',
              fontSize: 'var(--renge-font-size-2xl)',
            }}
          >
            {idx < value ? '★' : '☆'}
          </button>
        ))}
      </div>
    );
  }
);

Rating.displayName = 'Rating';
