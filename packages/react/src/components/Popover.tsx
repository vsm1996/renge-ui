import { forwardRef, useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

if (typeof document !== 'undefined') {
  const id = '__renge-popover-css__';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
[data-renge-popover-trigger]:focus-visible {
  outline: none !important;
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--renge-color-accent) 25%, transparent) !important;
}`;
    document.head.appendChild(s);
  }
}

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
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const close = useCallback(() => {
      setOpen(false);
      onOpenChange?.(false);
      triggerRef.current?.focus();
    }, [onOpenChange]);

    useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (
          contentRef.current && !contentRef.current.contains(e.target as Node) &&
          !triggerRef.current?.contains(e.target as Node)
        ) {
          setOpen(false);
          onOpenChange?.(false);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [open, onOpenChange]);

    useEffect(() => {
      if (!open) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') { e.preventDefault(); close(); }
      };
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }, [open, close]);

    const positionStyle: React.CSSProperties = {
      position: 'absolute',
      ...(side === 'top'    && { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 'var(--renge-space-2)' }),
      ...(side === 'bottom' && { top: '100%',    left: '50%', transform: 'translateX(-50%)', marginTop: 'var(--renge-space-2)' }),
      ...(side === 'right'  && { left: '100%',   top: '50%',  transform: 'translateY(-50%)', marginLeft: 'var(--renge-space-2)' }),
      ...(side === 'left'   && { right: '100%',  top: '50%',  transform: 'translateY(-50%)', marginRight: 'var(--renge-space-2)' }),
    };

    return (
      <div ref={ref} style={{ position: 'relative', display: 'inline-block' }} {...props}>
        <button
          ref={triggerRef}
          type="button"
          data-renge-popover-trigger=""
          aria-expanded={open}
          aria-haspopup="dialog"
          onClick={() => { const next = !open; setOpen(next); onOpenChange?.(next); }}
          onKeyDown={(e) => {
            if (e.key === 'Escape' && open) { e.preventDefault(); close(); }
          }}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            color: 'inherit',
            font: 'inherit',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            borderRadius: 'var(--renge-radius-1)',
          }}
        >
          {trigger}
        </button>

        {open && (
          <div
            ref={contentRef}
            role="dialog"
            aria-modal="false"
            style={{
              ...positionStyle,
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
