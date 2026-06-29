import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export interface RatingProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  readonly?: boolean;
}

if (typeof document !== 'undefined') {
  const id = '__renge-rating-css__';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
[data-renge-rating] button {
  transition: transform var(--renge-duration-1) var(--renge-easing-spring),
              color var(--renge-duration-1) var(--renge-easing-ease-out) !important;
}
[data-renge-rating] button:not(:disabled):hover {
  transform: scale(1.25) !important;
  color: var(--renge-color-accent) !important;
}
[data-renge-rating] button:not(:disabled):active {
  transform: scale(1.1) !important;
}`;
    document.head.appendChild(s);
  }
}

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  ({ value = 0, onChange, max = 5, readonly = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-renge-rating=""
        style={{ display: 'inline-flex', gap: 'var(--renge-space-2)' }}
        {...props}
      >
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
              color: idx < value ? 'var(--renge-color-accent)' : 'var(--renge-color-border)',
              padding: 0,
            }}
          >
            ★
          </button>
        ))}
      </div>
    );
  }
);

Rating.displayName = 'Rating';
