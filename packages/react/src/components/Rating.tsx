import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export interface RatingProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  readonly?: boolean;
  label?: string;
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
}
[data-renge-rating] button:focus-visible {
  outline: none !important;
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--renge-color-accent) 28%, transparent) !important;
  border-radius: var(--renge-radius-1) !important;
}`;
    document.head.appendChild(s);
  }
}

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  ({ value = 0, onChange, max = 5, readonly = false, label = 'Rating', ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (readonly) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        onChange?.(Math.min((value ?? 0) + 1, max));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        onChange?.(Math.max((value ?? 0) - 1, 0));
      } else if (e.key === 'Home') {
        e.preventDefault();
        onChange?.(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        onChange?.(max);
      }
    };

    return (
      <div
        ref={ref}
        data-renge-rating=""
        role="radiogroup"
        aria-label={label}
        onKeyDown={handleKeyDown}
        style={{ display: 'inline-flex', gap: 'var(--renge-space-2)' }}
        {...props}
      >
        {Array.from({ length: max }).map((_, idx) => {
          const starValue = idx + 1;
          const isSelected = starValue === value;
          return (
            <button
              key={idx}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`${starValue} star${starValue !== 1 ? 's' : ''}`}
              onClick={() => !readonly && onChange?.(starValue)}
              disabled={readonly}
              tabIndex={isSelected || (value === 0 && idx === 0) ? 0 : -1}
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
          );
        })}
      </div>
    );
  }
);

Rating.displayName = 'Rating';
