'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Stack, Text, Heading, Section } from '@renge-ui/react';
import { useProfile } from '@/components/ui/ProfileToggle';

const SPACING_VALUES = [0, 4, 8, 12, 20, 32, 52, 84, 136, 220, 356];
const TYPE_SIZES = [9.9, 12.6, 16, 25.9, 41.9, 67.8, 109.7, 177.4];
const TYPE_KEYS = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'];
const PHI = 1.618033988749895;

// Parse cubic-bezier string to Framer Motion easing array
const parseCubicBezier = (path: string): [number, number, number, number] => {
  const match = path.match(/cubic-bezier\(([\d.]+),\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\)/);
  if (match) {
    return [parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3]), parseFloat(match[4])];
  }
  return [0.25, 0.1, 0.25, 1]; // fallback to ease-in-out
};

export function TokenShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-200px' });
  const { profile } = useProfile();
  const [hoveredEasing, setHoveredEasing] = useState<string | null>(null);

  const easings = [
    {
      name: 'ease-out',
      path: 'cubic-bezier(0.382, 1, 0.618, 1)',
      description: 'Snap & settle',
    },
    {
      name: 'ease-in',
      path: 'cubic-bezier(0.382, 0, 1, 0.618)',
      description: 'Slow start, fast end',
    },
    {
      name: 'ease-in-out',
      path: 'cubic-bezier(0.382, 0, 0.618, 1)',
      description: 'Inflect at center',
    },
    {
      name: 'spring',
      path: 'cubic-bezier(0.382, 0.618, 0.618, 1.382)',
      description: 'Overshoot ~3.8%',
    },
  ];

  return (
    <Section
      id="tokens"
      style={{
        paddingTop: 'var(--renge-space-7)',
        paddingBottom: 'var(--renge-space-7)',
        background: 'var(--renge-color-bg-subtle)',
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
          <Stack gap="3" style={{ maxWidth: '48rem' }}>
            <Text
              size="sm"
              style={{
                color: 'var(--renge-color-accent)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-body)',
              }}
            >
              The system
            </Text>
            <Heading level={2} style={{ fontSize: 'var(--renge-font-size-3xl)', letterSpacing: '-0.02em' }}>
              Every token, visible.
            </Heading>
          </Stack>
        </motion.div>

        {/* Spacing scale */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Stack
            gap="4"
            style={{
              padding: 'var(--renge-space-5)',
              border: '1px solid var(--renge-color-border-subtle)',
              borderRadius: 'var(--renge-radius-3)',
              background: 'var(--renge-color-bg)',
            }}
          >
            <Stack gap="2">
              <Heading level={3} style={{ fontSize: 'var(--renge-font-size-lg)' }}>
                Spacing Scale
              </Heading>
              <Text size="sm" style={{ color: 'var(--renge-color-fg-muted)' }}>
                Fibonacci × 4px. Each step is proportionally inevitable.
              </Text>
            </Stack>

            <div style={{ display: 'flex', gap: 'var(--renge-space-2)', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              {SPACING_VALUES.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, height: 0 }}
                  animate={inView ? { opacity: 1, height: 'auto' } : {}}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--renge-space-2)' }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: `${Math.max(value, 4)}px`,
                      borderRadius: 'var(--renge-radius-1)',
                      background: 'var(--renge-color-accent)',
                      opacity: 0.6 + (i / SPACING_VALUES.length) * 0.4,
                      minWidth: '20px',
                    }}
                  />
                  <Text
                    size="xs"
                    style={{
                      color: 'var(--renge-color-fg-muted)',
                      writingMode: 'horizontal-tb',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {value}px
                  </Text>
                </motion.div>
              ))}
            </div>
          </Stack>
        </motion.div>

        {/* Typography scale */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Stack
            gap="4"
            style={{
              padding: 'var(--renge-space-5)',
              border: '1px solid var(--renge-color-border-subtle)',
              borderRadius: 'var(--renge-radius-3)',
              background: 'var(--renge-color-bg)',
            }}
          >
            <Stack gap="2">
              <Heading level={3} style={{ fontSize: 'var(--renge-font-size-lg)' }}>
                Typography Scale
              </Heading>
              <Text size="sm" style={{ color: 'var(--renge-color-fg-muted)' }}>
                16 × φⁿ. Each step is exactly {PHI.toFixed(3)} times the previous.
              </Text>
            </Stack>

            <Stack gap="3">
              {TYPE_KEYS.map((key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                >
                  <Stack gap="1" direction="horizontal" align="start">
                    <Text
                      size="xs"
                      style={{
                        color: 'var(--renge-color-fg-muted)',
                        fontFamily: 'var(--font-body)',
                        minWidth: '32px',
                        paddingTop: '2px',
                      }}
                    >
                      {key}
                    </Text>
                    <Stack gap="1" style={{ flex: 1 }}>
                      <div style={{ fontSize: `var(--renge-font-size-${key})`, lineHeight: 1.5, color: 'var(--renge-color-fg)' }}>
                        The proportions of nature made visible.
                      </div>
                      <Text
                        size="xs"
                        style={{
                          color: 'var(--renge-color-fg-muted)',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {TYPE_SIZES[i].toFixed(1)}px
                      </Text>
                    </Stack>
                  </Stack>
                </motion.div>
              ))}
            </Stack>
          </Stack>
        </motion.div>

        {/* Motion / Easing curves */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Stack
            gap="4"
            style={{
              padding: 'var(--renge-space-5)',
              border: '1px solid var(--renge-color-border-subtle)',
              borderRadius: 'var(--renge-radius-3)',
              background: 'var(--renge-color-bg)',
            }}
          >
            <Stack gap="2">
              <Heading level={3} style={{ fontSize: 'var(--renge-font-size-lg)' }}>
                Motion Easing
              </Heading>
              <Text size="sm" style={{ color: 'var(--renge-color-fg-muted)' }}>
                Control points derived from φ: 1/φ² (0.382) and 1/φ (0.618). Hover to see each curve in action.
              </Text>
            </Stack>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--renge-space-4)' }}>
              {easings.map((easing) => (
                <motion.div
                  key={easing.name}
                  onHoverStart={() => setHoveredEasing(easing.name)}
                  onHoverEnd={() => setHoveredEasing(null)}
                  style={{
                    padding: 'var(--renge-space-3)',
                    borderRadius: 'var(--renge-radius-2)',
                    background: hoveredEasing === easing.name ? 'var(--renge-color-bg-subtle)' : 'transparent',
                    border: `3px solid ${hoveredEasing === easing.name ? 'var(--renge-color-border-focus)' : 'transparent'}`,
                    outline: hoveredEasing === easing.name ? `2px dashed var(--renge-color-accent)` : 'none',
                    transition: 'all var(--renge-duration-1) var(--renge-easing-ease-out)',
                  }}
                >
                  <Stack gap="3">
                    <Stack gap="1">
                      <Text size="sm" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                        {easing.name}
                      </Text>
                      <Text size="xs" style={{ color: 'var(--renge-color-fg-muted)' }}>
                        {easing.description}
                      </Text>
                    </Stack>

                    {/* Demo box */}
                    <div style={{ height: '40px', background: 'var(--renge-color-bg-subtle)', borderRadius: 'var(--renge-radius-1)', position: 'relative', overflow: 'hidden' }}>
                      {hoveredEasing === easing.name && (
                        <motion.div
                          layoutId="easing-demo"
                          initial={{ left: '0%' }}
                          animate={{ left: '100%' }}
                          transition={{
                            duration: 1.5,
                            ease: parseCubicBezier(easing.path),
                            repeat: Infinity,
                            repeatType: 'mirror',
                          }}
                          style={{
                            position: 'absolute',
                            width: 'var(--renge-space-2)',
                            height: '100%',
                            background: 'var(--renge-color-accent)',
                            borderRadius: 'var(--renge-radius-1)',
                            top: 0,
                            left: 0,
                          }}
                        />
                      )}
                    </div>

                    <Text size="xs" style={{ fontFamily: 'monospace', color: 'var(--renge-color-fg-muted)', fontSize: '10px' }}>
                      {easing.path}
                    </Text>
                  </Stack>
                </motion.div>
              ))}
            </div>
          </Stack>
        </motion.div>
      </Stack>
    </Section>
  );
}
