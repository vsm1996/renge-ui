import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export interface SkipLinkProps extends ComponentPropsWithoutRef<'a'> {
  href?: string;
  label?: string;
}

export const SkipLink = forwardRef<HTMLAnchorElement, SkipLinkProps>(
  ({ href = '#main', label = 'Skip to main content', ...props }, ref) => (
    <a
      ref={ref}
      href={href}
      style={{
        position: 'absolute',
        top: '-40px',
        left: 0,
        background: 'var(--renge-color-accent)',
        color: 'var(--renge-color-bg)',
        padding: 'var(--renge-space-2) var(--renge-space-3)',
        textDecoration: 'none',
        borderRadius: 'var(--renge-radius-2)',
        zIndex: 100,
      }}
      onFocus={(e) => {
        (e.currentTarget as HTMLElement).style.top = '0';
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLElement).style.top = '-40px';
      }}
      {...props}
    >
      {label}
    </a>
  )
);

SkipLink.displayName = 'SkipLink';
