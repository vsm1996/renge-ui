import { forwardRef, useState, useMemo, useEffect } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  onSelect?: () => void;
  category?: string;
}

export interface CommandPaletteProps extends ComponentPropsWithoutRef<'div'> {
  items?: CommandItem[];
  isOpen?: boolean;
  onClose?: () => void;
  placeholder?: string;
}

export const CommandPalette = forwardRef<HTMLDivElement, CommandPaletteProps>(
  ({ items = [], isOpen, onClose, placeholder = 'Type a command...', ...props }, ref) => {
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const filtered = useMemo(
      () =>
        items.filter((item) =>
          item.label.toLowerCase().includes(search.toLowerCase()) ||
          item.description?.toLowerCase().includes(search.toLowerCase())
        ),
      [items, search]
    );

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!isOpen) return;
        if (e.key === 'Escape') {
          onClose?.();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((i) => (i + 1) % filtered.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          filtered[selectedIndex]?.onSelect?.();
          onClose?.();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filtered, selectedIndex, onClose]);

    if (!isOpen) return null;

    return (
      <>
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 40,
          }}
        />
        <div
          ref={ref}
          style={{
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '500px',
            background: 'var(--renge-color-bg)',
            borderRadius: 'var(--renge-radius-3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
            zIndex: 50,
          }}
          {...props}
        >
          <input
            autoFocus
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.currentTarget.value);
              setSelectedIndex(0);
            }}
            placeholder={placeholder}
            style={{
              width: '100%',
              padding: 'var(--renge-space-4)',
              border: 'none',
              borderBottom: '1px solid var(--renge-color-border-subtle)',
              backgroundColor: 'transparent',
              color: 'var(--renge-color-fg)',
              fontSize: 'var(--renge-font-size-base)',
              outline: 'none',
            }}
          />
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {filtered.length === 0 ? (
              <div style={{ padding: 'var(--renge-space-4)', color: 'var(--renge-color-fg-muted)', textAlign: 'center' }}>
                No commands found
              </div>
            ) : (
              filtered.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    item.onSelect?.();
                    onClose?.();
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: 'var(--renge-space-3) var(--renge-space-4)',
                    border: 'none',
                    background: idx === selectedIndex ? 'var(--renge-color-bg-subtle)' : 'transparent',
                    color: 'var(--renge-color-fg)',
                    cursor: 'pointer',
                    transition: 'background var(--renge-duration-1)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--renge-color-bg-subtle)';
                    setSelectedIndex(idx);
                  }}
                >
                  <div style={{ fontSize: 'var(--renge-font-size-sm)', fontWeight: 500 }}>{item.label}</div>
                  {item.description && (
                    <div style={{ fontSize: 'var(--renge-font-size-xs)', color: 'var(--renge-color-fg-muted)' }}>
                      {item.description}
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      </>
    );
  }
);

CommandPalette.displayName = 'CommandPalette';
