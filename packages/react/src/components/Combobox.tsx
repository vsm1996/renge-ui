import { forwardRef, useState, useRef, useEffect, useId } from 'react';
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
  ({ options, value, onChange, placeholder, isOpen, onOpenChange, style, ...props }, ref) => {
    const [open, setOpen] = useState(isOpen ?? false);
    const [search, setSearch] = useState('');
    const [activeIndex, setActiveIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);
    const uid = useId();
    const listboxId = `renge-combobox-lb-${uid}`;

    const filtered = options.filter(opt =>
      opt.label.toLowerCase().includes(search.toLowerCase()) ||
      opt.value.toLowerCase().includes(search.toLowerCase())
    );

    const select = (opt: { label: string; value: string }) => {
      onChange?.(opt.value);
      setSearch('');
      setActiveIndex(-1);
      setOpen(false);
      onOpenChange?.(false);
    };

    useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
          onOpenChange?.(false);
          setActiveIndex(-1);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [open, onOpenChange]);

    // Reset active index when filtered results change
    useEffect(() => { setActiveIndex(-1); }, [search]);

    // Scroll active item into view
    useEffect(() => {
      if (activeIndex < 0 || !listboxRef.current) return;
      const items = listboxRef.current.querySelectorAll<HTMLElement>('[role="option"]');
      items[activeIndex]?.scrollIntoView({ block: 'nearest' });
    }, [activeIndex]);

    const activeId = activeIndex >= 0 && filtered[activeIndex]
      ? `${listboxId}-opt-${activeIndex}`
      : undefined;

    return (
      <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
        <input
          ref={ref}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-controls={open ? listboxId : undefined}
          aria-activedescendant={activeId}
          value={search || (open ? search : options.find(o => o.value === value)?.label || '')}
          onChange={(e) => {
            setSearch(e.currentTarget.value);
            setOpen(true);
            onOpenChange?.(true);
          }}
          onFocus={() => {
            setOpen(true);
            onOpenChange?.(true);
          }}
          onKeyDown={(e) => {
            if (!open) return;
            if (e.key === 'Escape') {
              e.preventDefault();
              setOpen(false);
              onOpenChange?.(false);
              setActiveIndex(-1);
              setSearch('');
            } else if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActiveIndex((i) => Math.max(i - 1, -1));
            } else if (e.key === 'Enter' && activeIndex >= 0 && filtered[activeIndex]) {
              e.preventDefault();
              select(filtered[activeIndex]);
            } else if (e.key === 'Home') {
              e.preventDefault();
              setActiveIndex(0);
            } else if (e.key === 'End') {
              e.preventDefault();
              setActiveIndex(filtered.length - 1);
            }
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
            boxSizing: 'border-box',
            ...style,
          }}
          {...props}
        />

        {open && filtered.length > 0 && (
          <div
            ref={listboxRef}
            id={listboxId}
            role="listbox"
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
            {filtered.map((option, idx) => {
              const isActive = idx === activeIndex;
              const isSelected = option.value === value;
              return (
                <div
                  key={option.value}
                  id={`${listboxId}-opt-${idx}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => select(option)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  style={{
                    padding: 'var(--renge-space-2) var(--renge-space-3)',
                    cursor: 'pointer',
                    background: isActive
                      ? 'var(--renge-color-bg-subtle)'
                      : isSelected
                      ? 'color-mix(in oklch, var(--renge-color-accent) 8%, transparent)'
                      : 'transparent',
                    color: 'var(--renge-color-fg)',
                    fontSize: 'var(--renge-font-size-sm)',
                    fontWeight: isSelected ? 500 : 400,
                    transition: 'background var(--renge-duration-1)',
                  }}
                >
                  {option.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

Combobox.displayName = 'Combobox';
