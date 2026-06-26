import { forwardRef, useState, useRef, useEffect, ReactNode } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export interface DropdownMenuProps extends ComponentPropsWithoutRef<'div'> {
  trigger?: ReactNode;
  items?: Array<{ label: string; value?: string; onClick?: () => void }>;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ trigger, items, isOpen, onOpenChange, ...props }, ref) => {
    const [open, setOpen] = useState(isOpen ?? false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(e.target as Node) &&
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
            ref={menuRef}
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: 'var(--renge-space-2)',
              background: 'var(--renge-color-bg)',
              border: '1px solid var(--renge-color-border-subtle)',
              borderRadius: 'var(--renge-radius-2)',
              minWidth: '180px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              zIndex: 50,
              overflow: 'hidden',
            }}
          >
            {items?.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  item.onClick?.();
                  setOpen(false);
                  onOpenChange?.(false);
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: 'var(--renge-space-2) var(--renge-space-3)',
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--renge-color-fg)',
                  cursor: 'pointer',
                  transition: 'background var(--renge-duration-1)',
                  fontSize: 'var(--renge-font-size-sm)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--renge-color-bg-subtle)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

DropdownMenu.displayName = 'DropdownMenu';
