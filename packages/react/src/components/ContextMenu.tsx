import { forwardRef, useState, useRef, useEffect, type ReactNode } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

if (typeof document !== 'undefined') {
  const id = '__renge-ctxmenu-css__';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
[data-renge-ctx-item] {
  transition: background var(--renge-duration-1) var(--renge-easing-ease-out) !important;
}
[data-renge-ctx-item]:hover {
  background: var(--renge-color-bg-subtle) !important;
}
[data-renge-ctx-item]:focus-visible {
  outline: none !important;
  background: var(--renge-color-bg-subtle) !important;
  box-shadow: inset 0 0 0 2px var(--renge-color-border-focus) !important;
}`;
    document.head.appendChild(s);
  }
}

export interface ContextMenuItem {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface ContextMenuProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  items?: ContextMenuItem[];
  children?: ReactNode;
}

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ items = [], children, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const menuRef = useRef<HTMLDivElement>(null);

    const close = () => setIsOpen(false);

    useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) close();
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [isOpen]);

    // Focus first item when menu opens
    useEffect(() => {
      if (!isOpen || !menuRef.current) return;
      menuRef.current.querySelector<HTMLButtonElement>('[data-renge-ctx-item]:not(:disabled)')?.focus();
    }, [isOpen]);

    return (
      <div
        ref={ref}
        onContextMenu={(e) => {
          e.preventDefault();
          setPosition({ x: e.clientX, y: e.clientY });
          setIsOpen(true);
        }}
        {...props}
      >
        {children}
        {isOpen && (
          <div
            ref={menuRef}
            role="menu"
            onKeyDown={(e) => {
              if (e.key === 'Escape') { e.preventDefault(); close(); return; }
              if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                const btns = Array.from(
                  menuRef.current?.querySelectorAll<HTMLButtonElement>('[data-renge-ctx-item]:not(:disabled)') ?? []
                );
                const idx = btns.indexOf(document.activeElement as HTMLButtonElement);
                const next = e.key === 'ArrowDown'
                  ? (btns[idx + 1] ?? btns[0])
                  : (btns[idx - 1] ?? btns[btns.length - 1]);
                next?.focus();
              }
            }}
            style={{
              position: 'fixed',
              left: `${position.x}px`,
              top: `${position.y}px`,
              background: 'var(--renge-color-bg)',
              border: '1px solid var(--renge-color-border-subtle)',
              borderRadius: 'var(--renge-radius-2)',
              minWidth: '180px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              zIndex: 9999,
              overflow: 'hidden',
            }}
          >
            {items.map((item, idx) => (
              <button
                key={idx}
                type="button"
                role="menuitem"
                data-renge-ctx-item=""
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

ContextMenu.displayName = 'ContextMenu';
