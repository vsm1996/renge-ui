import { forwardRef, useState, useRef, useEffect, ReactNode } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export interface PopoverProps extends Omit<ComponentPropsWithoutRef<'div'>, 'content'> {
  trigger?: ReactNode;
  content?: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  ({ trigger, content, isOpen, onOpenChange, side = 'bottom', ...props }, ref) => {
    const [open, setOpen] = useState(isOpen ?? false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(e.target as Node) &&
          !triggerRef.current?.contains(e.target as Node)
        ) {
          setOpen(false);
          onOpenChange?.(false);
        }
      };
      if (open) document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, onOpenChange]);

    return (
      <div ref={ref} style={{ position: 'relative', display: 'inline-block' }} {...props}>
        <div
          ref={triggerRef}
          onClick={() => {
            setOpen(!open);
            onOpenChange?.(!open);
          }}
          style={{ cursor: 'pointer' }}
        >
          {trigger}
        </div>
        {open && (
          <div
            ref={contentRef}
            style={{
              position: 'absolute',
              [side === 'top' ? 'bottom' : side === 'bottom' ? 'top' : 'left']: side === 'top' || side === 'bottom' ? '100%' : 'auto',
              [side === 'left' ? 'right' : side === 'right' ? 'left' : 'top']: side === 'left' || side === 'right' ? '100%' : 'auto',
              marginTop: side === 'bottom' ? 'var(--renge-space-2)' : undefined,
              marginBottom: side === 'top' ? 'var(--renge-space-2)' : undefined,
              marginLeft: side === 'right' ? 'var(--renge-space-2)' : undefined,
              marginRight: side === 'left' ? 'var(--renge-space-2)' : undefined,
              background: 'var(--renge-color-bg)',
              border: '1px solid var(--renge-color-border-subtle)',
              borderRadius: 'var(--renge-radius-3)',
              padding: 'var(--renge-space-4)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
              zIndex: 50,
              minWidth: '200px',
            }}
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);

Popover.displayName = 'Popover';
