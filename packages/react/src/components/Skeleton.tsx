// packages/react/src/components/Skeleton.tsx
//
// Loading placeholder. The shimmer sweep uses a linear gradient
// animated at the Fibonacci-derived duration-6 (1300ms).
// Width and height default to phi-proportioned blocks.

import { forwardRef, type ComponentPropsWithoutRef } from 'react';

// Inject shimmer keyframe once
if (typeof document !== 'undefined') {
  const id = '__renge-skeleton-kf__';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
@keyframes rengeSkeletonShimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}`;
    document.head.appendChild(s);
  }
}

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

export interface SkeletonProps extends ComponentPropsWithoutRef<'div'> {
  variant?: SkeletonVariant;
  /** Width — CSS value or number (px) */
  width?: string | number;
  /** Height — CSS value or number (px) */
  height?: string | number;
  /** Lines to render (only for variant="text") */
  lines?: number;
  /** Disable animation */
  animated?: boolean;
}

const LINE_HEIGHTS = [
  'var(--renge-space-3)',  // Fib 3 = 12px
  'var(--renge-space-3)',
  'var(--renge-space-2)',  // Last line shorter — natural paragraph feel
];

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(
    { variant = 'rectangular', width, height, lines = 3, animated = true, style, ...props },
    ref
  ) {
    const shimmerStyle = animated ? {
      backgroundImage: 'linear-gradient(90deg, var(--renge-color-bg-subtle) 25%, var(--renge-color-border-subtle) 50%, var(--renge-color-bg-subtle) 75%)',
      backgroundSize: '200% 100%',
      animation: `rengeSkeletonShimmer var(--renge-duration-6) var(--renge-easing-ease-in-out) infinite`,
    } : {
      background: 'var(--renge-color-bg-subtle)',
    };

    if (variant === 'text') {
      return (
        <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-2)', ...style }} {...props}>
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 'var(--renge-space-3)',
                width: i === lines - 1 ? '61.8%' : '100%', // Last line at φ⁻¹ width
                borderRadius: 'var(--renge-radius-1)',
                ...shimmerStyle,
              }}
            />
          ))}
        </div>
      );
    }

    const isCircular = variant === 'circular';
    const w = typeof width === 'number' ? `${width}px` : width ?? (isCircular ? '52px' : '100%');
    const h = typeof height === 'number' ? `${height}px` : height ?? (isCircular ? '52px' : 'var(--renge-space-5)');

    return (
      <div
        ref={ref}
        style={{
          width: w,
          height: h,
          borderRadius: isCircular ? 'var(--renge-radius-full)' : 'var(--renge-radius-1)',
          ...shimmerStyle,
          ...style,
        }}
        {...props}
      />
    );
  }
);
