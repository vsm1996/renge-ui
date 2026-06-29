import { forwardRef, type ComponentPropsWithoutRef } from 'react';

if (typeof document !== 'undefined') {
  const id = '__renge-stat-css__';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
[data-renge-stat] {
  border-radius: var(--renge-radius-2);
  transition: transform var(--renge-duration-2) var(--renge-easing-spring),
              box-shadow var(--renge-duration-2) var(--renge-easing-ease-out) !important;
}
[data-renge-stat]:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 var(--renge-space-1) var(--renge-space-3) color-mix(in oklch, var(--renge-color-fg) 8%, transparent) !important;
}`;
    document.head.appendChild(s);
  }
}

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface StatProps extends ComponentPropsWithoutRef<'div'> {
  value: string | number;
  label: string;
  trend?: TrendDirection;
  trendValue?: string;
  caption?: string;
}

const trendColor: Record<TrendDirection, string> = {
  up: 'var(--renge-color-success)',
  down: 'var(--renge-color-danger)',
  neutral: 'var(--renge-color-fg-muted)',
};

const trendBg: Record<TrendDirection, string> = {
  up: 'var(--renge-color-success-subtle)',
  down: 'var(--renge-color-danger-subtle)',
  neutral: 'var(--renge-color-bg-subtle)',
};

const trendBorder: Record<TrendDirection, string> = {
  up: 'var(--renge-color-success)',
  down: 'var(--renge-color-danger)',
  neutral: 'var(--renge-color-border-subtle)',
};

const trendSymbol: Record<TrendDirection, string> = {
  up: '↑',
  down: '↓',
  neutral: '—',
};

export const Stat = forwardRef<HTMLDivElement, StatProps>(
  function Stat({ value, label, trend, trendValue, caption, style, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-renge-stat=""
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 'var(--renge-space-4)',
          ...style,
        }}
        {...props}
      >
        <span
          style={{
            fontSize: 'var(--renge-font-size-xs)',
            color: 'var(--renge-color-fg-muted)',
            marginBottom: 'var(--renge-space-1)',
            fontWeight: 500,
          }}
        >
          {label}
        </span>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 'var(--renge-space-3)',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontSize: 'var(--renge-font-size-3xl)',
              lineHeight: 1.2,
              fontWeight: 600,
              color: 'var(--renge-color-fg)',
            }}
          >
            {value}
          </span>
          {trend && trendValue && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--renge-space-1)',
                padding: 'var(--renge-space-1) var(--renge-space-2)',
                fontSize: 'var(--renge-font-size-xs)',
                fontWeight: 500,
                lineHeight: 1,
                borderRadius: 'var(--renge-radius-full)',
                border: `1px solid ${trendBorder[trend]}`,
                background: trendBg[trend],
                color: trendColor[trend],
              }}
            >
              {trendSymbol[trend]} {trendValue}
            </span>
          )}
        </div>
        {caption && (
          <span
            style={{
              fontSize: 'var(--renge-font-size-xs)',
              color: 'var(--renge-color-fg-muted)',
              marginTop: 'var(--renge-space-1)',
            }}
          >
            {caption}
          </span>
        )}
      </div>
    );
  }
);
