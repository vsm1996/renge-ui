'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Stack, Text, Heading, Section, Divider } from '@renge-ui/react';

export function ComingSoon() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-200px' });

  return (
    <>
      <Divider />
      <Section
        style={{
          paddingTop: 'var(--renge-space-7)',
          paddingBottom: 'var(--renge-space-7)',
        }}
        ref={ref}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Stack gap="5" align="center" style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto' }}>
            <Stack gap="3">
              <Text
                size="sm"
                style={{
                  color: 'var(--renge-color-accent)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                }}
              >
                Coming next
              </Text>
              <Heading level={2} style={{ fontSize: 'var(--renge-font-size-3xl)', letterSpacing: '-0.02em' }}>
                React components.
              </Heading>
              <Text style={{ color: 'var(--renge-color-fg-subtle)', lineHeight: 1.7 }}>
                @renge-ui/react will bring fully-featured components built on these tokens. Button, Input, Card, Modal — all mathematically proportioned and token-driven.
              </Text>
            </Stack>

            <Stack
              gap="3"
              direction="horizontal"
              style={{
                padding: 'var(--renge-space-4)',
                borderRadius: 'var(--renge-radius-2)',
                border: '1px solid var(--renge-color-border-subtle)',
                background: 'var(--renge-color-bg-subtle)',
                width: '100%',
                maxWidth: '32rem',
              }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  padding: 'var(--renge-space-2) var(--renge-space-3)',
                  borderRadius: 'var(--renge-radius-1)',
                  border: '1px solid var(--renge-color-border)',
                  background: 'var(--renge-color-bg)',
                  color: 'var(--renge-color-fg)',
                  fontSize: 'var(--renge-font-size-sm)',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  transition: 'border-color var(--renge-duration-1) var(--renge-easing-ease-out)',
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--renge-color-border-focus)';
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--renge-color-border)';
                }}
              />
              <button
                style={{
                  padding: 'var(--renge-space-2) var(--renge-space-4)',
                  borderRadius: 'var(--renge-radius-1)',
                  border: 'none',
                  background: 'var(--renge-color-accent)',
                  color: 'var(--renge-color-bg)',
                  fontSize: 'var(--renge-font-size-sm)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all var(--renge-duration-1) var(--renge-easing-ease-out)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = '0.85';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = '1';
                }}
              >
                Notify me
              </button>
            </Stack>

            <Text size="xs" style={{ color: 'var(--renge-color-fg-muted)' }}>
              No spam. Just updates about the release.
            </Text>
          </Stack>
        </motion.div>
      </Section>
    </>
  );
}
