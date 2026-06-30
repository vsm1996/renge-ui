import { forwardRef, useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

if (typeof document !== 'undefined') {
  const id = '__renge-dropdown-css__';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
[data-renge-dropdown-trigger] {
  transition: background var(--renge-duration-1) var(--renge-easing-ease-out) !important;
}
[data-renge-dropdown-trigger]:focus-visible {
  outline: none !important;
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--renge-color-accent) 25%, transparent) !important;
}
[data-renge-dropdown-item] {
  transition: background var(--renge-duration-1) var(--renge-easing-ease-out) !important;
}
[data-renge-dropdown-item]:focus-visible {
  outline: none !important;
  background: var(--renge-color-bg-subtle) !important;
  box-shadow: inset 0 0 0 2px var(--renge-color-border-focus) !important;
}
[data-renge-dropdown-item]:not(:disabled):hover {
  background: var(--renge-color-bg-subtle) !important;
}
[data-renge-dropdown-item]:not(:disabled):active {
  background: var(--renge-color-bg-muted) !important;
}`;
    document.head.appendChild(s);
  }
}

export interface DropdownMenuProps extends ComponentPropsWithoutRef<'div'> {
  trigger?: ReactNode;
  items?: Array<{ label: string; value?: string; onClick?: () => void; disabled?: boolean }>;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ trigger, items = [], isOpen, onOpenChange, ...props }, ref) => {
    const [open, setOpen] = useState(isOpen ?? false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const close = useCallback(() => {
      setOpen(false);
      onOpenChange?.(false);
      triggerRef.current?.focus();
    }, [onOpenChange]);

    useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (
          menuRef.current && !menuRef.current.contains(e.target as Node) &&
          !triggerRef.current?.contains(e.target as Node)
        ) {
          setOpen(false);
          onOpenChange?.(false);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [open, onOpenChange]);

    // Focus first item when menu opens
    useEffect(() => {
      if (!open || !menuRef.current) return;
      const first = menuRef.current.querySelector<HTMLButtonElement>('[data-renge-dropdown-item]:not(:disabled)');
      first?.focus();
    }, [open]);

    return (
      <div ref={ref} style={{ position: 'relative', display: 'inline-block' }} {...props}>
        <button
          ref={triggerRef}
          type="button"
          data-renge-dropdown-trigger=""
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => { const next = !open; setOpen(next); onOpenChange?.(next); }}
          onKeyDown={(e) => {
            if (e.key === 'Escape' && open) { e.preventDefault(); close(); }
            if ((e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') && !open) {
              e.preventDefault();
              setOpen(true);
              onOpenChange?.(true);
            }
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
            ref={menuRef}
            role="menu"
            onKeyDown={(e) => {
              if (e.key === 'Escape') { e.preventDefault(); close(); return; }
              if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                const btns = Array.from(
                  menuRef.current?.querySelectorAll<HTMLButtonElement>('[data-renge-dropdown-item]:not(:disabled)') ?? []
                );
                const idx = btns.indexOf(document.activeElement as HTMLButtonElement);
                const next = e.key === 'ArrowDown'
                  ? (btns[idx + 1] ?? btns[0])
                  : (btns[idx - 1] ?? btns[btns.length - 1]);
                next?.focus();
              }
              if (e.key === 'Home') {
                e.preventDefault();
                menuRef.current?.querySelectorAll<HTMLButtonElement>('[data-renge-dropdown-item]:not(:disabled)')[0]?.focus();
              }
              if (e.key === 'End') {
                e.preventDefault();
                const all = menuRef.current?.querySelectorAll<HTMLButtonElement>('[data-renge-dropdown-item]:not(:disabled)');
                all?.[all.length - 1]?.focus();
              }
            }}
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
            {items.map((item, idx) => (
              <button
                key={idx}
                type="button"
                role="menuitem"
                data-renge-dropdown-item=""
                disabled={item.disabled}
                onClick={() => { item.onClick?.(); close(); }}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: 'var(--renge-space-2) var(--renge-space-3)',
                  border: 'none',
                  background: 'transparent',
                  color: item.disabled ? 'var(--renge-color-fg-muted)' : 'var(--renge-color-fg)',
                  cursor: item.disabled ? 'not-allowed' : 'pointer',
                  fontSize: 'var(--renge-font-size-sm)',
                  fontFamily: 'inherit',
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
