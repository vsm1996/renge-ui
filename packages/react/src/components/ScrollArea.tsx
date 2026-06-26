import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export interface ScrollAreaProps extends ComponentPropsWithoutRef<'div'> {
  children?: React.ReactNode;
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          overflow: 'auto',
          scrollBehavior: 'smooth',
        }}
        {...props}
      >
        <style>{`
          div[data-scroll-area]::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          div[data-scroll-area]::-webkit-scrollbar-track {
            background: var(--renge-color-bg-subtle);
            borderRadius: var(--renge-radius-1);
          }
          div[data-scroll-area]::-webkit-scrollbar-thumb {
            background: var(--renge-color-border-subtle);
            borderRadius: var(--renge-radius-1);
          }
          div[data-scroll-area]::-webkit-scrollbar-thumb:hover {
            background: var(--renge-color-border);
          }
        `}</style>
        <div data-scroll-area>{children}</div>
      </div>
    );
  }
);

ScrollArea.displayName = 'ScrollArea';
