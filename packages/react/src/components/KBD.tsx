import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export interface KBDProps extends ComponentPropsWithoutRef<'kbd'> {
  keys?: string[];
}

export const KBD = forwardRef<HTMLElement, KBDProps>(
  ({ keys = [], children, ...props }, ref) => {
    const keyList = typeof children === 'string' ? children.split('+') : keys;

    return (
      <kbd
        ref={ref}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          fontFamily: 'monospace',
        }}
        {...props}
      >
        {keyList.map((key, idx) => (
          <span key={idx}>
            {idx > 0 && <span style={{ margin: '0 4px' }}>+</span>}
            <span
              style={{
                display: 'inline-block',
                minWidth: '24px',
                height: '24px',
                lineHeight: '24px',
                textAlign: 'center',
                background: 'var(--renge-color-bg-subtle)',
                border: '1px solid var(--renge-color-border)',
                borderRadius: 'var(--renge-radius-1)',
                padding: '0 var(--renge-space-1)',
                fontSize: 'var(--renge-font-size-xs)',
                fontWeight: 600,
              }}
            >
              {key.trim()}
            </span>
          </span>
        ))}
      </kbd>
    );
  }
);

KBD.displayName = 'KBD';
