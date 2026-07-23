'use client';

import { useState, useEffect, useRef } from 'react';
import { Stack, Text } from '@renge-ui/react';
import Link from 'next/link';

export function Nav() {
  const [activeHash, setActiveHash] = useState('');
  const [docsOpen, setDocsOpen] = useState(false);
  const docsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveHash(window.location.hash);
    const handleHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (docsRef.current && !docsRef.current.contains(event.target as Node)) {
        setDocsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
                aria-label={`Go to ${label} section`}
                aria-current={activeHash === href ? 'page' : undefined}
                style={{
                  color: activeHash === href ? 'var(--renge-color-accent)' : 'var(--renge-color-fg-muted)',
                  textDecoration: 'none',
                  fontSize: 'var(--renge-font-size-sm)',
                  fontFamily: 'var(--font-body)',
                  transition: 'color var(--renge-duration-1) var(--renge-easing-ease-out)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--renge-color-accent)';
                }}
                onMouseLeave={(e) => {
                  if (activeHash !== href) {
                    (e.currentTarget as HTMLElement).style.color = 'var(--renge-color-fg-muted)';
                  }
                }}
              >
                {label}
              </a>
            ))}
          </Stack>

          {/* Documentation Dropdown */}
          <div style={{ position: 'relative' }} ref={docsRef}>
            <button
              onClick={() => setDocsOpen(!docsOpen)}
              aria-label="Documentation menu"
              aria-expanded={docsOpen}
              style={{
                color: 'var(--renge-color-fg-muted)',
                fontSize: 'var(--renge-font-size-sm)',
                fontFamily: 'var(--font-body)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--renge-space-1)',
                transition: 'color var(--renge-duration-1) var(--renge-easing-ease-out)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--renge-color-accent)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--renge-color-fg-muted)';
              }}
            >
              Docs
              <span style={{ fontSize: 'var(--renge-font-size-xs)', opacity: 0.7 }}>▼</span>
            </button>

            {docsOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + var(--renge-space-2))',
                  right: 0,
                  background: 'var(--renge-color-bg)',
                  border: '1px solid var(--renge-color-border-subtle)',
                  borderRadius: 'var(--renge-radius-2)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  zIndex: 50,
                  minWidth: '200px',
                  overflow: 'hidden',
                }}
              >
                <div style={{ padding: 'var(--renge-space-2)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-1)' }}>
                    <div style={{ fontSize: 'var(--renge-font-size-xs)', color: 'var(--renge-color-fg-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, padding: 'var(--renge-space-2) var(--renge-space-3)', opacity: 0.7 }}>
                      System
                    </div>
                    {[
                      { label: 'Tokens', href: '/tokens', angle: 0 },
                      { label: 'Petals', href: '/petals', angle: 137.5 },
                      { label: 'System', href: '/system', angle: 275 },
                      { label: 'Accessibility', href: '/system#accessibility', angle: 137.5 },
                    ].map(({ label, href, angle }, idx) => {
                      const isLarge = typeof window !== 'undefined' && window.innerWidth > 768;
                      const radians = (angle * Math.PI) / 180;
                      const distance = isLarge ? 4 : 0; // phyllotaxis radius (only on desktop)
                      const offsetX = distance * Math.cos(radians);
                      const offsetY = distance * Math.sin(radians);

                      return (
                        <a
                          key={href}
                          href={href}
                          style={{
                            color: 'var(--renge-color-fg-muted)',
                            textDecoration: 'none',
                            fontSize: 'var(--renge-font-size-sm)',
                            fontFamily: 'var(--font-body)',
                            padding: 'var(--renge-space-2) var(--renge-space-3)',
                            borderRadius: 'var(--renge-radius-1)',
                            transition: 'all var(--renge-duration-1) var(--renge-easing-ease-out)',
                            display: 'block',
                            transform: isLarge ? `translate(${offsetX}px, ${offsetY}px) rotate(${angle}deg)` : 'none',
                            opacity: 0.9 + idx * 0.02,
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = 'var(--renge-color-bg-subtle)';
                            (e.currentTarget as HTMLElement).style.color = 'var(--renge-color-accent)';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = 'transparent';
                            (e.currentTarget as HTMLElement).style.color = 'var(--renge-color-fg-muted)';
                          }}
                          onClick={() => setDocsOpen(false)}
                        >
                          {label}
                        </a>
                      );
                    })}

                    <div style={{ height: '1px', background: 'var(--renge-color-border-subtle)', margin: 'var(--renge-space-1) 0' }} />

                    <div style={{ fontSize: 'var(--renge-font-size-xs)', color: 'var(--renge-color-fg-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, padding: 'var(--renge-space-2) var(--renge-space-3)', opacity: 0.7 }}>
                      Components & Libraries
                    </div>
                    {[
                      { label: 'React', href: '/components' },
                      { label: 'Tailwind', href: '/tailwind' },
                      { label: 'Vue', href: '/vue' },
                      { label: 'Svelte', href: '/svelte' },
                    ].map(({ label, href }) => (
                      <a
                        key={href}
                        href={href}
                        style={{
                          color: 'var(--renge-color-fg-muted)',
                          textDecoration: 'none',
                          fontSize: 'var(--renge-font-size-sm)',
                          fontFamily: 'var(--font-body)',
                          padding: 'var(--renge-space-2) var(--renge-space-3)',
                          borderRadius: 'var(--renge-radius-1)',
                          transition: 'all var(--renge-duration-1) var(--renge-easing-ease-out)',
                          display: 'block',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = 'var(--renge-color-bg-subtle)';
                          (e.currentTarget as HTMLElement).style.color = 'var(--renge-color-accent)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = 'transparent';
                          (e.currentTarget as HTMLElement).style.color = 'var(--renge-color-fg-muted)';
                        }}
                        onClick={() => setDocsOpen(false)}
                      >
                        {label}
                      </a>
                    ))}

                    <div style={{ height: '1px', background: 'var(--renge-color-border-subtle)', margin: 'var(--renge-space-1) 0' }} />

                    <div style={{ fontSize: 'var(--renge-font-size-xs)', color: 'var(--renge-color-fg-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, padding: 'var(--renge-space-2) var(--renge-space-3)', opacity: 0.7 }}>
                      Testing
                    </div>
                    <a
                      href="/test-utils"
                      style={{
                        color: 'var(--renge-color-fg-muted)',
                        textDecoration: 'none',
                        fontSize: 'var(--renge-font-size-sm)',
                        fontFamily: 'var(--font-body)',
                        padding: 'var(--renge-space-2) var(--renge-space-3)',
                        borderRadius: 'var(--renge-radius-1)',
                        transition: 'all var(--renge-duration-1) var(--renge-easing-ease-out)',
                        display: 'block',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'var(--renge-color-bg-subtle)';
                        (e.currentTarget as HTMLElement).style.color = 'var(--renge-color-accent)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                        (e.currentTarget as HTMLElement).style.color = 'var(--renge-color-fg-muted)';
                      }}
                      onClick={() => setDocsOpen(false)}
                    >
                      Test Utils
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          <a
            href="https://github.com/vsm1996/renge-ui"
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
