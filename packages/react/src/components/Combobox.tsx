import { forwardRef, useState, useRef, useEffect } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export interface ComboboxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'value' | 'onChange'> {
  options: Array<{ label: string; value: string }>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  ({ options, value, onChange, placeholder, isOpen, onOpenChange, ...props }, ref) => {
    const [open, setOpen] = useState(isOpen ?? false);
    const [search, setSearch] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const filtered = options.filter(opt =>
      opt.label.toLowerCase().includes(search.toLowerCase()) ||
      opt.value.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
          onOpenChange?.(false);
        }
      };
      if (open) document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, onOpenChange]);

    return (
      <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
        <input
          ref={ref}
          type="text"
          value={search || options.find(o => o.value === value)?.label || ''}
          onChange={(e) => {
            setSearch(e.currentTarget.value);
            setOpen(true);
            onOpenChange?.(true);
          }}
          onFocus={() => {
            setOpen(true);
            onOpenChange?.(true);
          }}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: 'var(--renge-space-2) var(--renge-space-3)',
            border: '1px solid var(--renge-color-border)',
            borderRadius: 'var(--renge-radius-2)',
            fontSize: 'var(--renge-font-size-base)',
            backgroundColor: 'var(--renge-color-bg)',
            color: 'var(--renge-color-fg)',
          }}
          {...props}
        />
        {open && filtered.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: 'var(--renge-space-1)',
              background: 'var(--renge-color-bg)',
              border: '1px solid var(--renge-color-border-subtle)',
              borderRadius: 'var(--renge-radius-2)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              zIndex: 50,
              maxHeight: '200px',
              overflowY: 'auto',
            }}
          >
            {filtered.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange?.(option.value);
                  setSearch('');
                  setOpen(false);
                  onOpenChange?.(false);
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: 'var(--renge-space-2) var(--renge-space-3)',
                  border: 'none',
                  background: value === option.value ? 'var(--renge-color-bg-subtle)' : 'transparent',
                  color: 'var(--renge-color-fg)',
                  cursor: 'pointer',
                  transition: 'background var(--renge-duration-1)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--renge-color-bg-subtle)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    value === option.value ? 'var(--renge-color-bg-subtle)' : 'transparent';
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Combobox.displayName = 'Combobox';
