import { forwardRef, useState, useRef, useEffect, ReactNode } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export interface HoverCardProps extends Omit<ComponentPropsWithoutRef<'div'>, 'content'> {
  trigger?: ReactNode;
  content?: ReactNode;
}

export const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(
  ({ trigger, content, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      const handleMouseEnter = () => setIsOpen(true);
      const handleMouseLeave = () => setIsOpen(false);

      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, []);

    return (
      <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }} {...props}>
        {trigger}
        {isOpen && (
          <div
            ref={ref}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: 'var(--renge-space-2)',
              background: 'var(--renge-color-bg)',
              border: '1px solid var(--renge-color-border-subtle)',
              borderRadius: 'var(--renge-radius-2)',
              padding: 'var(--renge-space-3)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              zIndex: 50,
              minWidth: '200px',
              pointerEvents: 'none',
            }}
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);

HoverCard.displayName = 'HoverCard';
