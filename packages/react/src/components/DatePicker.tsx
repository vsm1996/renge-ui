import { forwardRef, useState, useRef, useEffect } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export interface DatePickerProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  min?: string;
  max?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ value, onChange, min, max, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [month, setMonth] = useState(new Date(value || new Date()).getMonth());
    const [year, setYear] = useState(new Date(value || new Date()).getFullYear());

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      if (isOpen) document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const getDaysInMonth = (m: number, y: number) => new Date(y, m + 1, 0).getDate();
    const getFirstDayOfMonth = (m: number, y: number) => new Date(y, m, 1).getDay();

    const days = [];
    const firstDay = getFirstDayOfMonth(month, year);
    const daysInMonth = getDaysInMonth(month, year);

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    return (
      <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
        <input
          ref={ref}
          type="date"
          value={value || ''}
          onChange={(e) => onChange?.(e.currentTarget.value)}
          onFocus={() => setIsOpen(true)}
          min={min}
          max={max}
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
        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: 'var(--renge-space-2)',
              background: 'var(--renge-color-bg)',
              border: '1px solid var(--renge-color-border-subtle)',
              borderRadius: 'var(--renge-radius-2)',
              padding: 'var(--renge-space-3)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              zIndex: 50,
              minWidth: '280px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--renge-space-3)' }}>
              <button
                type="button"
                onClick={() => setMonth(month === 0 ? 11 : month - 1)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--renge-color-fg)',
                  cursor: 'pointer',
                  fontSize: 'var(--renge-font-size-base)',
                }}
              >
                ←
              </button>
              <div style={{ fontSize: 'var(--renge-font-size-sm)', fontWeight: 600 }}>
                {new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
              <button
                type="button"
                onClick={() => setMonth(month === 11 ? 0 : month + 1)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--renge-color-fg)',
                  cursor: 'pointer',
                  fontSize: 'var(--renge-font-size-base)',
                }}
              >
                →
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 'var(--renge-space-1)' }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  style={{
                    textAlign: 'center',
                    fontSize: 'var(--renge-font-size-xs)',
                    fontWeight: 600,
                    color: 'var(--renge-color-fg-muted)',
                    padding: 'var(--renge-space-1)',
                  }}
                >
                  {day}
                </div>
              ))}
              {days.map((day, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (day) {
                      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                      onChange?.(dateStr);
                      setIsOpen(false);
                    }
                  }}
                  style={{
                    padding: 'var(--renge-space-1)',
                    border: 'none',
                    background: day ? 'transparent' : undefined,
                    color: 'var(--renge-color-fg)',
                    cursor: day ? 'pointer' : 'default',
                    fontSize: 'var(--renge-font-size-sm)',
                    borderRadius: 'var(--renge-radius-1)',
                    transition: 'background var(--renge-duration-1)',
                  }}
                  onMouseEnter={(e) => {
                    if (day) (e.currentTarget as HTMLElement).style.background = 'var(--renge-color-bg-subtle)';
                  }}
                  onMouseLeave={(e) => {
                    if (day) (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                  disabled={!day}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
