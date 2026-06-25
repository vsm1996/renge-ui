'use client';

export function SkipLink() {
  return (
    <a
      href="#main"
      style={{
        position: 'absolute',
        top: '-40px',
        left: 0,
        background: 'var(--renge-color-accent)',
        color: 'var(--renge-color-bg)',
        padding: 'var(--renge-space-3)',
        textDecoration: 'none',
        zIndex: 100,
        transition: 'top var(--renge-duration-1) var(--renge-easing-ease-out)',
      }}
      onFocus={(e) => {
        (e.target as HTMLElement).style.top = '0';
      }}
      onBlur={(e) => {
        (e.target as HTMLElement).style.top = '-40px';
      }}
    >
      Skip to main content
    </a>
  );
}
