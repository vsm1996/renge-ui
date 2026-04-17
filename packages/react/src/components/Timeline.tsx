// packages/react/src/components/Timeline.tsx
//
// Vertical event timeline. The connector line runs through phi-sized dots.
// Spacing between items follows Fibonacci steps. Each dot is sized at
// space-3 (12px, Fibonacci×3) with an accent fill for active states.

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode, type CSSProperties } from 'react';

export type TimelineItemStatus = 'completed' | 'active' | 'pending';

export interface TimelineProps extends ComponentPropsWithoutRef<'ol'> {
  children: ReactNode;
}

export interface TimelineItemProps {
  title: ReactNode;
  description?: ReactNode;
  timestamp?: ReactNode;
  status?: TimelineItemStatus;
  icon?: ReactNode;
  style?: CSSProperties;
}

const DOT_SIZE = 12; // --renge-space-3 equivalent, Fibonacci×3
const LINE_OFFSET = DOT_SIZE / 2; // centers the connector line on the dot

const statusColor: Record<TimelineItemStatus, string> = {
  completed: 'var(--renge-color-success)',
  active:    'var(--renge-color-accent)',
  pending:   'var(--renge-color-border)',
};

export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(
  function Timeline({ style, children, ...props }, ref) {
    return (
      <ol
        ref={ref}
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--renge-space-4)',
          ...style,
        }}
        {...props}
      >
        {children}
      </ol>
    );
  }
);

export function TimelineItem({
  title,
  description,
  timestamp,
  status = 'pending',
  icon,
  style,
}: TimelineItemProps) {
  const dotColor = statusColor[status];

  return (
    <li
      style={{
        display: 'flex',
        gap: 'var(--renge-space-3)',
        position: 'relative',
        ...style,
      }}
    >
      {/* Dot + connector column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        {/* Dot — phi-sized circle */}
        <div
          style={{
            width: DOT_SIZE,
            height: DOT_SIZE,
            borderRadius: 'var(--renge-radius-full)',
            background: dotColor,
            border: status === 'pending' ? `2px solid var(--renge-color-border)` : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            zIndex: 1,
            transition: `background var(--renge-duration-3) var(--renge-easing-spring)`,
          }}
        >
          {icon && (
            <span style={{ color: 'white', fontSize: '8px', lineHeight: 1, display: 'flex' }}>
              {icon}
            </span>
          )}
        </div>
        {/* Connector line — extends down, hidden for last item via CSS */}
        <div
          aria-hidden="true"
          style={{
            width: 1,
            flex: 1,
            minHeight: 'var(--renge-space-4)',
            background: `linear-gradient(to bottom, ${dotColor}, var(--renge-color-border-subtle))`,
            marginTop: 'var(--renge-space-1)',
            opacity: 0.5,
          }}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: 'var(--renge-space-4)', minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--renge-space-3)', marginBottom: 'var(--renge-space-1)' }}>
          <span style={{ fontWeight: 500, fontSize: 'var(--renge-font-size-base)', color: 'var(--renge-color-fg)' }}>
            {title}
          </span>
          {timestamp && (
            <span style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {timestamp}
            </span>
          )}
        </div>
        {description && (
          <p style={{ margin: 0, fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-subtle)', lineHeight: 'var(--renge-line-height-base)' }}>
            {description}
          </p>
        )}
      </div>
    </li>
  );
}
