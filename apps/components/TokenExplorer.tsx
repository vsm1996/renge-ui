'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Stack, Text, Heading, Section } from '@renge-ui/react';
import { useProfile } from '@/components/ui/ProfileToggle';

// Token definitions with metadata
const TOKENS = {
  spacing: [
    { key: 'space-0', value: '0px', formula: '0 × 4px', category: 'Spacing' },
    { key: 'space-1', value: '4px', formula: '1 × 4px (Fib[0])', category: 'Spacing' },
    { key: 'space-2', value: '8px', formula: '2 × 4px (Fib[1])', category: 'Spacing' },
    { key: 'space-3', value: '12px', formula: '3 × 4px (Fib[2])', category: 'Spacing' },
    { key: 'space-4', value: '20px', formula: '5 × 4px (Fib[3])', category: 'Spacing' },
    { key: 'space-5', value: '32px', formula: '8 × 4px (Fib[4])', category: 'Spacing' },
    { key: 'space-6', value: '52px', formula: '13 × 4px (Fib[5])', category: 'Spacing' },
  ],
  typography: [
    { key: 'fontSize-xs', value: '9.9px', formula: '16 × φ^(-0.5)', category: 'Typography' },
    { key: 'fontSize-sm', value: '12.6px', formula: '16 × φ^(-0.25)', category: 'Typography' },
    { key: 'fontSize-base', value: '16px', formula: '16 × φ^0', category: 'Typography' },
    { key: 'fontSize-lg', value: '25.9px', formula: '16 × φ^1', category: 'Typography' },
    { key: 'fontSize-xl', value: '41.9px', formula: '16 × φ^2', category: 'Typography' },
    { key: 'fontSize-2xl', value: '67.8px', formula: '16 × φ^3', category: 'Typography' },
    { key: 'fontSize-3xl', value: '109.7px', formula: '16 × φ^4', category: 'Typography' },
    { key: 'fontSize-4xl', value: '177.4px', formula: '16 × φ^5', category: 'Typography' },
  ],
  motion: [
    { key: 'duration-0', value: '0ms', formula: 'Instant', category: 'Duration' },
    { key: 'duration-1', value: '100ms', formula: 'Fib[0] × 100ms', category: 'Duration' },
    { key: 'duration-2', value: '200ms', formula: 'Fib[1] × 100ms', category: 'Duration' },
    { key: 'duration-3', value: '300ms', formula: 'Fib[2] × 100ms', category: 'Duration' },
    { key: 'duration-4', value: '500ms', formula: 'Fib[3] × 100ms', category: 'Duration' },
    { key: 'duration-5', value: '800ms', formula: 'Fib[4] × 100ms', category: 'Duration' },
    { key: 'easing-ease-out', value: 'cubic-bezier(0.382, 1, 0.618, 1)', formula: 'φ-split snap', category: 'Easing' },
    { key: 'easing-ease-in', value: 'cubic-bezier(0.382, 0, 1, 0.618)', formula: 'φ-split slow-start', category: 'Easing' },
    { key: 'easing-ease-in-out', value: 'cubic-bezier(0.382, 0, 0.618, 1)', formula: 'φ-split inflect', category: 'Easing' },
  ],
  shadow: [
    { key: 'shadow-layer-1', value: '0 4px 8px rgba(0,0,0,0.05)', formula: 'Subtle elevation', category: 'Shadow' },
    { key: 'shadow-layer-2', value: '0 8px 12px rgba(0,0,0,0.1)', formula: 'Medium elevation', category: 'Shadow' },
    { key: 'shadow-layer-3', value: '0 12px 20px rgba(0,0,0,0.15)', formula: 'Strong elevation', category: 'Shadow' },
    { key: 'shadow-focus', value: '0 0 0 3px var(--renge-color-accent-rgb)', formula: 'Focus ring', category: 'Shadow' },
  ],
  color: [
    { key: 'color-bg', value: 'Background', formula: 'Profile-dependent', category: 'Semantic Color' },
    { key: 'color-fg', value: 'Foreground', formula: 'Profile-dependent', category: 'Semantic Color' },
    { key: 'color-accent', value: 'Accent', formula: 'Profile-dependent', category: 'Semantic Color' },
    { key: 'color-border', value: 'Border', formula: 'Profile-dependent', category: 'Semantic Color' },
    { key: 'color-success', value: 'Success', formula: 'Profile-dependent', category: 'Semantic Color' },
    { key: 'color-warning', value: 'Warning', formula: 'Profile-dependent', category: 'Semantic Color' },
    { key: 'color-danger', value: 'Danger', formula: 'Profile-dependent', category: 'Semantic Color' },
  ],
};

type TokenCategory = keyof typeof TOKENS;

export function TokenExplorer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-200px' });
  const [activeTab, setActiveTab] = useState<TokenCategory>('spacing');
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const { profile } = useProfile();

  const filteredTokens = TOKENS[activeTab].filter((token) =>
    token.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.formula.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Section
      id="token-explorer"
      style={{
        paddingTop: 'var(--renge-space-7)',
        paddingBottom: 'var(--renge-space-7)',
        background: 'var(--renge-color-bg-subtle)',
      }}
      ref={ref}
    >
      <Stack gap="6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Stack gap="3" style={{ maxWidth: '52rem' }}>
            <Text
              size="sm"
              style={{
                color: 'var(--renge-color-accent)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-body)',
              }}
            >
              Explorer
            </Text>
            <Heading level={2} style={{ fontSize: 'var(--renge-font-size-3xl)', letterSpacing: '-0.02em' }}>
              All tokens, searchable.
            </Heading>
            <Text style={{ color: 'var(--renge-color-fg-subtle)', lineHeight: 1.7 }}>
              Every token is mathematically derived and named semantically. Search by name or formula to find what you need.
            </Text>
          </Stack>
        </motion.div>

        {/* Search + Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Stack gap="4">
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search tokens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--renge-space-3) var(--renge-space-4)',
                  borderRadius: 'var(--renge-radius-2)',
                  border: '1px solid var(--renge-color-border)',
                  background: 'var(--renge-color-bg)',
                  color: 'var(--renge-color-fg)',
                  fontSize: 'var(--renge-font-size-base)',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  transition: 'border-color var(--renge-duration-1) var(--renge-easing-ease-out)',
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--renge-color-accent)';
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--renge-color-border)';
                }}
              />
            </div>

            {/* Tabs */}
            <Stack gap="2" direction="horizontal" style={{ flexWrap: 'wrap' }}>
              {(Object.keys(TOKENS) as TokenCategory[]).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  style={{
                    padding: 'var(--renge-space-2) var(--renge-space-3)',
                    borderRadius: 'var(--renge-radius-1)',
                    border: `1px solid ${activeTab === category ? 'var(--renge-color-accent)' : 'var(--renge-color-border)'}`,
                    background: activeTab === category ? 'var(--renge-color-accent)' : 'var(--renge-color-bg)',
                    color: activeTab === category ? 'var(--renge-color-bg)' : 'var(--renge-color-fg)',
                    fontSize: 'var(--renge-font-size-sm)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all var(--renge-duration-1) var(--renge-easing-ease-out)',
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== category) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--renge-color-accent)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== category) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--renge-color-border)';
                    }
                  }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </Stack>
          </Stack>
        </motion.div>

        {/* Token Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 'var(--renge-space-4)',
            }}
          >
            {filteredTokens.map((token, i) => (
              <motion.div
                key={token.key}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                onClick={() => copyToClipboard(`--renge-${token.key}`, token.key)}
                style={{
                  padding: 'var(--renge-space-4)',
                  borderRadius: 'var(--renge-radius-2)',
                  border: '1px solid var(--renge-color-border)',
                  background: 'var(--renge-color-bg)',
                  cursor: 'pointer',
                  transition: 'all var(--renge-duration-1) var(--renge-easing-ease-out)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--renge-color-accent)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--renge-shadow-layer-1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--renge-color-border)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <Stack gap="2">
                  <Stack gap="1">
                    <Text size="sm" style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--renge-color-accent)' }}>
                      --renge-{token.key}
                    </Text>
                    <Text size="xs" style={{ color: 'var(--renge-color-fg-muted)' }}>
                      {token.formula}
                    </Text>
                  </Stack>

                  {/* Preview */}
                  {token.category.includes('Color') ? (
                    <div
                      style={{
                        height: '40px',
                        borderRadius: 'var(--renge-radius-1)',
                        background: `var(--renge-${token.key})`,
                        border: '1px solid var(--renge-color-border)',
                      }}
                    />
                  ) : token.category.includes('Shadow') ? (
                    <div
                      style={{
                        height: '40px',
                        borderRadius: 'var(--renge-radius-1)',
                        background: 'var(--renge-color-bg-subtle)',
                        boxShadow: `var(--renge-${token.key})`,
                      }}
                    />
                  ) : null}

                  <Stack gap="1" direction="horizontal" align="center" style={{ justifyContent: 'space-between' }}>
                    <Text size="xs" style={{ fontFamily: 'monospace', color: 'var(--renge-color-fg)' }}>
                      {token.value}
                    </Text>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(`--renge-${token.key}`, token.key);
                      }}
                      style={{
                        padding: 'var(--renge-space-1) var(--renge-space-2)',
                        borderRadius: 'var(--renge-radius-1)',
                        border: 'none',
                        background: 'transparent',
                        color: 'var(--renge-color-fg-muted)',
                        fontSize: 'var(--renge-font-size-xs)',
                        cursor: 'pointer',
                        transition: 'color var(--renge-duration-1) var(--renge-easing-ease-out)',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.color = 'var(--renge-color-accent)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.color = 'var(--renge-color-fg-muted)';
                      }}
                    >
                      {copied === token.key ? '✓' : '📋'}
                    </button>
                  </Stack>
                </Stack>
              </motion.div>
            ))}
          </div>

          {filteredTokens.length === 0 && (
            <div style={{ textAlign: 'center', padding: 'var(--renge-space-6)' }}>
              <Text style={{ color: 'var(--renge-color-fg-muted)' }}>
                No tokens match "{searchTerm}"
              </Text>
            </div>
          )}
        </motion.div>
      </Stack>
    </Section>
  );
}
