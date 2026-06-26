'use client';

import { useState } from 'react';
import { ProfileProvider } from '@/components/ui/ProfileToggle';
import { Nav } from '@/components/ui/Nav';

export default function ComponentsPage() {
  const [comboboxValue, setComboboxValue] = useState('');
  const [multiSelectValues, setMultiSelectValues] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [numberValue, setNumberValue] = useState(5);
  const [dateValue, setDateValue] = useState('2026-06-26');
  const [rating, setRating] = useState(0);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const multiSelectOptions = [
    { label: 'Design', value: 'design' },
    { label: 'Development', value: 'dev' },
    { label: 'Testing', value: 'test' },
    { label: 'Documentation', value: 'docs' },
  ];

  const steps = [
    { label: 'Setup', description: 'Configure your profile' },
    { label: 'Tokens', description: 'Explore the design tokens' },
    { label: 'Components', description: 'Build with components' },
    { label: 'Deploy', description: 'Ship your project' },
  ];

  return (
    <ProfileProvider>
      <Nav />
      <div style={{ minHeight: '100vh', background: 'var(--renge-color-bg)', color: 'var(--renge-color-fg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--renge-space-8)' }}>
          <h1 style={{ fontSize: 'var(--renge-font-size-4xl)', fontWeight: 'bold', marginBottom: 'var(--renge-space-6)' }}>
            Components
          </h1>

          <div style={{ marginBottom: 'var(--renge-space-8)' }}>
            <p style={{ fontSize: 'var(--renge-font-size-base)', marginBottom: 'var(--renge-space-4)', color: 'var(--renge-color-fg-subtle)' }}>
              60+ component primitives, all consuming Renge tokens. Each component uses inline styles with CSS custom properties — no class names, no CSS-in-JS runtime.
            </p>
          </div>

          {/* Input & Selection */}
          <section style={{ marginBottom: 'var(--renge-space-12)' }}>
            <h2 style={{ fontSize: 'var(--renge-font-size-2xl)', fontWeight: 600, marginBottom: 'var(--renge-space-4)' }}>Input & Selection</h2>

            {/* Combobox */}
            <div style={{ marginBottom: 'var(--renge-space-8)', padding: 'var(--renge-space-4)', background: 'var(--renge-color-bg-subtle)', borderRadius: 'var(--renge-radius-3)' }}>
              <h3 style={{ fontSize: 'var(--renge-font-size-lg)', fontWeight: 600, marginBottom: 'var(--renge-space-3)' }}>Combobox</h3>
              <p style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-muted)', marginBottom: 'var(--renge-space-4)' }}>
                Searchable dropdown with filtering.
              </p>
              <input
                type="text"
                placeholder="Search frameworks..."
                value={comboboxValue}
                onChange={(e) => setComboboxValue(e.target.value)}
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  padding: 'var(--renge-space-2) var(--renge-space-3)',
                  border: '1px solid var(--renge-color-border)',
                  borderRadius: 'var(--renge-radius-2)',
                  backgroundColor: 'var(--renge-color-bg)',
                  color: 'var(--renge-color-fg)',
                  marginBottom: 'var(--renge-space-4)',
                }}
              />
            </div>

            {/* MultiSelect */}
            <div style={{ marginBottom: 'var(--renge-space-8)', padding: 'var(--renge-space-4)', background: 'var(--renge-color-bg-subtle)', borderRadius: 'var(--renge-radius-3)' }}>
              <h3 style={{ fontSize: 'var(--renge-font-size-lg)', fontWeight: 600, marginBottom: 'var(--renge-space-3)' }}>MultiSelect</h3>
              <p style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-muted)', marginBottom: 'var(--renge-space-4)' }}>
                Select multiple values.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--renge-space-2)' }}>
                {multiSelectOptions.map((opt) => (
                  <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--renge-space-2)', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={multiSelectValues.includes(opt.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setMultiSelectValues([...multiSelectValues, opt.value]);
                        } else {
                          setMultiSelectValues(multiSelectValues.filter((v) => v !== opt.value));
                        }
                      }}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* TagInput */}
            <div style={{ marginBottom: 'var(--renge-space-8)', padding: 'var(--renge-space-4)', background: 'var(--renge-color-bg-subtle)', borderRadius: 'var(--renge-radius-3)' }}>
              <h3 style={{ fontSize: 'var(--renge-font-size-lg)', fontWeight: 600, marginBottom: 'var(--renge-space-3)' }}>TagInput</h3>
              <p style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-muted)', marginBottom: 'var(--renge-space-4)' }}>
                Add/remove tags. Press Enter to add.
              </p>
              <div style={{ padding: 'var(--renge-space-2)', border: '1px solid var(--renge-color-border)', borderRadius: 'var(--renge-radius-2)', background: 'var(--renge-color-bg)', display: 'flex', flexWrap: 'wrap', gap: 'var(--renge-space-2)', maxWidth: '400px' }}>
                {tags.map((tag) => (
                  <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--renge-space-1)', background: 'var(--renge-color-accent)', color: 'var(--renge-color-bg)', padding: 'var(--renge-space-1) var(--renge-space-2)', borderRadius: 'var(--renge-radius-1)', fontSize: 'var(--renge-font-size-sm)' }}>
                    {tag}
                    <button type="button" onClick={() => setTags(tags.filter((t) => t !== tag))} style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}>×</button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Add tags..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.currentTarget as HTMLInputElement).value) {
                      const value = (e.currentTarget as HTMLInputElement).value.trim();
                      if (!tags.includes(value)) {
                        setTags([...tags, value]);
                        (e.currentTarget as HTMLInputElement).value = '';
                      }
                    }
                  }}
                  style={{ flex: 1, minWidth: '100px', border: 'none', background: 'transparent', outline: 'none', color: 'var(--renge-color-fg)' }}
                />
              </div>
            </div>

            {/* NumberInput */}
            <div style={{ marginBottom: 'var(--renge-space-8)', padding: 'var(--renge-space-4)', background: 'var(--renge-color-bg-subtle)', borderRadius: 'var(--renge-radius-3)' }}>
              <h3 style={{ fontSize: 'var(--renge-font-size-lg)', fontWeight: 600, marginBottom: 'var(--renge-space-3)' }}>NumberInput</h3>
              <p style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-muted)', marginBottom: 'var(--renge-space-4)' }}>
                Number input with increment/decrement.
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'stretch', border: '1px solid var(--renge-color-border)', borderRadius: 'var(--renge-radius-2)' }}>
                <button type="button" onClick={() => setNumberValue(Math.max(0, numberValue - 1))} style={{ padding: 'var(--renge-space-2)', background: 'var(--renge-color-bg)', border: 'none', cursor: 'pointer', color: 'var(--renge-color-fg)' }}>−</button>
                <input type="number" value={numberValue} onChange={(e) => setNumberValue(parseInt(e.target.value) || 0)} style={{ padding: 'var(--renge-space-2) var(--renge-space-3)', border: 'none', background: 'var(--renge-color-bg)', color: 'var(--renge-color-fg)', textAlign: 'center', minWidth: '80px' }} />
                <button type="button" onClick={() => setNumberValue(numberValue + 1)} style={{ padding: 'var(--renge-space-2)', background: 'var(--renge-color-bg)', border: 'none', cursor: 'pointer', color: 'var(--renge-color-fg)' }}>+</button>
              </div>
            </div>

            {/* DatePicker */}
            <div style={{ marginBottom: 'var(--renge-space-8)', padding: 'var(--renge-space-4)', background: 'var(--renge-color-bg-subtle)', borderRadius: 'var(--renge-radius-3)' }}>
              <h3 style={{ fontSize: 'var(--renge-font-size-lg)', fontWeight: 600, marginBottom: 'var(--renge-space-3)' }}>DatePicker</h3>
              <p style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-muted)', marginBottom: 'var(--renge-space-4)' }}>
                Calendar-based date picker.
              </p>
              <input type="date" value={dateValue} onChange={(e) => setDateValue(e.target.value)} style={{ padding: 'var(--renge-space-2) var(--renge-space-3)', border: '1px solid var(--renge-color-border)', borderRadius: 'var(--renge-radius-2)', background: 'var(--renge-color-bg)', color: 'var(--renge-color-fg)' }} />
            </div>
          </section>

          {/* Popovers & Menus */}
          <section style={{ marginBottom: 'var(--renge-space-12)' }}>
            <h2 style={{ fontSize: 'var(--renge-font-size-2xl)', fontWeight: 600, marginBottom: 'var(--renge-space-4)' }}>Popovers & Menus</h2>

            <div style={{ marginBottom: 'var(--renge-space-8)', padding: 'var(--renge-space-4)', background: 'var(--renge-color-bg-subtle)', borderRadius: 'var(--renge-radius-3)' }}>
              <h3 style={{ fontSize: 'var(--renge-font-size-lg)', fontWeight: 600, marginBottom: 'var(--renge-space-3)' }}>Popover</h3>
              <p style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-muted)', marginBottom: 'var(--renge-space-4)' }}>
                Positioned floating content. Richer than Tooltip.
              </p>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <button onClick={() => setPopoverOpen(!popoverOpen)} style={{ padding: 'var(--renge-space-2) var(--renge-space-3)', background: 'var(--renge-color-accent)', color: 'var(--renge-color-bg)', border: 'none', borderRadius: 'var(--renge-radius-2)', cursor: 'pointer', fontWeight: 500 }}>Open</button>
                {popoverOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 'var(--renge-space-2)', background: 'var(--renge-color-bg)', border: '1px solid var(--renge-color-border-subtle)', borderRadius: 'var(--renge-radius-2)', padding: 'var(--renge-space-4)', minWidth: '200px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', zIndex: 50 }}>
                    <p style={{ margin: 0, fontSize: 'var(--renge-font-size-sm)' }}>Popover content</p>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginBottom: 'var(--renge-space-8)', padding: 'var(--renge-space-4)', background: 'var(--renge-color-bg-subtle)', borderRadius: 'var(--renge-radius-3)' }}>
              <h3 style={{ fontSize: 'var(--renge-font-size-lg)', fontWeight: 600, marginBottom: 'var(--renge-space-3)' }}>DropdownMenu</h3>
              <p style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-muted)', marginBottom: 'var(--renge-space-4)' }}>
                Menu with trigger + items.
              </p>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)} style={{ padding: 'var(--renge-space-2) var(--renge-space-3)', background: 'var(--renge-color-accent)', color: 'var(--renge-color-bg)', border: 'none', borderRadius: 'var(--renge-radius-2)', cursor: 'pointer', fontWeight: 500 }}>Menu</button>
                {dropdownOpen && (
                  <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 'var(--renge-space-2)', background: 'var(--renge-color-bg)', border: '1px solid var(--renge-color-border-subtle)', borderRadius: 'var(--renge-radius-2)', minWidth: '180px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', zIndex: 50 }}>
                    {['Edit', 'Delete'].map((item) => (
                      <button key={item} type="button" onClick={() => setDropdownOpen(false)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: 'var(--renge-space-2) var(--renge-space-3)', border: 'none', background: 'transparent', color: 'var(--renge-color-fg)', cursor: 'pointer', fontSize: 'var(--renge-font-size-sm)' }}>
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginBottom: 'var(--renge-space-8)', padding: 'var(--renge-space-4)', background: 'var(--renge-color-bg-subtle)', borderRadius: 'var(--renge-radius-3)' }}>
              <h3 style={{ fontSize: 'var(--renge-font-size-lg)', fontWeight: 600, marginBottom: 'var(--renge-space-3)' }}>CommandPalette</h3>
              <p style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-muted)', marginBottom: 'var(--renge-space-4)' }}>
                Keyboard-first command menu.
              </p>
              <button onClick={() => setCommandOpen(!commandOpen)} style={{ padding: 'var(--renge-space-2) var(--renge-space-3)', background: 'var(--renge-color-accent)', color: 'var(--renge-color-bg)', border: 'none', borderRadius: 'var(--renge-radius-2)', cursor: 'pointer', fontWeight: 500 }}>
                Open (Ctrl+K)
              </button>
            </div>
          </section>

          {/* Progress & Steps */}
          <section style={{ marginBottom: 'var(--renge-space-12)' }}>
            <h2 style={{ fontSize: 'var(--renge-font-size-2xl)', fontWeight: 600, marginBottom: 'var(--renge-space-4)' }}>Progress & Steps</h2>

            <div style={{ marginBottom: 'var(--renge-space-8)', padding: 'var(--renge-space-4)', background: 'var(--renge-color-bg-subtle)', borderRadius: 'var(--renge-radius-3)' }}>
              <h3 style={{ fontSize: 'var(--renge-font-size-lg)', fontWeight: 600, marginBottom: 'var(--renge-space-3)' }}>Stepper</h3>
              <p style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-muted)', marginBottom: 'var(--renge-space-4)' }}>
                Multi-step indicator.
              </p>
              <div style={{ display: 'flex', gap: 'var(--renge-space-4)', alignItems: 'flex-start' }}>
                {steps.map((step, idx) => (
                  <div key={idx} style={{ flex: 1, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-2)', opacity: idx <= currentStep ? 1 : 0.5 }} onClick={() => setCurrentStep(idx)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--renge-space-2)' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: idx <= currentStep ? 'var(--renge-color-accent)' : 'var(--renge-color-bg-subtle)', color: idx <= currentStep ? 'var(--renge-color-bg)' : 'var(--renge-color-fg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--renge-font-size-sm)', fontWeight: 600 }}>
                        {idx <= currentStep ? '✓' : idx + 1}
                      </div>
                    </div>
                    <div style={{ fontSize: 'var(--renge-font-size-sm)', fontWeight: 600 }}>{step.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Display & Content */}
          <section style={{ marginBottom: 'var(--renge-space-12)' }}>
            <h2 style={{ fontSize: 'var(--renge-font-size-2xl)', fontWeight: 600, marginBottom: 'var(--renge-space-4)' }}>Display & Content</h2>

            <div style={{ marginBottom: 'var(--renge-space-8)', padding: 'var(--renge-space-4)', background: 'var(--renge-color-bg-subtle)', borderRadius: 'var(--renge-radius-3)' }}>
              <h3 style={{ fontSize: 'var(--renge-font-size-lg)', fontWeight: 600, marginBottom: 'var(--renge-space-3)' }}>Rating</h3>
              <p style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-muted)', marginBottom: 'var(--renge-space-4)' }}>
                Star rating input.
              </p>
              <div style={{ display: 'inline-flex', gap: 'var(--renge-space-2)' }}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <button key={idx} type="button" onClick={() => setRating(idx + 1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'var(--renge-font-size-2xl)' }}>
                    {idx < rating ? '★' : '☆'}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 'var(--renge-space-8)', padding: 'var(--renge-space-4)', background: 'var(--renge-color-bg-subtle)', borderRadius: 'var(--renge-radius-3)' }}>
              <h3 style={{ fontSize: 'var(--renge-font-size-lg)', fontWeight: 600, marginBottom: 'var(--renge-space-3)' }}>CodeBlock & KBD</h3>
              <p style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-muted)', marginBottom: 'var(--renge-space-4)' }}>
                Code display and keyboard shortcuts.
              </p>
              <pre style={{ background: 'var(--renge-color-bg)', padding: 'var(--renge-space-3)', borderRadius: 'var(--renge-radius-1)', fontSize: 'var(--renge-font-size-xs)', overflow: 'auto', marginBottom: 'var(--renge-space-3)' }}>
{`const x = 42;`}
              </pre>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: 'monospace' }}>
                {['Ctrl', 'K'].map((key, idx) => (
                  <span key={idx}>
                    {idx > 0 && <span style={{ margin: '0 4px' }}>+</span>}
                    <span style={{ display: 'inline-block', minWidth: '24px', height: '24px', lineHeight: '24px', textAlign: 'center', background: 'var(--renge-color-bg-subtle)', border: '1px solid var(--renge-color-border)', borderRadius: 'var(--renge-radius-1)', padding: '0 var(--renge-space-1)', fontSize: 'var(--renge-font-size-xs)', fontWeight: 600 }}>
                      {key}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </section>

          <div style={{ padding: 'var(--renge-space-6)', background: 'var(--renge-color-bg-subtle)', borderRadius: 'var(--renge-radius-3)' }}>
            <p style={{ margin: 0, fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-muted)' }}>
              All 60+ components are fully typed, support standard HTML props, and use Renge tokens exclusively. Import from <code style={{ background: 'var(--renge-color-bg)', padding: '0.125em 0.25em', borderRadius: 'var(--renge-radius-1)', fontFamily: 'monospace' }}>@renge-ui/react</code>.
            </p>
          </div>
        </div>
      </div>
    </ProfileProvider>
  );
}
