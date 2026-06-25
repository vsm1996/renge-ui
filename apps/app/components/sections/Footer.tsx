'use client';

import { Stack, Text, Divider } from '@renge-ui/react';

export function Footer() {
  return (
    <>
      <Divider />
      <footer
        style={{
          padding: 'var(--renge-space-6) var(--renge-space-5)',
          background: 'var(--renge-color-bg-subtle)',
        }}
      >
        <Stack
          gap="5"
          style={{
            maxWidth: 'var(--renge-container-xl)',
            margin: '0 auto',
          }}
        >
          <Stack gap="4" direction="horizontal" style={{ justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <Stack gap="2">
              <Text style={{ fontSize: 'var(--renge-font-size-lg)', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--renge-color-fg)' }}>
                Renge
              </Text>
              <Text size="sm" style={{ color: 'var(--renge-color-fg-muted)', maxWidth: '32rem' }}>
                A design system built on natural mathematics. PHI, Fibonacci, phyllotaxis.
              </Text>
            </Stack>

            <Stack gap="3" direction="horizontal" style={{ flexWrap: 'wrap' }}>
              {[
                { label: 'GitHub', href: 'https://github.com/anthropics/renge' },
                { label: 'Docs', href: '#philosophy' },
                { label: 'Token Package', href: '#getting-started' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    color: 'var(--renge-color-fg-muted)',
                    textDecoration: 'none',
                    fontSize: 'var(--renge-font-size-sm)',
                    fontFamily: 'var(--font-body)',
                    transition: 'color var(--renge-duration-1) var(--renge-easing-ease-out)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--renge-color-accent)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--renge-color-fg-muted)';
                  }}
                >
                  {label}
                </a>
              ))}
            </Stack>
          </Stack>

          <Stack
            gap="3"
            style={{
              paddingTop: 'var(--renge-space-4)',
              borderTop: '1px solid var(--renge-color-border-subtle)',
            }}
          >
            <Stack gap="2" direction="horizontal" align="center" style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <Text size="xs" style={{ color: 'var(--renge-color-fg-muted)', letterSpacing: '0.04em' }}>
                Built with Renge · Proportion as a first principle · 1 : 1.618
              </Text>
              <Text size="xs" style={{ color: 'var(--renge-color-fg-muted)', letterSpacing: '0.04em' }}>
                © {new Date().getFullYear()} Anthropic PBC
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </footer>
    </>
  );
}
