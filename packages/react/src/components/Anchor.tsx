// packages/react/src/components/Anchor.tsx
//
// Styled anchor element. Color = accent, hover transitions with ease-out.
// Named Anchor rather than Link to avoid collision with Next.js Link.

import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export type AnchorVariant = 'default' | 'subtle' | 'plain';

export interface AnchorProps extends ComponentPropsWithoutRef<'a'> {
  variant?: AnchorVariant;
  /** Show underline at rest (default: underline only on hover) */
  underline?: boolean;
}

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  function Anchor({ variant = 'default', underline = false, style, ...props }, ref) {
    const colorMap: Record<AnchorVariant, string> = {
      default: 'var(--renge-color-accent)',
      subtle:  'var(--renge-color-fg-subtle)',
      plain:   'inherit',
    };

    return (
      <a
        ref={ref}
        style={{
          color: colorMap[variant],
          textDecoration: underline ? 'underline' : 'none',
          textDecorationColor: 'var(--renge-color-accent)',
          textUnderlineOffset: '3px',
          transition: `color var(--renge-duration-1) var(--renge-easing-ease-out), text-decoration-color var(--renge-duration-1) var(--renge-easing-ease-out)`,
          cursor: 'pointer',
          ...style,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.color = 'var(--renge-color-accent-hover)';
          el.style.textDecoration = 'underline';
          props.onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.color = colorMap[variant];
          el.style.textDecoration = underline ? 'underline' : 'none';
          props.onMouseLeave?.(e);
        }}
        {...props}
      />
    );
  }
);
