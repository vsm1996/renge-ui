// packages/react/src/components/Container.tsx
//
// Centered max-width wrapper. Sizes follow Fibonacci-proportioned breakpoints.
// Horizontal padding defaults to space-4 (20px = 5×Fib) — breathable but not wide.

import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  size?: ContainerSize;
  /** Horizontal padding applied as px — overrides default */
  px?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
}

// PHI-derived max widths — 200px × φⁿ — consumed from layout tokens CSS vars
const MAX_WIDTH: Record<ContainerSize, string> = {
  sm:   'var(--renge-container-sm)',   // 524px  (200 × φ²)
  md:   'var(--renge-container-md)',   // 847px  (200 × φ³)
  lg:   'var(--renge-container-lg)',   // 1371px (200 × φ⁴)
  xl:   'var(--renge-container-xl)',   // 2218px (200 × φ⁵)
  full: 'var(--renge-container-full)', // 100%
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container({ size = 'lg', px = '5', style, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        style={{
          width: '100%',
          maxWidth: MAX_WIDTH[size],
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: `var(--renge-space-${px})`,
          paddingRight: `var(--renge-space-${px})`,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
