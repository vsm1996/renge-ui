import { petals } from '@renge-ui/petals';

export const metadata = {
  title: 'Petals — Renge',
  description: 'Semantic composition patterns for Renge — pre-made combinations of tokens for typography, spacing, cards, and UI patterns.',
};

export default function PetalsPage() {
  return (
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
                      margin: '0 0 var(--renge-space-2) 0',
                    }}>
                      {petal.description}
                    </p>

                    {/* Token Display */}
                    <pre style={{
                      background: 'var(--renge-color-bg)',
                      padding: 'var(--renge-space-2)',
                      borderRadius: 'var(--renge-radius-1)',
                      fontSize: 'var(--renge-font-size-xs)',
                      fontFamily: 'monospace',
                      color: 'var(--renge-color-fg-subtle)',
                      overflow: 'auto',
                      margin: 0,
                    }}>
                      {JSON.stringify(petal.tokens, null, 2)}
                    </pre>
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
  );
}
