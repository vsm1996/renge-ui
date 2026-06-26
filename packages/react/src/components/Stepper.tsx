import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export interface StepperProps extends ComponentPropsWithoutRef<'div'> {
  steps: Array<{ label: string; description?: string }>;
  currentStep?: number;
  onStepChange?: (step: number) => void;
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, currentStep = 0, onStepChange, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        <div style={{ display: 'flex', gap: 'var(--renge-space-4)', alignItems: 'flex-start' }}>
          {steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--renge-space-2)',
                opacity: idx <= currentStep ? 1 : 0.5,
              }}
              onClick={() => onStepChange?.(idx)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--renge-space-2)' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: idx <= currentStep ? 'var(--renge-color-accent)' : 'var(--renge-color-bg-subtle)',
                    color: idx <= currentStep ? 'var(--renge-color-bg)' : 'var(--renge-color-fg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--renge-font-size-sm)',
                    fontWeight: 600,
                  }}
                >
                  {idx <= currentStep ? '✓' : idx + 1}
                </div>
                {idx < steps.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: '2px',
                      background: idx < currentStep ? 'var(--renge-color-accent)' : 'var(--renge-color-border-subtle)',
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
            </div>
          ))}
        </div>
      </div>
    );
  }
);

Stepper.displayName = 'Stepper';
