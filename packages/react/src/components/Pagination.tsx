// packages/react/src/components/Pagination.tsx
//
// Page navigation. Page buttons use the same proportions as Button sm.
// Active page is highlighted with accent. Ellipsis gaps use the
// Fibonacci sequence to decide when to truncate (show 5 pages max — Fib5).

import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export interface PaginationProps extends Omit<ComponentPropsWithoutRef<'nav'>, 'onChange'> {
  /** Total number of pages */
  total: number;
  /** Current page (1-indexed) */
  page: number;
  onChange: (page: number) => void;
  /** Max sibling pages shown either side of active — default 1 (Fib1) */
  siblings?: number;
  showEdges?: boolean;
}

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function getPages(total: number, page: number, siblings: number): (number | '...')[] {
  const totalDisplayed = siblings * 2 + 5; // center + siblings + 2 edges + 2 ellipses
  if (total <= totalDisplayed) return range(1, total);

  const leftSib = Math.max(page - siblings, 2);
  const rightSib = Math.min(page + siblings, total - 1);
  const showLeft = leftSib > 2;
  const showRight = rightSib < total - 1;

  const middle = range(leftSib, rightSib);

  return [
    1,
    ...(showLeft ? ['...' as const] : []),
    ...middle,
    ...(showRight ? ['...' as const] : []),
    total,
  ];
}

const PageBtn = ({
  label,
  active = false,
  disabled = false,
  onClick,
}: {
  label: string | number;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) => (
  <button
    aria-label={typeof label === 'number' ? `Page ${label}` : label}
    aria-current={active ? 'page' : undefined}
    disabled={disabled}
    onClick={onClick}
    style={{
      minWidth: 'var(--renge-space-5)',
      height: 'var(--renge-space-5)',
      padding: '0 var(--renge-space-2)',
      borderRadius: 'var(--renge-radius-1)',
      border: active ? '1px solid var(--renge-color-accent)' : '1px solid transparent',
      background: active ? 'var(--renge-color-accent)' : 'transparent',
      color: active ? 'var(--renge-color-fg-inverse)' : 'var(--renge-color-fg-subtle)',
      fontSize: 'var(--renge-font-size-sm)',
      fontFamily: 'inherit',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: `all var(--renge-duration-1) var(--renge-easing-ease-out)`,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontVariantNumeric: 'tabular-nums',
    }}
    onMouseEnter={(e) => {
      if (!active && !disabled) {
        (e.currentTarget as HTMLButtonElement).style.background = 'var(--renge-color-bg-subtle)';
      }
    }}
    onMouseLeave={(e) => {
      if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
    }}
  >
    {label}
  </button>
);

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  function Pagination({ total, page, onChange, siblings = 1, showEdges = true, style, ...props }, ref) {
    const pages = getPages(total, page, siblings);

    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--renge-space-1)', ...style }}
        {...props}
      >
        {/* Previous */}
        <PageBtn
          label="←"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
        />

        {pages.map((p, i) =>
          p === '...' ? (
            <span
              key={`ellipsis-${i}`}
              style={{
                width: 'var(--renge-space-4)',
                textAlign: 'center',
                color: 'var(--renge-color-fg-muted)',
                fontSize: 'var(--renge-font-size-sm)',
                userSelect: 'none',
              }}
              aria-hidden="true"
            >
              …
            </span>
          ) : (
            <PageBtn
              key={p}
              label={p}
              active={p === page}
              onClick={() => onChange(p)}
            />
          )
        )}

        {/* Next */}
        <PageBtn
          label="→"
          disabled={page >= total}
          onClick={() => onChange(page + 1)}
        />
      </nav>
    );
  }
);
