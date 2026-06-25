'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Stack, Text, Heading, Section } from '@renge-ui/react';

const PHI = 1.618033988749895;

export function Hero() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Animate the spiral drawing
    const paths = svgRef.current.querySelectorAll('path, circle, line, rect');
    paths.forEach((path, i) => {
      const length = (path as SVGPathElement).getTotalLength?.() ?? 0;
      if (length) {
        (path as SVGPathElement).style.strokeDasharray = `${length}`;
        (path as SVGPathElement).style.strokeDashoffset = `${length}`;
        (path as SVGPathElement).style.animation = `drawPath 2s ease-in-out 0.5s forwards`;
      }
    });

    // Add animation stylesheet
    const style = document.createElement('style');
    style.textContent = `
      @keyframes drawPath {
        to {
          stroke-dashoffset: 0;
        }
      }
      @keyframes softRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Section
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 'var(--renge-space-6)',
        paddingBottom: 'var(--renge-space-6)',
        position: 'relative',
        overflow: 'hidden',
      }}
      id="hero"
    >
      {/* Background PHI rectangle geometry */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 1000 616"
          style={{
            width: '90%',
            maxWidth: '900px',
            opacity: 0.05,
            color: 'var(--renge-color-accent)',
            animation: 'softRotate 120s linear infinite',
          }}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Golden rectangle: 1 : φ */}
          <rect x="100" y="123" width="800" height="370.9" />

          {/* Vertical line dividing golden section */}
          <line x1="570.9" y1="123" x2="570.9" y2="493.9" />

          {/* Nested golden rectangle */}
          <rect x="570.9" y="123" width="229.1" height="141.5" />

          {/* Fibonacci spiral approximation using arcs */}
          <path
            d="M 570.9 123 Q 800 123 800 261.5 Q 800 493.9 570.9 493.9 Q 100 493.9 100 308.4 Q 100 123 320 123 Q 445 123 445 235 Q 445 388 320 388 Q 193 388 193 270"
            strokeLinecap="round"
          />

          {/* Phi ratio annotation points */}
          <circle cx="100" cy="123" r="3" />
          <circle cx="900" cy="123" r="3" />
          <circle cx="100" cy="493.9" r="3" />
          <circle cx="900" cy="493.9" r="3" />
        </svg>
      </div>

      {/* Content */}
      <Stack
        gap="5"
        style={{
          maxWidth: '48rem',
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
        }}
      >
        {/* Animated eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.382, 0, 0.168, 1] }}
        >
          <Text
            size="xs"
            style={{
              color: 'var(--renge-color-accent)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
            }}
          >
            Design System
          </Text>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.382, 0, 0.168, 1], delay: 0.2 }}
        >
          <Heading
            level={1}
            style={{
              fontSize: 'clamp(var(--renge-font-size-3xl), 7vw, var(--renge-font-size-4xl))',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--renge-color-fg)',
            }}
          >
            Proportion as a first principle.
          </Heading>
        </motion.div>

        {/* Subheadline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.382, 0, 0.168, 1], delay: 0.4 }}
        >
          <Text
            size="lg"
            style={{
              color: 'var(--renge-color-fg-subtle)',
              lineHeight: 1.7,
            }}
          >
            Renge is a design system built on natural mathematics. PHI. Fibonacci. The ratios that appear in every living thing.
          </Text>
        </motion.div>

        {/* Ratio callout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Text
            size="sm"
            style={{
              color: 'var(--renge-color-fg-muted)',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.04em',
            }}
          >
            The rectangle above is 1 : {PHI.toFixed(3)}
          </Text>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ paddingTop: 'var(--renge-space-2)' }}
        >
          <a
            href="#philosophy"
            style={{
              display: 'inline-block',
              padding: 'var(--renge-space-3) var(--renge-space-5)',
              borderRadius: 'var(--renge-radius-full)',
              border: '1px solid var(--renge-color-accent)',
              background: 'var(--renge-color-accent)',
              color: 'var(--renge-color-bg)',
              fontSize: 'var(--renge-font-size-sm)',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all var(--renge-duration-2) var(--renge-easing-ease-out)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '0.85';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '1';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            Explore the system →
          </a>
        </motion.div>
      </Stack>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: 'var(--renge-space-5)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--renge-color-fg-muted)" strokeWidth="1.5">
          <path d="M12 5v10M12 19l-4-4M12 19l4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </Section>
  );
}
