import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

if (typeof document !== 'undefined') {
  const id = '__renge-stepper-css__';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
[data-renge-stepper-step] {
  transition: opacity var(--renge-duration-1) var(--renge-easing-ease-out) !important;
}
[data-renge-stepper-step]:not(:disabled):hover {
  opacity: 0.85 !important;
}
[data-renge-stepper-step]:focus-visible {
  outline: none !important;
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--renge-color-accent) 25%, transparent) !important;
  border-radius: var(--renge-radius-1) !important;
}`;
    document.head.appendChild(s);
  }
}

export interface StepperProps extends ComponentPropsWithoutRef<'div'> {
  steps: Array<{ label: string; description?: string }>;
  currentStep?: number;
  onStepChange?: (step: number) => void;
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, currentStep = 0, onStepChange, ...props }, ref) => {
    return (
      <div ref={ref} role="list" {...props}>
        <div style={{ display: 'flex', gap: 'var(--renge-space-4)', alignItems: 'flex-start' }}>
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;
            const isPending = idx > currentStep;
            return (
              <button
                key={idx}
                type="button"
                role="listitem"
                data-renge-stepper-step=""
                aria-current={isCurrent ? 'step' : undefined}
                disabled={!onStepChange}
                onClick={() => onStepChange?.(idx)}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--renge-space-2)',
                  opacity: isPending ? 0.5 : 1,
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: onStepChange ? 'pointer' : 'default',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--renge-space-2)' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      flexShrink: 0,
                      background: isCompleted || isCurrent ? 'var(--renge-color-accent)' : 'var(--renge-color-bg-subtle)',
                      color: isCompleted || isCurrent ? 'var(--renge-color-bg)' : 'var(--renge-color-fg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'var(--renge-font-size-sm)',
                      fontWeight: 600,
                    }}
                  >
                    {isCompleted ? '✓' : idx + 1}
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      style={{
                        flex: 1,
                        height: '2px',
                        background: isCompleted ? 'var(--renge-color-accent)' : 'var(--renge-color-border-subtle)',
                        transition: 'background var(--renge-duration-2)',
                      }}
                    />
                  )}
                </div>
                <div>
                  <div style={{ fontSize: 'var(--renge-font-size-sm)', fontWeight: 600, color: 'var(--renge-color-fg)' }}>
                    {step.label}
                  </div>
                  {step.description && (
                    <div style={{ fontSize: 'var(--renge-font-size-xs)', color: 'var(--renge-color-fg-muted)' }}>
                      {step.description}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

Stepper.displayName = 'Stepper';
