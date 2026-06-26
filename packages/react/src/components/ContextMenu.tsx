import { forwardRef, useState, useRef, useEffect, ReactNode } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export interface ContextMenuItem {
  label: string;
  onClick?: () => void;
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

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      if (isOpen) document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
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
            style={{
              position: 'fixed',
              left: `${position.x}px`,
              top: `${position.y}px`,
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
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
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
                  fontSize: 'var(--renge-font-size-sm)',
                  transition: 'background var(--renge-duration-1)',
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

ContextMenu.displayName = 'ContextMenu';
