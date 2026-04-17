// packages/react/src/components/Breadcrumb.tsx
//
// Breadcrumb trail. Each item is separated by a subtle chevron.
// The gap between items uses space-2 (8px = Fib2 × baseUnit).

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode, type CSSProperties } from 'react';

export interface BreadcrumbProps extends ComponentPropsWithoutRef<'nav'> {
  children: ReactNode;
  /** Custom separator — defaults to a chevron SVG */
  separator?: ReactNode;
}

export interface BreadcrumbItemProps extends ComponentPropsWithoutRef<'li'> {
  /** Whether this is the current/active page */
  current?: boolean;
  href?: string;
  children: ReactNode;
}

const DefaultSeparator = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <path
      d="M4 2.5l3.5 3.5L4 9.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb({ separator, style, children, ...props }, ref) {
    const sep = separator ?? <DefaultSeparator />;
    const items = Array.isArray(children) ? children : [children];

    return (
      <nav ref={ref} aria-label="Breadcrumb" style={{ ...style }} {...props}>
        <ol
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 'var(--renge-space-1)',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            fontSize: 'var(--renge-font-size-sm)',
            color: 'var(--renge-color-fg-subtle)',
          }}
        >
          {items.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--renge-space-1)' }}>
              {item}
              {i < items.length - 1 && (
                <span aria-hidden="true" style={{ color: 'var(--renge-color-fg-muted)', display: 'flex', alignItems: 'center' }}>
                  {sep}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
);

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ current = false, href, style, children, ...props }, ref) {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {href && !current ? (
          <a
            href={href}
            style={{
              color: 'var(--renge-color-accent)',
              textDecoration: 'none',
              transition: `color var(--renge-duration-1) var(--renge-easing-ease-out)`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--renge-color-accent-hover)';
              (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--renge-color-accent)';
              (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none';
            }}
          >
            {children}
          </a>
        ) : (
          <span
            aria-current={current ? 'page' : undefined}
            style={{
              color: current ? 'var(--renge-color-fg)' : 'var(--renge-color-fg-subtle)',
              fontWeight: current ? 500 : undefined,
            }}
          >
            {children}
          </span>
        )}
      </span>
    );
  }
);
