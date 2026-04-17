// packages/react/src/components/Slider.tsx
//
// Range slider. The track uses a Fibonacci-height strip. Optional phi markers
// show the natural subdivision points (0.382 and 0.618) — the golden section.
// PHI markers divide the range at exactly the golden ratio from both ends.

import { forwardRef, type ComponentPropsWithoutRef } from 'react';

// Inject thumb/track styles once (can't do ::-webkit-slider-thumb in inline styles)
if (typeof document !== 'undefined') {
  const id = '__renge-slider-styles__';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
.renge-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  cursor: pointer;
  background: transparent;
  outline: none;
}
.renge-slider::-webkit-slider-runnable-track {
  height: 4px;
  background: var(--renge-color-border);
  border-radius: var(--renge-radius-full);
}
.renge-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  margin-top: -7px;
  border-radius: var(--renge-radius-full);
  background: var(--renge-color-accent);
  border: 2px solid var(--renge-color-bg);
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  transition: box-shadow var(--renge-duration-1) var(--renge-easing-ease-out);
}
.renge-slider::-webkit-slider-thumb:hover {
  box-shadow: 0 0 0 4px var(--renge-color-accent-subtle);
}
.renge-slider::-moz-range-track {
  height: 4px;
  background: var(--renge-color-border);
  border-radius: var(--renge-radius-full);
}
.renge-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: var(--renge-radius-full);
  background: var(--renge-color-accent);
  border: 2px solid var(--renge-color-bg);
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  cursor: pointer;
}
.renge-slider:focus-visible::-webkit-slider-thumb {
  box-shadow: 0 0 0 3px var(--renge-color-border-focus);
}
@media (hover: none) and (pointer: coarse) {
  .renge-slider::-webkit-slider-thumb {
    width: 28px;
    height: 28px;
    margin-top: -12px;
  }
  .renge-slider::-moz-range-thumb {
    width: 28px;
    height: 28px;
  }
}`;
    document.head.appendChild(s);
  }
}

export interface SliderProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  /** Show golden ratio marker lines at 0.382 and 0.618 of the range */
  showPhiMarkers?: boolean;
  label?: string;
  showValue?: boolean;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  function Slider({ showPhiMarkers = false, label, showValue = false, style, min = 0, max = 100, value, defaultValue, ...props }, ref) {
    const numMin = Number(min);
    const numMax = Number(max);
    const numVal = value !== undefined ? Number(value) : defaultValue !== undefined ? Number(defaultValue) : numMin;

    // Golden section points: 0.382 (1 - 1/φ) and 0.618 (1/φ)
    const phi382 = numMin + (numMax - numMin) * 0.382;
    const phi618 = numMin + (numMax - numMin) * 0.618;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--renge-space-2)', ...style }}>
        {(label || showValue) && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {label && (
              <span style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-fg-subtle)' }}>
                {label}
              </span>
            )}
            {showValue && (
              <span style={{ fontSize: 'var(--renge-font-size-sm)', color: 'var(--renge-color-accent)', fontVariantNumeric: 'tabular-nums' }}>
                {numVal}
              </span>
            )}
          </div>
        )}
        <div style={{ position: 'relative' }}>
          <input
            ref={ref}
            type="range"
            className="renge-slider"
            min={min}
            max={max}
            value={value}
            defaultValue={defaultValue}
            {...props}
          />
          {/* PHI markers */}
          {showPhiMarkers && (
            <div style={{ position: 'relative', marginTop: 'var(--renge-space-1)', height: 8, pointerEvents: 'none' }}>
              {[phi382, phi618].map((point) => {
                const pct = ((point - numMin) / (numMax - numMin)) * 100;
                return (
                  <div
                    key={point}
                    style={{
                      position: 'absolute',
                      left: `${pct}%`,
                      top: 0,
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <div style={{ width: 1, height: 6, background: 'var(--renge-color-accent)', opacity: 0.5 }} />
                    <span style={{ fontSize: '9px', color: 'var(--renge-color-fg-muted)', lineHeight: 1 }}>
                      {point === phi382 ? 'φ⁻¹' : 'φ⁻²'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
);
