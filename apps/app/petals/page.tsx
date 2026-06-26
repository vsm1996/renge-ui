'use client';

import { petals } from '@renge-ui/petals';
import { ProfileProvider } from '@/components/ui/ProfileToggle';
import { Nav } from '@/components/ui/Nav';

function PetalPreview({ categoryName, petalName, petal }: { categoryName: string; petalName: string; petal: any }) {
  const tokens = petal.tokens;

  // Typography preview
  if (categoryName === 'typography') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
        <div style={{
          ...tokens,
          overflow: 'hidden',
          wordBreak: 'break-word',
          hyphens: 'auto'
        } as any}>
          The quick brown fox
        </div>
        <pre style={{
          background: 'var(--renge-color-bg)',
          padding: 'var(--renge-space-2)',
          borderRadius: 'var(--renge-radius-1)',
          fontSize: 'var(--renge-font-size-xs)',
          fontFamily: 'monospace',
          color: 'var(--renge-color-fg-subtle)',
          margin: 0,
          overflow: 'auto',
        }}>
          {JSON.stringify(tokens, null, 2)}
        </pre>
      </div>
    );
  }

  // Spacing preview
  if (categoryName === 'spacing') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
        <div style={{
          background: 'var(--renge-color-accent)',
          opacity: 0.2,
          borderRadius: 'var(--renge-radius-1)',
          ...tokens
        } as any}>
          <div style={{ color: 'var(--renge-color-fg-subtle)', fontSize: 'var(--renge-font-size-xs)' }}>
            Item 1
          </div>
          <div style={{ color: 'var(--renge-color-fg-subtle)', fontSize: 'var(--renge-font-size-xs)' }}>
            Item 2
          </div>
        </div>
        <pre style={{
          background: 'var(--renge-color-bg)',
          padding: 'var(--renge-space-2)',
          borderRadius: 'var(--renge-radius-1)',
          fontSize: 'var(--renge-font-size-xs)',
          fontFamily: 'monospace',
          color: 'var(--renge-color-fg-subtle)',
          margin: 0,
          overflow: 'auto',
        }}>
          {JSON.stringify(tokens, null, 2)}
        </pre>
      </div>
    );
  }

  // Cards preview
  if (categoryName === 'cards') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
        <div style={{
          background: 'var(--renge-color-bg-subtle)',
          ...tokens
        } as any}>
          <div style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg)', marginBottom: 'var(--renge-space-2)' }}>
            Card Title
          </div>
          <div style={{ fontSize: 'var(--renge-font-size-xs)', color: 'var(--renge-color-fg-muted)' }}>
            This is a card with the {petalName} surface styling.
          </div>
        </div>
        <pre style={{
          background: 'var(--renge-color-bg)',
          padding: 'var(--renge-space-2)',
          borderRadius: 'var(--renge-radius-1)',
          fontSize: 'var(--renge-font-size-xs)',
          fontFamily: 'monospace',
          color: 'var(--renge-color-fg-subtle)',
          margin: 0,
          overflow: 'auto',
        }}>
          {JSON.stringify(tokens, null, 2)}
        </pre>
      </div>
    );
  }

  // Interactive preview (buttons & focus)
  if (categoryName === 'interactive') {
    if (petalName === 'focus') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <div style={{
            width: '100%',
            height: '40px',
            background: 'var(--renge-color-bg-subtle)',
            ...tokens
          } as any} />
          <pre style={{
            background: 'var(--renge-color-bg)',
            padding: 'var(--renge-space-2)',
            borderRadius: 'var(--renge-radius-1)',
            fontSize: 'var(--renge-font-size-xs)',
            fontFamily: 'monospace',
            color: 'var(--renge-color-fg-subtle)',
            margin: 0,
            overflow: 'auto',
          }}>
            {JSON.stringify(tokens, null, 2)}
          </pre>
        </div>
      );
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
        <button style={{
          background: 'var(--renge-color-accent)',
          color: 'var(--renge-color-bg)',
          border: 'none',
          cursor: 'pointer',
          fontSize: 'var(--renge-font-size-sm)',
          ...tokens
        } as any}>
          {petal.label}
        </button>
        <pre style={{
          background: 'var(--renge-color-bg)',
          padding: 'var(--renge-space-2)',
          borderRadius: 'var(--renge-radius-1)',
          fontSize: 'var(--renge-font-size-xs)',
          fontFamily: 'monospace',
          color: 'var(--renge-color-fg-subtle)',
          margin: 0,
          overflow: 'auto',
        }}>
          {JSON.stringify(tokens, null, 2)}
        </pre>
      </div>
    );
  }

  // Compositions preview
  if (categoryName === 'compositions') {
    if (petalName === 'textField') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <input type="text" placeholder="Input field" style={{
            width: '100%',
            color: 'var(--renge-color-fg)',
            background: 'var(--renge-color-bg-subtle)',
            ...tokens
          } as any} />
          <pre style={{
            background: 'var(--renge-color-bg)',
            padding: 'var(--renge-space-2)',
            borderRadius: 'var(--renge-radius-1)',
            fontSize: 'var(--renge-font-size-xs)',
            fontFamily: 'monospace',
            color: 'var(--renge-color-fg-subtle)',
            margin: 0,
            overflow: 'auto',
          }}>
            {JSON.stringify(tokens, null, 2)}
          </pre>
        </div>
      );
    }
    if (petalName === 'badge') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <span style={{
            display: 'inline-block',
            background: 'var(--renge-color-accent)',
            color: 'var(--renge-color-bg)',
            ...tokens
          } as any}>
            Badge
          </span>
          <pre style={{
            background: 'var(--renge-color-bg)',
            padding: 'var(--renge-space-2)',
            borderRadius: 'var(--renge-radius-1)',
            fontSize: 'var(--renge-font-size-xs)',
            fontFamily: 'monospace',
            color: 'var(--renge-color-fg-subtle)',
            margin: 0,
            overflow: 'auto',
          }}>
            {JSON.stringify(tokens, null, 2)}
          </pre>
        </div>
      );
    }
    if (petalName === 'chip') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--renge-space-1)',
            background: 'var(--renge-color-accent)',
            color: 'var(--renge-color-bg)',
            ...tokens
          } as any}>
            Chip ×
          </div>
          <pre style={{
            background: 'var(--renge-color-bg)',
            padding: 'var(--renge-space-2)',
            borderRadius: 'var(--renge-radius-1)',
            fontSize: 'var(--renge-font-size-xs)',
            fontFamily: 'monospace',
            color: 'var(--renge-color-fg-subtle)',
            margin: 0,
            overflow: 'auto',
          }}>
            {JSON.stringify(tokens, null, 2)}
          </pre>
        </div>
      );
    }
  }

  // Fallback
  return (
    <pre style={{
      background: 'var(--renge-color-bg)',
      padding: 'var(--renge-space-2)',
      borderRadius: 'var(--renge-radius-1)',
      fontSize: 'var(--renge-font-size-xs)',
      fontFamily: 'monospace',
      color: 'var(--renge-color-fg-subtle)',
      margin: 0,
      overflow: 'auto',
    }}>
      {JSON.stringify(tokens, null, 2)}
    </pre>
  );
}

export default function PetalsPage() {
  return (
    <ProfileProvider>
      <Nav />
      <main style={{ padding: 'var(--renge-space-8) var(--renge-space-4)' }}>
      <section style={{ maxWidth: 'var(--renge-container-lg)', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 'var(--renge-space-8)' }}>
          <h1 style={{
            fontSize: 'var(--renge-font-size-4xl)',
            lineHeight: 'var(--renge-line-height-4xl)',
            color: 'var(--renge-color-fg)',
            marginBottom: 'var(--renge-space-3)',
          }}>
            Petals
          </h1>
          <p style={{
            fontSize: 'var(--renge-font-size-lg)',
            lineHeight: 'var(--renge-line-height-lg)',
            color: 'var(--renge-color-fg-muted)',
            maxWidth: '60ch',
            margin: 0,
          }}>
            Semantic composition patterns for Renge. Pre-made combinations of tokens for typography, spacing, cards, and UI patterns — bridging tokens and components without prescribing logic.
          </p>
        </div>

        {/* Why Petals */}
        <div style={{ marginBottom: 'var(--renge-space-8)' }}>
          <h2 style={{
            fontSize: 'var(--renge-font-size-2xl)',
            lineHeight: 'var(--renge-line-height-2xl)',
            color: 'var(--renge-color-fg)',
            marginBottom: 'var(--renge-space-4)',
          }}>
            Why Petals?
          </h2>
          <p style={{ fontSize: 'var(--renge-font-size-base)', lineHeight: 'var(--renge-line-height-base)', marginBottom: 'var(--renge-space-3)', fontStyle: 'italic', color: 'var(--renge-color-accent)' }}>
            "Every lotus blooms one petal at a time. These are Renge's. Pre-composed token combinations that sit between the math and the markup."
          </p>
          <p style={{ fontSize: 'var(--renge-font-size-base)', lineHeight: 'var(--renge-line-height-base)', marginBottom: 'var(--renge-space-2)' }}>
            Renge tokens are orthogonal — each scale (spacing, color, typography) stands alone. This is powerful for fine-grained control, but consumers often compose the same token combinations repeatedly.
          </p>
          <p style={{ fontSize: 'var(--renge-font-size-base)', lineHeight: 'var(--renge-line-height-base)', fontStyle: 'italic', color: 'var(--renge-color-fg-subtle)', margin: 0 }}>
            Petals bridge that gap — semantic patterns that apply proven combinations while maintaining design consistency.
          </p>
        </div>

        {/* Categories */}
        <div>
          {Object.entries(petals).map(([categoryName, categoryPetals]) => (
            <div key={categoryName} style={{ marginBottom: 'var(--renge-space-6)' }}>
              <h2 style={{
                fontSize: 'var(--renge-font-size-xl)',
                lineHeight: 'var(--renge-line-height-xl)',
                color: 'var(--renge-color-accent)',
                textTransform: 'capitalize',
                marginBottom: 'var(--renge-space-3)',
              }}>
                {categoryName}
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--renge-space-4)',
              }}>
                {Object.entries(categoryPetals).map(([petalName, petal]) => (
                  <div
                    key={petalName}
                    style={{
                      padding: 'var(--renge-space-4)',
                      borderRadius: 'var(--renge-radius-3)',
                      border: '1px solid var(--renge-color-border-subtle)',
                      background: 'color-mix(in oklch, var(--renge-color-bg) 98%, var(--renge-color-accent))',
                    }}
                  >
                    <h3 style={{
                      fontSize: 'var(--renge-font-size-base)',
                      fontWeight: 600,
                      color: 'var(--renge-color-fg)',
                      marginTop: 0,
                      marginBottom: 'var(--renge-space-2)',
                    }}>
                      {petal.label}
                    </h3>
                    <p style={{
                      fontSize: 'var(--renge-font-size-sm)',
                      lineHeight: 'var(--renge-line-height-sm)',
                      color: 'var(--renge-color-fg-muted)',
                      margin: '0 0 var(--renge-space-3) 0',
                    }}>
                      {petal.description}
                    </p>

                    {/* Visual Preview */}
                    <div style={{
                      marginBottom: 'var(--renge-space-3)',
                      padding: 'var(--renge-space-3)',
                      background: 'var(--renge-color-bg)',
                      borderRadius: 'var(--renge-radius-2)',
                    }}>
                      <PetalPreview categoryName={categoryName} petalName={petalName} petal={petal} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Usage */}
        <div style={{ marginTop: 'var(--renge-space-8)' }}>
          <h2 style={{
            fontSize: 'var(--renge-font-size-2xl)',
            lineHeight: 'var(--renge-line-height-2xl)',
            color: 'var(--renge-color-fg)',
            marginBottom: 'var(--renge-space-4)',
          }}>
            Usage
          </h2>

          <pre style={{ background: 'var(--renge-color-bg-subtle)', padding: 'var(--renge-space-4)', borderRadius: 'var(--renge-radius-2)', overflow: 'auto' }}>
{`import { petals } from '@renge-ui/petals';

// Apply typography petal
const heading = petals.typography.displayLarge.tokens;
// { fontSize: 'var(--renge-font-size-4xl)', ... }

// Combine multiple petals
const styles = {
  ...petals.typography.headingMedium.tokens,
  ...petals.spacing.comfortable.tokens,
  color: 'var(--renge-color-accent)',
};`}
          </pre>

          <p style={{ fontSize: 'var(--renge-font-size-base)', lineHeight: 'var(--renge-line-height-base)' }}>
            Petals are framework-agnostic — pure CSS custom properties. Use them in any framework: React, Vue, Svelte, vanilla CSS, Tailwind, or component libraries.
          </p>
        </div>

        {/* Philosophy */}
        <div style={{ marginTop: 'var(--renge-space-8)' }}>
          <h2 style={{
            fontSize: 'var(--renge-font-size-2xl)',
            lineHeight: 'var(--renge-line-height-2xl)',
            color: 'var(--renge-color-fg)',
            marginBottom: 'var(--renge-space-3)',
          }}>
            Philosophy
          </h2>
          <p style={{ fontSize: 'var(--renge-font-size-base)', lineHeight: 'var(--renge-line-height-base)' }}>
            Petals are <strong>not</strong> components. They:
          </p>
          <ul style={{ fontSize: 'var(--renge-font-size-base)', lineHeight: 'var(--renge-line-height-base)', paddingLeft: 'var(--renge-space-4)' }}>
            <li>✓ Compose tokens into semantic patterns</li>
            <li>✓ Stay framework-agnostic (CSS custom properties)</li>
            <li>✓ Enable consistent token combinations</li>
            <li>✓ Document common patterns</li>
            <li>✗ Include component logic or markup</li>
            <li>✗ Prescribe HTML structure</li>
            <li>✗ Create new colors or spacing values</li>
          </ul>
        </div>
      </section>
      </main>
    </ProfileProvider>
  );
}
