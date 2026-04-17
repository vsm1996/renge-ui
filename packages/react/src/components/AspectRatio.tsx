// packages/react/src/components/AspectRatio.tsx
//
// Aspect ratio container. Default ratio = φ (1.618...) — the golden ratio.
// Pass ratio={16/9} for video, ratio={1} for square, or ratio={PHI} (default).
// Uses the padding-bottom technique for universal browser support.

import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { PHI } from '@renge-ui/tokens';

export interface AspectRatioProps extends ComponentPropsWithoutRef<'div'> {
  /** Width/height ratio. Default: PHI (1.618…) */
  ratio?: number;
}

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  function AspectRatio({ ratio = PHI, style, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: `${(1 / ratio) * 100}%`,
          ...style,
        }}
        {...props}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);
