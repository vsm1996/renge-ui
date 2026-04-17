// packages/react/src/components/Tooltip.tsx
//
// Hover tooltip. Appears with spring easing. Offset uses var(--renge-space-1)
// so the gap is always Fibonacci-proportioned relative to the trigger.

import { forwardRef, useState, useRef, type ComponentPropsWithoutRef, type ReactNode, type CSSProperties } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends Omit<ComponentPropsWithoutRef<'div'>, 'content'> {
  content: ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
}

// Inject tooltip keyframes
if (typeof document !== 'undefined') {
  const id = '__renge-tooltip-kf__';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
@keyframes rengeTooltipIn {
  from { opacity: 0; transform: var(--renge-tt-from, translateY(-4px)) scale(0.95); }
  to   { opacity: 1; transform: var(--renge-tt-to, translateY(0)) scale(1); }
}`;
    document.head.appendChild(s);
  }
}

const placementStyles = (placement: TooltipPlacement): CSSProperties => {
  switch (placement) {
    case 'top':    return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 'var(--renge-space-1)' };
    case 'bottom': return { top: '100%',    left: '50%', transform: 'translateX(-50%)', marginTop:    'var(--renge-space-1)' };
    case 'left':   return { right: '100%',  top: '50%',  transform: 'translateY(-50%)', marginRight:  'var(--renge-space-1)' };
    case 'right':  return { left: '100%',   top: '50%',  transform: 'translateY(-50%)', marginLeft:   'var(--renge-space-1)' };
  }
};

const originTransforms: Record<TooltipPlacement, string> = {
  top:    '--4px',
  bottom: '4px',
  left:   '0px',
  right:  '0px',
};

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip({ content, placement = 'top', delay = 0, style, children, ...props }, ref) {
    const [visible, setVisible] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const show = () => {
      if (delay > 0) {
        timer.current = setTimeout(() => setVisible(true), delay);
      } else {
        setVisible(true);
      }
    };

    const hide = () => {
      if (timer.current) clearTimeout(timer.current);
      setVisible(false);
    };

    const translateVar = placement === 'top' ? 'translateY(-4px)' :
                         placement === 'bottom' ? 'translateY(4px)' :
                         placement === 'left' ? 'translateX(-4px)' :
                         'translateX(4px)';

    return (
      <div
        ref={ref}
        style={{ position: 'relative', display: 'inline-flex', ...style }}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        {...props}
      >
        {children}
        {visible && (
          <div
            role="tooltip"
            style={{
              position: 'absolute',
              zIndex: 1000,
              ...placementStyles(placement),
              background: 'var(--renge-color-bg-inverse)',
              color: 'var(--renge-color-fg-inverse)',
              padding: 'var(--renge-space-1) var(--renge-space-3)',
              borderRadius: 'var(--renge-radius-2)',
              fontSize: 'var(--renge-font-size-sm)',
              lineHeight: 'var(--renge-line-height-sm)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              animation: `rengeTooltipIn var(--renge-duration-2) var(--renge-easing-spring) both`,
              ['--renge-tt-from' as string]: translateVar,
              ['--renge-tt-to' as string]: 'translateY(0) translateX(0)',
            }}
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);
