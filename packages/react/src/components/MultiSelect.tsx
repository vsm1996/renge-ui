import { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

if (typeof document !== 'undefined') {
  const id = '__renge-multiselect-css__';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
[data-renge-multiselect-trigger]:focus-visible {
  outline: none !important;
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--renge-color-accent) 25%, transparent) !important;
}
[data-renge-multiselect-option] {
  transition: background var(--renge-duration-1) var(--renge-easing-ease-out) !important;
}
[data-renge-multiselect-option]:hover {
  background: var(--renge-color-bg-subtle) !important;
}
[data-renge-multiselect-option]:focus-visible {
  outline: none !important;
  background: var(--renge-color-bg-subtle) !important;
  box-shadow: inset 0 0 0 2px var(--renge-color-border-focus) !important;
}`;
    document.head.appendChild(s);
  }
}

export interface MultiSelectProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  options: Array<{ label: string; value: string }>;
  values?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
}

export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  ({ options, values = [], onChange, placeholder = 'Select options...', ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);
    const listboxId = useRef(`renge-multiselect-${Math.random().toString(36).slice(2)}`);

    const toggleValue = (value: string) => {
      const next = values.includes(value) ? values.filter((v) => v !== value) : [...values, value];
      onChange?.(next);
    };

    const close = useCallback(() => {
      setIsOpen(false);
      triggerRef.current?.focus();
    }, []);

    useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        if (
          listboxRef.current && !listboxRef.current.contains(e.target as Node) &&
          !triggerRef.current?.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [isOpen]);

    return (
      <div ref={ref} style={{ position: 'relative' }} {...props}>
        <button
          ref={triggerRef}
          type="button"
          data-renge-multiselect-trigger=""
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId.current}
          onClick={() => setIsOpen((o) => !o)}
          onKeyDown={(e) => {
            if (e.key === 'Escape' && isOpen) { e.preventDefault(); close(); }
            if ((e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') && !isOpen) {
              e.preventDefault();
              setIsOpen(true);
            }
          }}
          style={{
            width: '100%',
            padding: 'var(--renge-space-2) var(--renge-space-3)',
            border: '1px solid var(--renge-color-border)',
            borderRadius: 'var(--renge-radius-2)',
            background: 'var(--renge-color-bg)',
            cursor: 'pointer',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--renge-space-2)',
            textAlign: 'left',
            fontFamily: 'inherit',
            fontSize: 'var(--renge-font-size-base)',
          }}
        >
          {values.length === 0 ? (
            <span style={{ color: 'var(--renge-color-fg-muted)' }}>{placeholder}</span>
          ) : (
            values.map((v) => (
              <span
                key={v}
                style={{
                  background: 'var(--renge-color-accent)',
                  color: 'var(--renge-color-bg)',
                  padding: 'var(--renge-space-1) var(--renge-space-2)',
                  borderRadius: 'var(--renge-radius-1)',
                  fontSize: 'var(--renge-font-size-xs)',
                }}
              >
                {options.find((o) => o.value === v)?.label}
              </span>
            ))
          )}
        </button>

        {isOpen && (
          <div
            ref={listboxRef}
            id={listboxId.current}
            role="listbox"
            aria-multiselectable="true"
            onKeyDown={(e) => {
              if (e.key === 'Escape') { e.preventDefault(); close(); return; }
              if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                const items = Array.from(
                  listboxRef.current?.querySelectorAll<HTMLElement>('[data-renge-multiselect-option]') ?? []
                );
                const idx = items.indexOf(document.activeElement as HTMLElement);
                const next = e.key === 'ArrowDown'
                  ? (items[idx + 1] ?? items[0])
                  : (items[idx - 1] ?? items[items.length - 1]);
                next?.focus();
              }
            }}
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
            }}
          >
            {options.map((option) => {
              const checked = values.includes(option.value);
              return (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={checked}
                  data-renge-multiselect-option=""
                  tabIndex={0}
                  onClick={() => toggleValue(option.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleValue(option.value); }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 'var(--renge-space-2) var(--renge-space-3)',
                    cursor: 'pointer',
                    gap: 'var(--renge-space-2)',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    readOnly
                    tabIndex={-1}
                    style={{ cursor: 'pointer', pointerEvents: 'none' }}
                  />
                  <span style={{ color: 'var(--renge-color-fg)', fontSize: 'var(--renge-font-size-sm)' }}>
                    {option.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
