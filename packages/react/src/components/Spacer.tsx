// packages/react/src/components/Spacer.tsx
//
// Explicit whitespace token made visible. All sizes map directly to
// Fibonacci spacing tokens — the visible grammar of the space between things.

import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export type SpacerSize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';

export interface SpacerProps extends ComponentPropsWithoutRef<'div'> {
  size?: SpacerSize;
  /** Axis: vertical (height) or horizontal (width). Default: vertical */
  axis?: 'vertical' | 'horizontal';
}

export const Spacer = forwardRef<HTMLDivElement, SpacerProps>(
  function Spacer({ size = '4', axis = 'vertical', style, ...props }, ref) {
    const token = `var(--renge-space-${size})`;
    return (
      <div
        ref={ref}
        aria-hidden="true"
        style={{
          display: 'block',
          flexShrink: 0,
          width: axis === 'horizontal' ? token : '100%',
          height: axis === 'vertical' ? token : undefined,
          minWidth: axis === 'horizontal' ? token : undefined,
          minHeight: axis === 'vertical' ? token : undefined,
          ...style,
        }}
        {...props}
      />
    );
  }
);
