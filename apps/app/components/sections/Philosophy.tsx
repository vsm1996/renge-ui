'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Stack, Text, Heading, Section } from '@renge-ui/react';

const PHI = 1.618033988749895;
const GOLDEN_ANGLE = 360 / (PHI * PHI);

function CountUp({ target, duration = 2 }: { target: number; duration?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const raf = requestAnimationFrame(function tick() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      setValue(Math.round(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return (
    <span
      ref={ref}
      aria-live="polite"
      aria-label={`${target}`}
      role="status"
    >
      {value}
    </span>
  );
}

export function Philosophy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-200px' });

  return (
    <Section
      id="philosophy"
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
          transition={{ duration: 0.8, ease: [0.382, 0, 0.618, 1] }}
        >
          <Stack gap="3" style={{ maxWidth: '48rem' }}>
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
              The foundation
            </Text>
            <Heading level={2} style={{ fontSize: 'var(--renge-font-size-3xl)', letterSpacing: '-0.02em' }}>
              Why natural mathematics?
            </Heading>
            <Text style={{ color: 'var(--renge-color-fg-subtle)', lineHeight: 1.7 }}>
              Three principles from nature, made visible in every design decision.
            </Text>
          </Stack>
        </motion.div>

        {/* Three columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--renge-space-6)',
            alignItems: 'start',
          }}
        >
          {/* PHI */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.382, 0, 0.618, 1] }}
          >
            <Stack
              gap="4"
              style={{
                padding: 'var(--renge-space-5)',
                border: '1px solid var(--renge-color-border-subtle)',
                borderRadius: 'var(--renge-radius-2)',
                background: 'var(--renge-color-bg-subtle)',
              }}
            >
              {/* Visualization: golden rectangle */}
              <svg viewBox="0 0 200 124" width="100%" height="120" fill="none" stroke="var(--renge-color-accent)" strokeWidth="2" aria-hidden="true">
                <rect x="0" y="0" width="200" height="124" opacity="0.2" />
                <line x1="123" y1="0" x2="123" y2="124" opacity="0.5" />
                <rect x="123" y="0" width="77" height="48" opacity="0.4" />
                <text x="50" y="70" fontSize="12" fill="var(--renge-color-accent)" textAnchor="middle">
                  1 : {PHI.toFixed(2)}
                </text>
              </svg>

              <Stack gap="2">
                <Heading level={3} style={{ fontSize: 'var(--renge-font-size-2xl)', color: 'var(--renge-color-accent)' }}>
                  <CountUp target={1618} duration={2} /> / 1000
                </Heading>
                <Text size="sm" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                  The Golden Ratio
                </Text>
              </Stack>

              <Text size="sm" style={{ color: 'var(--renge-color-fg-subtle)', lineHeight: 1.7 }}>
                φ appears in nautilus shells, spiral galaxies, the spiral of plant growth. The ratio that emerges when you demand that a ratio relate its parts in the same proportion as the whole relates to the larger part.
              </Text>

              <Stack gap="2" direction="horizontal" style={{ paddingTop: 'var(--renge-space-2)' }}>
                <Text size="xs" style={{ color: 'var(--renge-color-fg-muted)', fontFamily: 'var(--font-body)' }}>
                  Used for:
                </Text>
                <Stack gap="1" direction="horizontal" style={{ flexWrap: 'wrap' }}>
                  {['Typography', 'Containers', 'Easings'].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 'var(--renge-font-size-xs)',
                        padding: 'var(--renge-space-1) var(--renge-space-2)',
                        borderRadius: 'var(--renge-radius-1)',
                        background: 'color-mix(in oklch, var(--renge-color-accent) 15%, transparent)',
                        color: 'var(--renge-color-accent)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </motion.div>

          {/* Fibonacci */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.382, 0, 0.618, 1] }}
          >
            <Stack
              gap="4"
              style={{
                padding: 'var(--renge-space-5)',
                border: '1px solid var(--renge-color-border-subtle)',
                borderRadius: 'var(--renge-radius-2)',
                background: 'var(--renge-color-bg-subtle)',
              }}
            >
              {/* Visualization: Fibonacci boxes */}
              <svg viewBox="0 0 200 124" width="100%" height="120" fill="none" stroke="var(--renge-color-accent)" strokeWidth="2" aria-hidden="true">
                <rect x="0" y="96" width="28" height="28" />
                <rect x="28" y="68" width="44" height="56" />
                <rect x="72" y="24" width="72" height="100" />
                <rect x="0" y="24" width="72" height="44" />
                <rect x="0" y="0" width="44" height="24" />
                <rect x="44" y="0" width="28" height="24" />
                <text x="100" y="70" fontSize="14" fill="var(--renge-color-accent)" textAnchor="middle" fontWeight="500">
                  1 2 3 5 8…
                </text>
              </svg>

              <Stack gap="2">
                <Heading level={3} style={{ fontSize: 'var(--renge-font-size-2xl)', color: 'var(--renge-color-accent)' }}>
                  <CountUp target={10} duration={2} /> steps
                </Heading>
                <Text size="sm" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                  Fibonacci Sequence
                </Text>
              </Stack>

              <Text size="sm" style={{ color: 'var(--renge-color-fg-subtle)', lineHeight: 1.7 }}>
                Each step is the sum of the two previous. 1+1=2, 1+2=3, 2+3=5, 3+5=8. The ratio between consecutive steps approaches φ as the sequence grows.
              </Text>

              <Stack gap="2" direction="horizontal" style={{ paddingTop: 'var(--renge-space-2)' }}>
                <Text size="xs" style={{ color: 'var(--renge-color-fg-muted)', fontFamily: 'var(--font-body)' }}>
                  Used for:
                </Text>
                <Stack gap="1" direction="horizontal" style={{ flexWrap: 'wrap' }}>
                  {['Spacing', 'Radius', 'Duration'].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 'var(--renge-font-size-xs)',
                        padding: 'var(--renge-space-1) var(--renge-space-2)',
                        borderRadius: 'var(--renge-radius-1)',
                        background: 'color-mix(in oklch, var(--renge-color-accent) 15%, transparent)',
                        color: 'var(--renge-color-accent)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </motion.div>

          {/* Phyllotaxis */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.382, 0, 0.618, 1] }}
          >
            <Stack
              gap="4"
              style={{
                padding: 'var(--renge-space-5)',
                border: '1px solid var(--renge-color-border-subtle)',
                borderRadius: 'var(--renge-radius-2)',
                background: 'var(--renge-color-bg-subtle)',
              }}
            >
              {/* Visualization: phyllotaxis spiral */}
              <svg viewBox="0 0 120 120" width="100%" height="120" fill="none" stroke="var(--renge-color-accent)" aria-hidden="true">
                {Array.from({ length: 21 }, (_, n) => {
                  const r = 9.5 * Math.sqrt(n + 1);
                  const theta = (n * GOLDEN_ANGLE * Math.PI) / 180;
                  const x = 60 + r * Math.cos(theta);
                  const y = 60 + r * Math.sin(theta);
                  return (
                    <circle key={n} cx={x} cy={y} r="1.5" fill="var(--renge-color-accent)" opacity={0.4 + (n / 21) * 0.6} />
                  );
                })}
              </svg>

              <Stack gap="2">
                <Heading level={3} style={{ fontSize: 'var(--renge-font-size-2xl)', color: 'var(--renge-color-accent)' }}>
                  <CountUp target={137} duration={2} />.<CountUp target={5} duration={2} />°
                </Heading>
                <Text size="sm" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                  Golden Angle
                </Text>
              </Stack>

              <Text size="sm" style={{ color: 'var(--renge-color-fg-subtle)', lineHeight: 1.7 }}>
                The angle between successive leaves on a plant stem. Nature's solution to maximal sunlight exposure without overlap. Derived from φ.
              </Text>

              <Stack gap="2" direction="horizontal" style={{ paddingTop: 'var(--renge-space-2)' }}>
                <Text size="xs" style={{ color: 'var(--renge-color-fg-muted)', fontFamily: 'var(--font-body)' }}>
                  Used for:
                </Text>
                <Stack gap="1" direction="horizontal" style={{ flexWrap: 'wrap' }}>
                  {['Grid', 'Layout', 'Proportion'].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 'var(--renge-font-size-xs)',
                        padding: 'var(--renge-space-1) var(--renge-space-2)',
                        borderRadius: 'var(--renge-radius-1)',
                        background: 'color-mix(in oklch, var(--renge-color-accent) 15%, transparent)',
                        color: 'var(--renge-color-accent)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </motion.div>
        </div>
      </Stack>
    </Section>
  );
}
