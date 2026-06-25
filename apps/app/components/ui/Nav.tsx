'use client';

import { Stack, Text } from '@renge-ui/react';
import Link from 'next/link';

export function Nav() {
  return (
    <nav
      style={{
        borderBottom: '1px solid var(--renge-color-border-subtle)',
        padding: 'var(--renge-space-4) var(--renge-space-5)',
        position: 'sticky',
        top: 0,
        background: 'color-mix(in oklch, var(--renge-color-bg) 95%, transparent)',
        backdropFilter: 'blur(12px)',
        zIndex: 40,
      }}
    >
      <Stack direction="horizontal" align="center" style={{ justifyContent: 'space-between', maxWidth: 'var(--renge-container-xl)', margin: '0 auto' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Text
            style={{
              fontSize: 'var(--renge-font-size-lg)',
              fontWeight: 600,
              color: 'var(--renge-color-fg)',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
            }}
          >
            Renge
          </Text>
        </Link>

        <Stack gap="5" direction="horizontal" align="center">
          <Stack gap="4" direction="horizontal" style={{ display: 'flex' }}>
            {[
              { label: 'Philosophy', href: '#philosophy' },
              { label: 'Tokens', href: '#tokens' },
              { label: 'Get Started', href: '#getting-started' },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
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

          <a
            href="https://github.com/anthropics/renge"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--renge-color-fg-muted)',
              fontSize: 'var(--renge-font-size-sm)',
              fontFamily: 'var(--font-body)',
              textDecoration: 'none',
              transition: 'color var(--renge-duration-1) var(--renge-easing-ease-out)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--renge-color-accent)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--renge-color-fg-muted)';
            }}
          >
            GitHub
          </a>
        </Stack>
      </Stack>
    </nav>
  );
}
