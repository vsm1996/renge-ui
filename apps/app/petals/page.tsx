'use client';

import { petals } from '@renge-ui/petals';
import { DocPageLayout } from '@/components/ui/DocPageLayout';
import { DocSidebar } from '@/components/ui/DocSidebar';
import type { SidebarSection } from '@/components/ui/DocSidebar';

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const SIDEBAR_NAV: SidebarSection[] = [
  {
    label: 'Overview',
    items: [
      { id: 'overview', label: 'What are Petals?' },
      { id: 'usage', label: 'Usage' },
      { id: 'philosophy', label: 'Why Petals?' },
    ],
  },
  {
    label: 'Foundation',
    items: [
      { id: 'typography', label: 'Typography' },
      { id: 'spacing', label: 'Spacing' },
      { id: 'cards', label: 'Cards' },
      { id: 'interactive', label: 'Interactive' },
      { id: 'compositions', label: 'Compositions' },
    ],
  },
  {
    label: 'Components',
    items: [
      { id: 'alerts', label: 'Alerts' },
      { id: 'navigation', label: 'Navigation' },
      { id: 'overlay', label: 'Overlay' },
      { id: 'forms', label: 'Forms' },
      { id: 'feedback', label: 'Feedback' },
      { id: 'dataDisplay', label: 'Data Display' },
      { id: 'layout', label: 'Layout' },
      { id: 'decoration', label: 'Decoration' },
    ],
  },
];

const CATEGORY_META: Record<string, { title: string; desc: string }> = {
  typography:  { title: 'Typography',  desc: 'Font size and line-height pairs derived from the PHI scale. Apply these to any text-bearing element to lock into the mathematical rhythm.' },
  spacing:     { title: 'Spacing',     desc: 'Padding and gap combinations following the Fibonacci sequence. One petal sets both dimensions consistently.' },
  cards:       { title: 'Cards',       desc: 'Surface styling with padding, radius, and shadow elevation. Four levels from generous to minimal.' },
  interactive: { title: 'Interactive', desc: 'Button sizing and focus indicator. Padding, radius, and transition timing in one application.' },
  compositions:{ title: 'Compositions',desc: 'Higher-level patterns combining multiple token types — text fields, badges, and chips.' },
  alerts:      { title: 'Alerts',      desc: 'Semantic feedback containers. Five variants (success, warning, danger, info, neutral) each carrying border color, background, and padding.' },
  navigation:  { title: 'Navigation',  desc: 'Navbars, menus, tabs, breadcrumbs, pagination, bottom nav, and step indicators — all the scaffolding for wayfinding.' },
  overlay:     { title: 'Overlay',     desc: 'Floating elements above the document flow. Modals, drawers, dropdowns, tooltips, and popovers with z-index tokens baked in.' },
  forms:       { title: 'Forms',       desc: 'Every form control beyond text input — checkboxes, radios, toggles, range sliders, selects, textareas, file inputs, and star ratings.' },
  feedback:    { title: 'Feedback',    desc: 'Loading states, progress bars, skeleton loaders, and toast notifications. UI state rather than content.' },
  dataDisplay: { title: 'Data Display',desc: 'Tables, stats, avatars, chat bubbles, timelines, and accordions. The visual rhythm of structured information.' },
  layout:      { title: 'Layout',      desc: 'Page-level structure — heroes, footers, dividers, indicators, join groups, sections, and container widths.' },
  decoration:  { title: 'Decoration',  desc: 'Badge variants (7), keyboard keys, countdown displays, diff views, and clip masks.' },
};

// ─── Shared helpers ───────────────────────────────────────────────────────────

const codeStyle: React.CSSProperties = {
  background: 'var(--renge-color-bg)',
  padding: 'var(--renge-space-2)',
  borderRadius: 'var(--renge-radius-1)',
  fontSize: 'var(--renge-font-size-xs)',
  fontFamily: 'monospace',
  color: 'var(--renge-color-fg-subtle)',
  margin: 0,
  overflow: 'auto',
  lineHeight: '1.5',
};

function TokenJSON({ tokens }: { tokens: Record<string, string> }) {
  return <pre style={codeStyle}>{JSON.stringify(tokens, null, 2)}</pre>;
}

function PreviewWrap({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: 'var(--renge-space-4)', background: 'var(--renge-color-bg)', borderRadius: 'var(--renge-radius-2)', marginBottom: 'var(--renge-space-3)', overflow: 'hidden', minWidth: 0 }}>
      {children}
    </div>
  );
}

// ─── Per-category visual previews ────────────────────────────────────────────

function PetalPreview({ categoryName, petalName, petal }: { categoryName: string; petalName: string; petal: any }) {
  const tokens = petal.tokens as Record<string, string>;

  // ── typography ──
  if (categoryName === 'typography') {
    const isDisplay = petalName.startsWith('display');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
        <PreviewWrap>
          <div style={{ ...tokens as any, overflow: 'hidden', wordBreak: 'break-word', maxHeight: isDisplay ? '4.5rem' : undefined, color: 'var(--renge-color-fg)' }}>
            {isDisplay ? 'Renge' : petalName.startsWith('heading') ? 'Heading text' : 'The quick brown fox jumps over the lazy dog'}
          </div>
        </PreviewWrap>
        <TokenJSON tokens={tokens} />
      </div>
    );
  }

  // ── spacing ──
  if (categoryName === 'spacing') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
        <PreviewWrap>
          <div style={{ background: 'var(--renge-color-accent-subtle)', borderRadius: 'var(--renge-radius-1)', display: 'flex', flexDirection: 'column', ...tokens as any }}>
            <div style={{ color: 'var(--renge-color-fg-subtle)', fontSize: 'var(--renge-font-size-xs)' }}>Item 1</div>
            <div style={{ color: 'var(--renge-color-fg-subtle)', fontSize: 'var(--renge-font-size-xs)' }}>Item 2</div>
          </div>
        </PreviewWrap>
        <TokenJSON tokens={tokens} />
      </div>
    );
  }

  // ── cards ──
  if (categoryName === 'cards') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
        <PreviewWrap>
          <div style={{ background: 'var(--renge-color-bg-subtle)', ...tokens as any }}>
            <div style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg)', marginBottom: 'var(--renge-space-2)' }}>Card Title</div>
            <div style={{ fontSize: 'var(--renge-font-size-xs)', color: 'var(--renge-color-fg-muted)' }}>
              Surface styled with <em>{petalName}</em>.
            </div>
          </div>
        </PreviewWrap>
        <TokenJSON tokens={tokens} />
      </div>
    );
  }

  // ── interactive ──
  if (categoryName === 'interactive') {
    if (petalName === 'focus') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          {/* no overflow:hidden here — the ring is a box-shadow and would be clipped */}
          <div style={{ padding: 'var(--renge-space-4)', background: 'var(--renge-color-bg)', borderRadius: 'var(--renge-radius-2)', marginBottom: 'var(--renge-space-3)' }}>
            <div style={{ height: '36px', background: 'var(--renge-color-bg-subtle)', borderRadius: 'var(--renge-radius-2)', ...tokens as any }} />
          </div>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'hoverSurface') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ padding: 'var(--renge-space-3) var(--renge-space-4)', borderRadius: 'var(--renge-radius-2)', border: '1px solid var(--renge-color-border-subtle)', color: 'var(--renge-color-fg)', fontSize: 'var(--renge-font-size-sm)', ...tokens as any }}>
              Hover state surface
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'activeSurface') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ padding: 'var(--renge-space-3) var(--renge-space-4)', borderRadius: 'var(--renge-radius-2)', border: '1px solid var(--renge-color-border-subtle)', color: 'var(--renge-color-fg)', fontSize: 'var(--renge-font-size-sm)', ...tokens as any }}>
              Active/pressed surface
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'interactiveBase') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', gap: 'var(--renge-space-3)', flexWrap: 'wrap' as const }}>
              {(['Default', 'Hover', 'Active', 'Focus'] as const).map((state, i) => (
                <div key={state} style={{
                  padding: 'var(--renge-space-2) var(--renge-space-3)',
                  borderRadius: 'var(--renge-radius-2)',
                  border: '1px solid var(--renge-color-border-subtle)',
                  fontSize: 'var(--renge-font-size-xs)',
                  color: 'var(--renge-color-fg)',
                  background: i === 0 ? 'var(--renge-color-bg)' : i === 1 ? 'var(--renge-color-bg-subtle)' : i === 2 ? 'var(--renge-color-bg-muted)' : 'var(--renge-color-bg-subtle)',
                  boxShadow: i === 3 ? 'var(--renge-shadow-focus)' : undefined,
                }}>
                  {state}
                </div>
              ))}
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
        <PreviewWrap>
          <button style={{ background: 'var(--renge-color-accent)', color: 'var(--renge-color-fg-inverse)', border: 'none', cursor: 'pointer', fontSize: 'var(--renge-font-size-sm)', ...tokens as any }}>
            {petal.label}
          </button>
        </PreviewWrap>
        <TokenJSON tokens={tokens} />
      </div>
    );
  }

  // ── compositions ──
  if (categoryName === 'compositions') {
    if (petalName === 'textField') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <input type="text" placeholder="Input field" style={{ width: '100%', color: 'var(--renge-color-fg)', background: 'var(--renge-color-bg-subtle)', ...tokens as any }} />
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'badge') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <span style={{ display: 'inline-block', background: 'var(--renge-color-accent)', color: 'var(--renge-color-fg-inverse)', ...tokens as any }}>Badge</span>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'chip') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--renge-space-1)', background: 'var(--renge-color-accent)', color: 'var(--renge-color-fg-inverse)', ...tokens as any }}>
              Chip ×
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'heroSection') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ background: 'var(--renge-color-bg-subtle)', borderRadius: 'var(--renge-radius-2)', padding: 'var(--renge-space-5)', textAlign: 'center' as const }}>
              <div style={{ fontSize: 'var(--renge-font-size-2xl)', color: 'var(--renge-color-fg)', marginBottom: 'var(--renge-space-3)' }}>Hero Headline</div>
              <div style={{ fontSize: 'var(--renge-font-size-base)', color: 'var(--renge-color-fg-subtle)', marginBottom: 'var(--renge-space-4)' }}>Supporting subtitle text here</div>
              <div style={{ display: 'inline-block', padding: 'var(--renge-space-2) var(--renge-space-5)', borderRadius: 'var(--renge-radius-2)', background: 'var(--renge-color-accent)', color: 'var(--renge-color-fg-inverse)', fontSize: 'var(--renge-font-size-sm)' }}>Get started</div>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'statGrid') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--renge-space-4)' }}>
              {[['24.9K', 'Users'], ['$48.2K', 'Revenue'], ['98.1%', 'Uptime'], ['1.2s', 'Load time']].map(([val, label]) => (
                <div key={label} style={{ padding: 'var(--renge-space-3)', borderRadius: 'var(--renge-radius-2)', border: '1px solid var(--renge-color-border-subtle)' }}>
                  <div style={{ fontSize: 'var(--renge-font-size-xl)', color: 'var(--renge-color-fg)', fontWeight: 600 }}>{val}</div>
                  <div style={{ fontSize: 'var(--renge-font-size-xs)', color: 'var(--renge-color-fg-subtle)' }}>{label}</div>
                </div>
              ))}
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'formSection') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-4)' }}>
              {[['Name', 'text', 'Jane Smith'], ['Email', 'email', 'jane@example.com']].map(([lbl, type, ph]) => (
                <div key={lbl} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-2)' }}>
                  <label style={{ fontSize: 'var(--renge-font-size-sm)', fontWeight: 600, color: 'var(--renge-color-fg)' }}>{lbl}</label>
                  <input type={type} placeholder={ph} style={{ padding: 'var(--renge-space-2) var(--renge-space-3)', borderRadius: 'var(--renge-radius-2)', border: '1px solid var(--renge-color-border)', background: 'var(--renge-color-bg-subtle)', color: 'var(--renge-color-fg)', fontSize: 'var(--renge-font-size-sm)', outline: 'none', width: '100%' }} />
                </div>
              ))}
              <button style={{ padding: 'var(--renge-space-3) var(--renge-space-5)', borderRadius: 'var(--renge-radius-2)', border: 'none', background: 'var(--renge-color-accent)', color: 'var(--renge-color-fg-inverse)', fontSize: 'var(--renge-font-size-sm)', cursor: 'pointer', alignSelf: 'flex-start' }}>Submit</button>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'dataRow') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div>
              {[['Full name', 'Jane Smith'], ['Email', 'jane@example.com'], ['Plan', 'Pro'], ['Member since', 'Jan 2024']].map(([lbl, val]) => (
                <div key={lbl} style={{ ...tokens as any }}>
                  <span style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-subtle)' }}>{lbl}</span>
                  <span style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg)' }}>{val}</span>
                </div>
              ))}
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    // fallback for chip (already handled above) and any future additions
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
        <PreviewWrap>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--renge-space-1)', background: 'var(--renge-color-accent)', color: 'var(--renge-color-fg-inverse)', ...tokens as any }}>
            {petal.label}
          </div>
        </PreviewWrap>
        <TokenJSON tokens={tokens} />
      </div>
    );
  }

  // ── alerts ──
  if (categoryName === 'alerts') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
        <PreviewWrap>
          <div style={{ ...tokens as any }}>
            <div style={{ fontWeight: 600, fontSize: 'var(--renge-font-size-sm)', marginBottom: 'var(--renge-space-1)' }}>
              {petal.label}
            </div>
            <div style={{ fontSize: 'var(--renge-font-size-sm)' }}>
              This is a notification message with relevant context.
            </div>
          </div>
        </PreviewWrap>
        <TokenJSON tokens={tokens} />
      </div>
    );
  }

  // ── navigation ──
  if (categoryName === 'navigation') {
    if (petalName === 'navbarRoot') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...tokens as any }}>
              <span style={{ fontWeight: 600, fontSize: 'var(--renge-font-size-sm)' }}>Logo</span>
              <div style={{ display: 'flex', gap: 'var(--renge-space-3)', fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-subtle)' }}>
                <span>Docs</span><span>GitHub</span>
              </div>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'navItem' || petalName === 'navItemActive') {
      const isActive = petalName === 'navItemActive';
      const baseStyle = petals.navigation.navItem.tokens as React.CSSProperties;
      const activeStyle = petals.navigation.navItemActive.tokens as React.CSSProperties;
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', gap: 'var(--renge-space-1)', flexWrap: 'wrap' as const }}>
              {['Home', 'Docs', 'Petals', 'GitHub'].map((label, i) => {
                const isThisActive = isActive && i === 2;
                return (
                  <a key={label} style={{ ...baseStyle, ...(isThisActive ? activeStyle : {}), display: 'inline-block', cursor: 'pointer', textDecoration: 'none', color: isThisActive ? 'var(--renge-color-accent)' : 'var(--renge-color-fg)' }}>
                    {label}
                  </a>
                );
              })}
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'menuItem' || petalName === 'menuItemActive') {
      const baseStyle = petals.navigation.menuItem.tokens as React.CSSProperties;
      const activeStyle = petals.navigation.menuItemActive.tokens as React.CSSProperties;
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 'var(--renge-space-1)', background: 'var(--renge-color-bg-subtle)', borderRadius: 'var(--renge-radius-2)', border: '1px solid var(--renge-color-border-subtle)' }}>
              {['Profile', 'Settings', 'Sign out'].map((label, i) => {
                const isThisActive = petalName === 'menuItemActive' && i === 1;
                return (
                  <div key={label} style={{ ...baseStyle, ...(isThisActive ? activeStyle : {}), cursor: 'pointer' }}>
                    {label}
                  </div>
                );
              })}
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'tabItem' || petalName === 'tabItemActive') {
      const baseStyle = petals.navigation.tabItem.tokens as React.CSSProperties;
      const activeStyle = petals.navigation.tabItemActive.tokens as React.CSSProperties;
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--renge-color-border-subtle)' }}>
              {['Overview', 'Petals', 'API'].map((label, i) => {
                const isThisActive = petalName === 'tabItemActive' ? i === 1 : i === 0;
                return (
                  <div key={label} style={{ ...baseStyle, ...(isThisActive ? activeStyle : {}), cursor: 'pointer', color: isThisActive ? 'var(--renge-color-accent)' : 'var(--renge-color-fg-subtle)' }}>
                    {label}
                  </div>
                );
              })}
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'breadcrumbItem') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <nav style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' as const, gap: 'var(--renge-space-1)' }}>
              {['Home', '/', 'Docs', '/', 'Petals'].map((seg, i) => (
                <span key={i} style={{ ...tokens as any, cursor: seg !== '/' ? 'pointer' : 'default', color: i === 4 ? 'var(--renge-color-fg)' : 'var(--renge-color-fg-subtle)' }}>{seg}</span>
              ))}
            </nav>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'paginationItem' || petalName === 'paginationItemActive') {
      const isActive = petalName === 'paginationItemActive';
      const baseStyle = petals.navigation.paginationItem.tokens as React.CSSProperties;
      const activeStyle = petals.navigation.paginationItemActive.tokens as React.CSSProperties;
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', gap: 'var(--renge-space-1)', alignItems: 'center', flexWrap: 'wrap' as const }}>
              {['←', '1', '2', '3', '→'].map((n, i) => {
                const isThisActive = isActive && i === 2;
                return (
                  <button key={n} style={{ ...baseStyle, ...(isThisActive ? activeStyle : {}), cursor: 'pointer', border: '1px solid var(--renge-color-border-subtle)', background: isThisActive ? 'var(--renge-color-accent)' : 'transparent', color: isThisActive ? 'var(--renge-color-fg-inverse)' : 'var(--renge-color-fg)', textAlign: 'center' as const }}>
                    {n}
                  </button>
                );
              })}
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'bottomNavItem') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '1px solid var(--renge-color-border-subtle)', background: 'var(--renge-color-bg-subtle)', borderRadius: '0 0 var(--renge-radius-2) var(--renge-radius-2)' }}>
              {['Home', 'Search', 'Profile'].map((label, i) => (
                <div key={label} style={{ ...tokens as any, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: i === 0 ? 'var(--renge-color-accent)' : 'var(--renge-color-fg-subtle)' }}>
                  <span style={{ fontSize: 'var(--renge-font-size-base)', lineHeight: 1 }}>{i === 0 ? '⌂' : i === 1 ? '⌕' : '◎'}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    // stepsItem default
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
        <PreviewWrap>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            {['Account', 'Plan', 'Payment'].map((step, i) => (
              <div key={step} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--renge-space-1)', flex: 1 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: i === 0 ? 'var(--renge-color-accent)' : 'var(--renge-color-bg-muted)', border: `2px solid ${i === 0 ? 'var(--renge-color-accent)' : 'var(--renge-color-border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, color: i === 0 ? 'var(--renge-color-fg-inverse)' : 'var(--renge-color-fg-subtle)', flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ ...tokens as any, textAlign: 'center' as const }}>{step}</span>
                </div>
                {i < 2 && <div style={{ height: 1, background: 'var(--renge-color-border-subtle)', flex: 1, marginTop: '-12px', marginLeft: '-4px', marginRight: '-4px' }} />}
              </div>
            ))}
          </div>
        </PreviewWrap>
        <TokenJSON tokens={tokens} />
      </div>
    );
  }

  // ── overlay ──
  if (categoryName === 'overlay') {
    if (petalName === 'modalBackdrop') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ height: 40, background: 'var(--renge-color-bg-inverse)', borderRadius: 'var(--renge-radius-1)', opacity: 0.6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 'var(--renge-font-size-xs)', color: 'var(--renge-color-fg-inverse)' }}>backdrop dimming</span>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'tooltip') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <span style={{ ...tokens as any }}>Helpful tooltip text</span>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'dropdownMenu') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ ...tokens as any, display: 'inline-flex', flexDirection: 'column', minWidth: 140 }}>
              {['Edit', 'Duplicate', 'Delete'].map(item => (
                <div key={item} style={{ padding: 'var(--renge-space-2) var(--renge-space-3)', fontSize: 'var(--renge-font-size-sm)', color: item === 'Delete' ? 'var(--renge-color-danger)' : 'var(--renge-color-fg)', borderRadius: 'var(--renge-radius-2)', cursor: 'pointer' }}>
                  {item}
                </div>
              ))}
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'dropdownItem') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {['Edit', 'Duplicate', 'Archive'].map(item => (
                <div key={item} style={{ ...tokens as any, cursor: 'pointer', color: 'var(--renge-color-fg)' }}>
                  {item}
                </div>
              ))}
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'modalHeader' || petalName === 'modalFooter') {
      const isHeader = petalName === 'modalHeader';
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ border: '1px solid var(--renge-color-border-subtle)', borderRadius: 'var(--renge-radius-2)', overflow: 'hidden' }}>
              <div style={{ ...tokens as any, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {isHeader ? (
                  <><span>Dialog Title</span><span style={{ fontSize: 'var(--renge-font-size-sm)', cursor: 'pointer', color: 'var(--renge-color-fg-subtle)' }}>✕</span></>
                ) : (
                  <><div style={{ flex: 1 }} /><button style={{ padding: 'var(--renge-space-1) var(--renge-space-3)', borderRadius: 'var(--renge-radius-2)', border: '1px solid var(--renge-color-border)', background: 'transparent', cursor: 'pointer', fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg)' }}>Cancel</button><button style={{ padding: 'var(--renge-space-1) var(--renge-space-3)', borderRadius: 'var(--renge-radius-2)', border: 'none', background: 'var(--renge-color-accent)', cursor: 'pointer', fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-inverse)' }}>Confirm</button></>
                )}
              </div>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    // modalContainer, drawerPanel, popover — card previews
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
        <PreviewWrap>
          <div style={{ ...tokens as any }}>
            <div style={{ fontSize: 'var(--renge-font-size-sm)', fontWeight: 600, color: 'var(--renge-color-fg)', marginBottom: 'var(--renge-space-2)' }}>
              {petal.label}
            </div>
            <div style={{ fontSize: 'var(--renge-font-size-xs)', color: 'var(--renge-color-fg-subtle)' }}>
              Floating content surface
            </div>
          </div>
        </PreviewWrap>
        <TokenJSON tokens={tokens} />
      </div>
    );
  }

  // ── forms ──
  if (categoryName === 'forms') {
    if (petalName === 'checkbox' || petalName === 'checkboxChecked') {
      const isChecked = petalName === 'checkboxChecked';
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--renge-space-3)' }}>
              <div style={{ width: 18, height: 18, borderRadius: 'var(--renge-radius-1)', border: '1.5px solid var(--renge-color-border)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
              <div style={{ width: 18, height: 18, borderRadius: 'var(--renge-radius-1)', background: 'var(--renge-color-accent)', border: '1.5px solid var(--renge-color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--renge-color-fg-inverse)', fontSize: '10px', lineHeight: 1 }}>✓</span>
              </div>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'radio' || petalName === 'radioChecked') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--renge-space-3)' }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', border: '1.5px solid var(--renge-color-border)', background: 'transparent' }} />
              <div style={{ width: 18, height: 18, borderRadius: '50%', border: '1.5px solid var(--renge-color-accent)', background: 'transparent', boxShadow: 'inset 0 0 0 4px var(--renge-color-accent)' }} />
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'toggle' || petalName === 'toggleActive' || petalName === 'toggleThumb') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--renge-space-4)' }}>
              {/* Off */}
              <div style={{ width: 36, height: 20, borderRadius: 'var(--renge-radius-full)', background: 'var(--renge-color-bg-muted)', display: 'flex', alignItems: 'center', padding: '2px', boxSizing: 'border-box', cursor: 'pointer' }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--renge-color-bg)', boxShadow: 'var(--renge-shadow-layer-1)' }} />
              </div>
              {/* On */}
              <div style={{ width: 36, height: 20, borderRadius: 'var(--renge-radius-full)', background: 'var(--renge-color-accent)', display: 'flex', alignItems: 'center', padding: '2px', boxSizing: 'border-box', justifyContent: 'flex-end', cursor: 'pointer' }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--renge-color-bg)', boxShadow: 'var(--renge-shadow-layer-1)' }} />
              </div>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'rangeTrack' || petalName === 'rangeFill' || petalName === 'rangeThumb') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ position: 'relative', height: 20, display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: 0, right: 0, height: 6, borderRadius: 'var(--renge-radius-full)', background: 'var(--renge-color-bg-muted)' }} />
              <div style={{ position: 'absolute', left: 0, width: '60%', height: 6, borderRadius: 'var(--renge-radius-full)', background: 'var(--renge-color-accent)' }} />
              <div style={{ position: 'absolute', left: '60%', transform: 'translateX(-50%)', width: 18, height: 18, borderRadius: '50%', background: 'var(--renge-color-accent)', boxShadow: 'var(--renge-shadow-layer-1)', cursor: 'pointer' }} />
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'select') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <select style={{ width: '100%', color: 'var(--renge-color-fg)', ...tokens as any }}>
              <option>Choose an option</option>
              <option>Option A</option>
              <option>Option B</option>
            </select>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'textarea') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <textarea placeholder="Multi-line text..." style={{ width: '100%', color: 'var(--renge-color-fg)', background: 'var(--renge-color-bg-subtle)', resize: 'vertical', ...tokens as any }} />
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'fileInput' || petalName === 'fileInputActive') {
      const isActive = petalName === 'fileInputActive';
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ ...tokens as any, textAlign: 'center' as const, color: isActive ? 'var(--renge-color-accent)' : 'var(--renge-color-fg-subtle)' }}>
              <div style={{ fontSize: 'var(--renge-font-size-lg)', marginBottom: 'var(--renge-space-1)' }}>↑</div>
              <div style={{ fontSize: 'var(--renge-font-size-sm)' }}>
                {isActive ? 'Release to upload' : 'Drag & drop files, or click to browse'}
              </div>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'rating' || petalName === 'ratingEmpty') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', gap: 'var(--renge-space-1)' }}>
              {[1, 2, 3, 4, 5].map(i => (
                <span key={i} style={{ ...tokens as any, color: i <= 4 ? 'var(--renge-color-warning)' : 'var(--renge-color-bg-muted)' }}>★</span>
              ))}
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    return <TokenJSON tokens={tokens} />;
  }

  // ── feedback ──
  if (categoryName === 'feedback') {
    if (petalName === 'skeleton') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-2)' }}>
              <div style={{ ...tokens as any, height: 80 }} />
              <div style={{ ...tokens as any, height: 40 }} />
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'skeletonText') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-2)' }}>
              <div style={{ ...tokens as any, width: '85%' }} />
              <div style={{ ...tokens as any, width: '70%' }} />
              <div style={{ ...tokens as any, width: '55%' }} />
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'skeletonAvatar') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', gap: 'var(--renge-space-3)', alignItems: 'center' }}>
              <div style={{ ...tokens as any }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-2)', flex: 1 }}>
                <div style={{ height: 10, borderRadius: 'var(--renge-radius-full)', background: 'var(--renge-color-bg-muted)', width: '60%' }} />
                <div style={{ height: 8, borderRadius: 'var(--renge-radius-full)', background: 'var(--renge-color-bg-muted)', width: '40%' }} />
              </div>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName.startsWith('progress')) {
      const isFill = petalName === 'progressFill' || petalName === 'progressSuccess';
      const fillColor = petalName === 'progressSuccess' ? 'var(--renge-color-success)' : 'var(--renge-color-accent)';
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontSize: 'var(--renge-font-size-xs)', color: 'var(--renge-color-fg-subtle)' }}>Loading… 60%</div>
                <div style={{ height: 8, borderRadius: 'var(--renge-radius-full)', background: 'var(--renge-color-bg-muted)' }}>
                  <div style={{ width: '60%', height: '100%', borderRadius: 'var(--renge-radius-full)', background: fillColor }} />
                </div>
              </div>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName.startsWith('toast')) {
      const color = petalName === 'toastSuccess' ? 'var(--renge-color-success)' :
                    petalName === 'toastWarning' ? 'var(--renge-color-warning)' :
                    petalName === 'toastDanger'  ? 'var(--renge-color-danger)'  : null;
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ ...tokens as any }}>
              <div style={{ fontWeight: 600, fontSize: 'var(--renge-font-size-sm)', color: color || 'var(--renge-color-fg)', marginBottom: 'var(--renge-space-1)' }}>
                {petalName === 'toastSuccess' ? 'Saved successfully' :
                 petalName === 'toastWarning' ? 'Disk space low' :
                 petalName === 'toastDanger'  ? 'Something went wrong' : 'Notification'}
              </div>
              <div style={{ fontSize: 'var(--renge-font-size-xs)', color: 'var(--renge-color-fg-subtle)' }}>
                Brief context message for the user.
              </div>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    return <TokenJSON tokens={tokens} />;
  }

  // ── dataDisplay ──
  if (categoryName === 'dataDisplay') {
    if (petalName === 'tableRoot' || petalName === 'tableHeader' || petalName === 'tableCell' || petalName === 'tableRowStripe' || petalName === 'tableRowHover') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ width: '100%', fontSize: 'var(--renge-font-size-sm)' }}>
              <div style={{ display: 'flex', borderBottom: '1px solid var(--renge-color-border)', padding: 'var(--renge-space-2) var(--renge-space-3)' }}>
                {['Name', 'Status', 'Amount'].map(h => (
                  <div key={h} style={{ flex: 1, fontSize: 'var(--renge-font-size-xs)', color: 'var(--renge-color-fg-subtle)', fontWeight: 600 }}>{h}</div>
                ))}
              </div>
              {[['Alice', 'Active', '$120'], ['Bob', 'Pending', '$80']].map(([name, status, amt], i) => (
                <div key={name} style={{ display: 'flex', padding: 'var(--renge-space-3)', borderBottom: '1px solid var(--renge-color-border-subtle)', background: (petalName === 'tableRowStripe' && i % 2 === 1) ? 'var(--renge-color-bg-subtle)' : 'transparent' }}>
                  <div style={{ flex: 1 }}>{name}</div>
                  <div style={{ flex: 1 }}>{status}</div>
                  <div style={{ flex: 1 }}>{amt}</div>
                </div>
              ))}
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'statRoot' || petalName === 'statValue' || petalName === 'statLabel' || petalName === 'statDesc') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-1)' }}>
              <div style={{ fontSize: 'var(--renge-font-size-xs)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--renge-color-fg-subtle)' }}>Monthly Revenue</div>
              <div style={{ fontSize: 'var(--renge-font-size-2xl)', lineHeight: '1.1', fontWeight: 600, color: 'var(--renge-color-fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>$24,890</div>
              <div style={{ fontSize: 'var(--renge-font-size-xs)', color: 'var(--renge-color-success)' }}>↑ 12% from last month</div>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'avatarSm' || petalName === 'avatarMd' || petalName === 'avatarLg') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--renge-space-3)' }}>
              {[petals.dataDisplay.avatarSm, petals.dataDisplay.avatarMd, petals.dataDisplay.avatarLg].map((av, i) => (
                <div key={i} style={{ ...av.tokens as any, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: i === 0 ? '10px' : i === 1 ? '12px' : '14px', color: 'var(--renge-color-fg-subtle)', fontWeight: 600 }}>
                  JD
                </div>
              ))}
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'chatBubble' || petalName === 'chatBubbleOwn') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-2)' }}>
              <div style={{ ...petals.dataDisplay.chatBubble.tokens as any, display: 'inline-block', maxWidth: '75%' }}>
                Hey, how's it going?
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ ...petals.dataDisplay.chatBubbleOwn.tokens as any, display: 'inline-block', maxWidth: '75%' }}>
                  Pretty great, thanks!
                </div>
              </div>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'timelineConnector' || petalName === 'timelineDot' || petalName === 'timelineLabel') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {['Shipped', 'In transit', 'Ordered'].map((label, i) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--renge-space-3)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: i === 0 ? 'var(--renge-color-accent)' : 'var(--renge-color-bg-muted)', border: '2px solid var(--renge-color-bg)', flexShrink: 0 }} />
                    {i < 2 && <div style={{ width: 1, height: 28, background: 'var(--renge-color-border)' }} />}
                  </div>
                  <div style={{ fontSize: 'var(--renge-font-size-sm)', paddingTop: 0, color: i === 0 ? 'var(--renge-color-fg)' : 'var(--renge-color-fg-subtle)', paddingBottom: i < 2 ? 'var(--renge-space-3)' : 0 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'accordionTrigger' || petalName === 'accordionContent') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ border: '1px solid var(--renge-color-border-subtle)', borderRadius: 'var(--renge-radius-2)', overflow: 'hidden' }}>
              <div style={{ ...petals.dataDisplay.accordionTrigger.tokens as any, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', color: 'var(--renge-color-fg)' }}>
                <span>What are petals?</span>
                <span style={{ fontSize: 'var(--renge-font-size-xs)', color: 'var(--renge-color-fg-subtle)' }}>▲</span>
              </div>
              <div style={{ ...petals.dataDisplay.accordionContent.tokens as any, color: 'var(--renge-color-fg)' }}>
                Semantic token compositions for Renge. Pre-made combinations that bridge tokens and components.
              </div>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    return <TokenJSON tokens={tokens} />;
  }

  // ── layout ──
  if (categoryName === 'layout') {
    if (petalName === 'heroRoot') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ ...tokens as any, background: 'var(--renge-color-bg-subtle)', textAlign: 'center' as const, borderRadius: 'var(--renge-radius-2)' }}>
              <div style={{ fontSize: 'var(--renge-font-size-xl)', color: 'var(--renge-color-fg)', marginBottom: 'var(--renge-space-2)' }}>Hero Headline</div>
              <div style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-subtle)' }}>Supporting subtext beneath</div>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'footerRoot') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ ...tokens as any, borderRadius: 'var(--renge-radius-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--renge-font-size-sm)' }}>© 2025 Renge</span>
              <span style={{ fontSize: 'var(--renge-font-size-xs)' }}>Built with Renge</span>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'divider' || petalName === 'dividerVertical') {
      const isVertical = petalName === 'dividerVertical';
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--renge-space-3)' }}>
              {isVertical ? (
                <>
                  <span style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-subtle)' }}>Left</span>
                  <div style={{ width: 1, height: 24, background: 'var(--renge-color-border-subtle)' }} />
                  <span style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-subtle)' }}>Right</span>
                </>
              ) : (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-2)' }}>
                  <div style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-subtle)' }}>Content above</div>
                  <div style={{ height: 1, background: 'var(--renge-color-border-subtle)' }} />
                  <div style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-subtle)' }}>Content below</div>
                </div>
              )}
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'indicator' || petalName === 'indicatorDanger') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', gap: 'var(--renge-space-4)', alignItems: 'center' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{ width: 32, height: 32, borderRadius: 'var(--renge-radius-2)', background: 'var(--renge-color-bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--renge-font-size-sm)' }}>🔔</div>
                <div style={{ ...tokens as any, position: 'absolute', top: -3, right: -3 }} />
              </div>
              <span style={{ fontSize: 'var(--renge-font-size-xs)', color: 'var(--renge-color-fg-subtle)' }}>Status dot</span>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'joinGroup') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', ...tokens as any }}>
              {['Left', 'Center', 'Right'].map((label, i) => (
                <button key={label} style={{ flex: 1, padding: 'var(--renge-space-2) var(--renge-space-3)', fontSize: 'var(--renge-font-size-sm)', background: i === 1 ? 'var(--renge-color-accent)' : 'transparent', color: i === 1 ? 'var(--renge-color-fg-inverse)' : 'var(--renge-color-fg)', border: '1px solid var(--renge-color-border)', borderLeft: i > 0 ? 'none' : '1px solid var(--renge-color-border)', cursor: 'pointer', borderRadius: i === 0 ? 'var(--renge-radius-2) 0 0 var(--renge-radius-2)' : i === 2 ? '0 var(--renge-radius-2) var(--renge-radius-2) 0' : 0 }}>
                  {label}
                </button>
              ))}
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName.startsWith('container')) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ background: 'var(--renge-color-accent-subtle)', height: 24, borderRadius: 'var(--renge-radius-1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 'var(--renge-font-size-xs)', color: 'var(--renge-color-accent)' }}>max-width: {tokens.maxWidth}</span>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    // sectionRoot, sectionHeader, heroContent, footerSection
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
        <PreviewWrap>
          <div style={{ background: 'var(--renge-color-bg-subtle)', ...tokens as any, borderRadius: 'var(--renge-radius-1)' }}>
            <div style={{ fontSize: 'var(--renge-font-size-xs)', color: 'var(--renge-color-fg-subtle)' }}>
              {petal.description}
            </div>
          </div>
        </PreviewWrap>
        <TokenJSON tokens={tokens} />
      </div>
    );
  }

  // ── decoration ──
  if (categoryName === 'decoration') {
    if (petalName.startsWith('badge')) {
      const label = petalName === 'badgeSolid' ? 'Solid' :
                    petalName === 'badgeOutline' ? 'Outline' :
                    petalName === 'badgeSubtle' ? 'Subtle' :
                    petalName === 'badgeSuccess' ? 'Success' :
                    petalName === 'badgeWarning' ? 'Warning' :
                    petalName === 'badgeDanger' ? 'Danger' : 'Neutral';
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 'var(--renge-space-2)', alignItems: 'center' }}>
              <span style={{ ...tokens as any, display: 'inline-flex', alignItems: 'center' }}>{label}</span>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'kbd') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', gap: 'var(--renge-space-2)', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-subtle)' }}>Press</span>
              {['⌘', 'K'].map(k => (
                <kbd key={k} style={{ ...tokens as any }}>{k}</kbd>
              ))}
              <span style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-subtle)' }}>to open</span>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'countdownValue' || petalName === 'countdownLabel') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', gap: 'var(--renge-space-4)' }}>
              {[['08', 'hours'], ['23', 'mins'], ['42', 'secs']].map(([val, unit]) => (
                <div key={unit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--renge-space-1)' }}>
                  <span style={{ ...petals.decoration.countdownValue.tokens as any }}>{val}</span>
                  <span style={{ ...petals.decoration.countdownLabel.tokens as any }}>{unit}</span>
                </div>
              ))}
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'diffAdded' || petalName === 'diffRemoved') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ fontFamily: 'monospace', fontSize: 'var(--renge-font-size-xs)', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ ...petals.decoration.diffRemoved.tokens as any }}>- const spacing = 8;</div>
              <div style={{ ...petals.decoration.diffAdded.tokens as any }}>+ const spacing = 'var(--renge-space-3)';</div>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    if (petalName === 'maskCircle' || petalName === 'maskSquircle') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-3)' }}>
          <PreviewWrap>
            <div style={{ display: 'flex', gap: 'var(--renge-space-4)', alignItems: 'center' }}>
              <div style={{ ...tokens as any, width: 48, height: 48, background: 'linear-gradient(135deg, var(--renge-color-accent), var(--renge-color-success))' }} />
              <span style={{ fontSize: 'var(--renge-font-size-xs)', color: 'var(--renge-color-fg-subtle)' }}>{petalName === 'maskCircle' ? 'circular clip' : 'squircle clip'}</span>
            </div>
          </PreviewWrap>
          <TokenJSON tokens={tokens} />
        </div>
      );
    }
    return <TokenJSON tokens={tokens} />;
  }

  // ── fallback ──
  return <TokenJSON tokens={tokens} />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PetalsPage() {
  const totalPetals = Object.values(petals).reduce((sum, group) => sum + Object.keys(group).length, 0);
  const totalCategories = Object.keys(petals).length;

  return (
    <DocPageLayout sidebar={<DocSidebar sections={SIDEBAR_NAV} footerLinks={[{ href: '/components', label: 'React Components' }, { href: '/system', label: 'Token System' }]} />}>

      {/* ── Overview ── */}
      <section id="overview" style={{ scrollMarginTop: 'calc(52px + var(--renge-space-6))' }}>
        <div style={{ marginBottom: 'var(--renge-space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--renge-space-3)', marginBottom: 'var(--renge-space-3)', flexWrap: 'wrap' as const }}>
            <span style={{ padding: 'var(--renge-space-1) var(--renge-space-2)', borderRadius: 'var(--renge-radius-full)', background: 'var(--renge-color-accent-subtle)', color: 'var(--renge-color-accent)', fontSize: 'var(--renge-font-size-xs)', fontFamily: 'monospace' }}>
              @renge-ui/petals
            </span>
            <span style={{ fontSize: 'var(--renge-font-size-xs)', color: 'var(--renge-color-fg-subtle)' }}>
              {totalCategories} categories · {totalPetals} petals
            </span>
          </div>
          <h1 style={{ fontSize: 'var(--renge-font-size-4xl)', lineHeight: 'var(--renge-line-height-4xl)', color: 'var(--renge-color-fg)', margin: '0 0 var(--renge-space-4) 0' }}>
            Petals
          </h1>
          <p style={{ fontSize: 'var(--renge-font-size-lg)', lineHeight: 'var(--renge-line-height-lg)', color: 'var(--renge-color-fg-muted)', maxWidth: '60ch', margin: '0 0 var(--renge-space-4) 0' }}>
            Semantic composition patterns for Renge. Pre-made combinations of tokens for typography, spacing, cards, forms, navigation, overlays, and more — bridging the token system and component implementations without prescribing markup.
          </p>
        </div>

        <p style={{ fontSize: 'var(--renge-font-size-base)', lineHeight: 'var(--renge-line-height-base)', margin: '0 0 var(--renge-space-3) 0' }}>
          Renge tokens are orthogonal — each scale (spacing, color, typography) stands alone. This is powerful for fine-grained control, but consumers often compose the same combinations repeatedly. Petals codify those combinations as named, typed, documented objects.
        </p>
        <p style={{ fontSize: 'var(--renge-font-size-base)', lineHeight: 'var(--renge-line-height-base)', color: 'var(--renge-color-fg-subtle)', margin: 0 }}>
          They work in any framework. Pure CSS custom property references — no runtime, no opinion on markup.
        </p>
      </section>

      {/* ── Usage ── */}
      <section id="usage" style={{ scrollMarginTop: 'calc(52px + var(--renge-space-6))' }}>
        <h2 style={{ fontSize: 'var(--renge-font-size-2xl)', lineHeight: 'var(--renge-line-height-2xl)', color: 'var(--renge-color-fg)', margin: '0 0 var(--renge-space-5) 0' }}>
          Usage
        </h2>

        <pre style={{ ...codeStyle, padding: 'var(--renge-space-4)', borderRadius: 'var(--renge-radius-3)', marginBottom: 'var(--renge-space-4)', border: '1px solid var(--renge-color-border-subtle)' }}>
{`pnpm add @renge-ui/petals
# or
npm install @renge-ui/petals`}
        </pre>

        <pre style={{ ...codeStyle, padding: 'var(--renge-space-4)', borderRadius: 'var(--renge-radius-3)', marginBottom: 'var(--renge-space-5)', border: '1px solid var(--renge-color-border-subtle)' }}>
{`import { petals } from '@renge-ui/petals';

// Typography
const heading = petals.typography.displayLarge.tokens;
// → { fontSize: 'var(--renge-font-size-4xl)', lineHeight: 'var(--renge-line-height-4xl)' }

// Semantic alert
const alert = petals.alerts.success.tokens;
// → { padding, borderRadius, border: '1px solid var(--renge-color-success)', ... }

// Form controls
const checkbox = petals.forms.checkbox.tokens;
// → { width, height, borderRadius, border, transition }

// Overlay patterns
const dropdown = petals.overlay.dropdownMenu.tokens;
// → { padding, borderRadius, boxShadow, border, zIndex: 'var(--renge-zindex-dropdown)' }

// Combine multiple petals
const cardHeading = {
  ...petals.typography.headingMedium.tokens,
  ...petals.cards.surfaceComfortable.tokens,
  color: 'var(--renge-color-fg)',
};`}
        </pre>

        <p style={{ fontSize: 'var(--renge-font-size-base)', lineHeight: 'var(--renge-line-height-base)', margin: '0 0 var(--renge-space-3) 0' }}>
          Petals can be spread directly onto React, Vue, or Svelte style props, passed to a CSS-in-JS system, or mapped to CSS variables in a stylesheet.
        </p>

        <pre style={{ ...codeStyle, padding: 'var(--renge-space-4)', borderRadius: 'var(--renge-radius-3)', border: '1px solid var(--renge-color-border-subtle)' }}>
{`// React
<div style={petals.alerts.danger.tokens}>Error message</div>

// Vue
<div :style="petals.forms.textarea.tokens">...</div>

// Vanilla CSS object
const sheet = Object.entries(petals.navigation.navItem.tokens)
  .map(([prop, val]) => \`\${prop}: \${val};\`)
  .join(' ');`}
        </pre>
      </section>

      {/* ── Why Petals? ── */}
      <section id="philosophy" style={{ scrollMarginTop: 'calc(52px + var(--renge-space-6))' }}>
        <h2 style={{ fontSize: 'var(--renge-font-size-2xl)', lineHeight: 'var(--renge-line-height-2xl)', color: 'var(--renge-color-fg)', margin: '0 0 var(--renge-space-4) 0' }}>
          Why Petals?
        </h2>
        <p style={{ fontSize: 'var(--renge-font-size-base)', lineHeight: 'var(--renge-line-height-base)', fontStyle: 'italic', color: 'var(--renge-color-accent)', margin: '0 0 var(--renge-space-5) 0' }}>
          "Every lotus blooms one petal at a time. These are Renge's. Pre-composed token combinations that sit between the math and the markup."
        </p>
        <p style={{ fontSize: 'var(--renge-font-size-base)', lineHeight: 'var(--renge-line-height-base)', margin: '0 0 var(--renge-space-3) 0' }}>
          Petals are <strong>not</strong> components. The distinction matters:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--renge-space-4)' }}>
          <div style={{ padding: 'var(--renge-space-4)', borderRadius: 'var(--renge-radius-3)', border: '1px solid var(--renge-color-success)', background: 'var(--renge-color-success-subtle)' }}>
            <div style={{ fontWeight: 600, fontSize: 'var(--renge-font-size-sm)', marginBottom: 'var(--renge-space-3)', color: 'var(--renge-color-success)' }}>Petals do</div>
            <ul style={{ fontSize: 'var(--renge-font-size-sm)', lineHeight: 'var(--renge-line-height-sm)', paddingLeft: 'var(--renge-space-4)', margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-2)', color: 'var(--renge-color-fg)' }}>
              <li>Compose tokens into semantic patterns</li>
              <li>Stay framework-agnostic</li>
              <li>Enable consistent token combinations</li>
              <li>Document common design decisions</li>
              <li>Export pure CSS custom property references</li>
            </ul>
          </div>
          <div style={{ padding: 'var(--renge-space-4)', borderRadius: 'var(--renge-radius-3)', border: '1px solid var(--renge-color-border)', background: 'var(--renge-color-bg-subtle)' }}>
            <div style={{ fontWeight: 600, fontSize: 'var(--renge-font-size-sm)', marginBottom: 'var(--renge-space-3)', color: 'var(--renge-color-fg-subtle)' }}>Petals don't</div>
            <ul style={{ fontSize: 'var(--renge-font-size-sm)', lineHeight: 'var(--renge-line-height-sm)', paddingLeft: 'var(--renge-space-4)', margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-2)', color: 'var(--renge-color-fg-muted)' }}>
              <li>Include component logic or event handlers</li>
              <li>Prescribe HTML structure</li>
              <li>Create new colors or spacing values</li>
              <li>Require a specific framework or bundler</li>
              <li>Compile to CSS at build time</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Petal Categories ── */}
      {Object.entries(petals).map(([categoryName, categoryPetals]) => {
        const meta = CATEGORY_META[categoryName] ?? { title: categoryName, desc: '' };
        return (
          <section key={categoryName} id={categoryName} style={{ scrollMarginTop: 'calc(52px + var(--renge-space-6))' }}>
            <div style={{ marginBottom: 'var(--renge-space-5)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--renge-space-3)', marginBottom: 'var(--renge-space-2)', flexWrap: 'wrap' as const }}>
                <h2 style={{ fontSize: 'var(--renge-font-size-2xl)', lineHeight: 'var(--renge-line-height-2xl)', color: 'var(--renge-color-fg)', margin: 0 }}>
                  {meta.title}
                </h2>
                <span style={{ fontSize: 'var(--renge-font-size-xs)', color: 'var(--renge-color-fg-subtle)' }}>
                  {Object.keys(categoryPetals).length} petals
                </span>
              </div>
              {meta.desc && (
                <p style={{ fontSize: 'var(--renge-font-size-base)', lineHeight: 'var(--renge-line-height-base)', color: 'var(--renge-color-fg-muted)', margin: 0, maxWidth: '72ch' }}>
                  {meta.desc}
                </p>
              )}
            </div>

            {(() => {
              const petalEntries = Object.entries(categoryPetals);
              const isOdd = petalEntries.length % 2 !== 0;
              return (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 'var(--renge-space-4)' }}>
              {petalEntries.map(([petalName, petal], idx) => (
                <div key={petalName} style={{ padding: 'var(--renge-space-4)', borderRadius: 'var(--renge-radius-3)', border: '1px solid var(--renge-color-border-subtle)', background: 'color-mix(in oklch, var(--renge-color-bg) 97%, var(--renge-color-accent))', minWidth: 0, overflow: 'hidden', ...(isOdd && idx === petalEntries.length - 1 ? { gridColumn: '1 / -1' } : {}) }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--renge-space-2)', marginBottom: 'var(--renge-space-2)' }}>
                    <h3 style={{ fontSize: 'var(--renge-font-size-base)', fontWeight: 600, color: 'var(--renge-color-fg)', margin: 0 }}>
                      {petal.label}
                    </h3>
                    <code style={{ fontSize: 'var(--renge-font-size-xs)', color: 'var(--renge-color-fg-muted)', fontFamily: 'monospace', flexShrink: 0 }}>
                      {petalName}
                    </code>
                  </div>
                  <p style={{ fontSize: 'var(--renge-font-size-sm)', lineHeight: 'var(--renge-line-height-sm)', color: 'var(--renge-color-fg-muted)', margin: '0 0 var(--renge-space-3) 0' }}>
                    {petal.description}
                  </p>
                  <PetalPreview categoryName={categoryName} petalName={petalName} petal={petal} />
                </div>
              ))}
            </div>
              );
            })()}
          </section>
        );
      })}

    </DocPageLayout>
  );
}
