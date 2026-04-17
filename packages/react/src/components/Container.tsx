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

// Fibonacci-derived max widths (roughly: 512, 768, 1024, 1440, unrestricted)
const MAX_WIDTH: Record<ContainerSize, string> = {
  sm:   '520px',
  md:   '768px',
  lg:   '1024px',
  xl:   '1440px',
  full: '100%',
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
