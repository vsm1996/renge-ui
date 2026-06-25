'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Stack, Text, Heading, Section } from '@renge-ui/react';

export function GettingStarted() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-200px' });
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const examples = [
    {
      id: 'css',
      title: 'CSS Custom Properties',
      description: 'Import the stylesheet and use CSS variables directly.',
      code: `import '@renge-ui/tokens/renge.css';

/* In your CSS */
.button {
  padding: var(--renge-space-3) var(--renge-space-4);
  font-size: var(--renge-font-size-base);
  border-radius: var(--renge-radius-2);
  transition: all var(--renge-duration-2)
              var(--renge-easing-ease-out);
}`,
    },
    {
      id: 'ts',
      title: 'TypeScript Tokens',
      description: 'Typed token references for JavaScript/TypeScript code.',
      code: `import { rengeVars } from '@renge-ui/tokens';

const buttonStyles = {
  padding: \`\${rengeVars.space[3]} \${rengeVars.space[4]}\`,
  fontSize: rengeVars.fontSize.base,
  borderRadius: rengeVars.radius[2],
  transition: \`all \${rengeVars.duration[2]}
              \${rengeVars.easing.out}\`,
};`,
    },
    {
      id: 'tailwind',
      title: 'Tailwind CSS (Coming Soon)',
      description: 'Complete Tailwind preset with all Renge tokens as utilities.',
      code: `// tailwind.config.ts
import { rengeTailwind } from '@renge-ui/tailwind';

export default {
  plugins: [rengeTailwind],
};

// In your HTML/JSX
<button className="px-4 py-3 text-base rounded-2
  transition-all duration-200 ease-out">
  Get Started
</button>`,
    },
  ];

  return (
    <Section
      id="getting-started"
      style={{
        paddingTop: 'var(--renge-space-7)',
        paddingBottom: 'var(--renge-space-7)',
      }}
      ref={ref}
    >
      <Stack gap="8">
        {/* Section header */}
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
              Installation
            </Text>
            <Heading level={2} style={{ fontSize: 'var(--renge-font-size-3xl)', letterSpacing: '-0.02em' }}>
              Get started in minutes.
            </Heading>
            <Text style={{ color: 'var(--renge-color-fg-subtle)', lineHeight: 1.7 }}>
              Renge is available as a standalone token package. No framework required. Fully accessible, WCAG 2.1 AA certified, with React components, Tailwind integration, and framework adapters for Vue and Svelte.
            </Text>
          </Stack>
        </motion.div>

        {/* Install command */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Stack
            gap="3"
            style={{
              padding: 'var(--renge-space-4)',
              border: '1px solid var(--renge-color-border-subtle)',
              borderRadius: 'var(--renge-radius-2)',
              background: 'var(--renge-color-bg-subtle)',
            }}
          >
            <Text size="sm" style={{ color: 'var(--renge-color-fg-muted)', fontFamily: 'var(--font-body)' }}>
              Install @renge-ui/tokens
            </Text>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--renge-space-3)',
                padding: 'var(--renge-space-3)',
                background: 'var(--renge-color-bg)',
                borderRadius: 'var(--renge-radius-1)',
                border: '1px solid var(--renge-color-border)',
              }}
            >
              <code
                style={{
                  fontFamily: 'monospace',
                  fontSize: 'var(--renge-font-size-sm)',
                  color: 'var(--renge-color-fg)',
                  flex: 1,
                  overflow: 'auto',
                }}
              >
                pnpm add @renge-ui/tokens
              </code>
              <button
                onClick={() => copyToClipboard('pnpm add @renge-ui/tokens', 'install')}
                style={{
                  padding: 'var(--renge-space-2) var(--renge-space-3)',
                  borderRadius: 'var(--renge-radius-1)',
                  border: '1px solid var(--renge-color-border-subtle)',
                  background: 'transparent',
                  color: 'var(--renge-color-fg-muted)',
                  fontSize: 'var(--renge-font-size-xs)',
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  transition: 'all var(--renge-duration-1) var(--renge-easing-ease-out)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--renge-color-bg-subtle)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--renge-color-accent)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = 'var(--renge-color-fg-muted)';
                }}
              >
                {copied === 'install' ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </Stack>
        </motion.div>

        {/* Usage examples */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--renge-space-5)' }}>
          {examples.map((example, i) => (
            <motion.div
              key={example.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
            >
              <Stack
                gap="3"
                style={{
                  padding: 'var(--renge-space-5)',
                  border: '1px solid var(--renge-color-border-subtle)',
                  borderRadius: 'var(--renge-radius-3)',
                  background: 'var(--renge-color-bg-subtle)',
                  height: '100%',
                }}
              >
                <Stack gap="1">
                  <Heading level={3} style={{ fontSize: 'var(--renge-font-size-lg)' }}>
                    {example.title}
                  </Heading>
                  <Text size="sm" style={{ color: 'var(--renge-color-fg-muted)' }}>
                    {example.description}
                  </Text>
                </Stack>

                <div
                  style={{
                    position: 'relative',
                    borderRadius: 'var(--renge-radius-2)',
                    background: 'var(--renge-color-bg)',
                    border: '1px solid var(--renge-color-border)',
                    overflow: 'hidden',
                  }}
                >
                  <pre
                    style={{
                      margin: 0,
                      padding: 'var(--renge-space-3)',
                      fontSize: 'var(--renge-font-size-xs)',
                      lineHeight: 1.5,
                      color: 'var(--renge-color-fg)',
                      fontFamily: 'monospace',
                      overflow: 'auto',
                      maxHeight: '300px',
                    }}
                  >
                    <code>{example.code}</code>
                  </pre>

                  <button
                    onClick={() => copyToClipboard(example.code, example.id)}
                    style={{
                      position: 'absolute',
                      top: 'var(--renge-space-2)',
                      right: 'var(--renge-space-2)',
                      padding: 'var(--renge-space-1) var(--renge-space-3)',
                      borderRadius: 'var(--renge-radius-1)',
                      border: '1px solid var(--renge-color-border-subtle)',
                      background: 'var(--renge-color-bg)',
                      color: 'var(--renge-color-fg-muted)',
                      fontSize: 'var(--renge-font-size-xs)',
                      fontFamily: 'var(--font-body)',
                      cursor: 'pointer',
                      transition: 'all var(--renge-duration-1) var(--renge-easing-ease-out)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'var(--renge-color-bg-subtle)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--renge-color-accent)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'var(--renge-color-bg)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--renge-color-fg-muted)';
                    }}
                  >
                    {copied === example.id ? '✓' : '📋'}
                  </button>
                </div>
              </Stack>
            </motion.div>
          ))}
        </div>

        {/* Documentation link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Stack
            gap="3"
            style={{
              padding: 'var(--renge-space-5)',
              border: '1px solid var(--renge-color-border-subtle)',
              borderRadius: 'var(--renge-radius-2)',
              background: 'color-mix(in oklch, var(--renge-color-accent) 5%, var(--renge-color-bg))',
              textAlign: 'center',
            }}
          >
            <Text style={{ color: 'var(--renge-color-fg)' }}>
              Need help? Check out the complete reference in the token package.
            </Text>
            <a
              href="https://github.com/anthropics/renge"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                color: 'var(--renge-color-accent)',
                textDecoration: 'none',
                fontSize: 'var(--renge-font-size-sm)',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                transition: 'opacity var(--renge-duration-1) var(--renge-easing-ease-out)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '0.7';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '1';
              }}
            >
              View on GitHub →
            </a>
          </Stack>
        </motion.div>
      </Stack>
    </Section>
  );
}
