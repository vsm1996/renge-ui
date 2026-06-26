// packages/react/src/components/ButtonGroup.tsx
//
// Groups related buttons into a single visual unit. Internal buttons share
// borders and have their radii flattened on touching edges — only the
// outermost edges keep their curvature.

import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export interface ButtonGroupProps extends ComponentPropsWithoutRef<'div'> {
  /** Visual orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Border radius for outer edges */
  radius?: 'none' | '1' | '2' | '3' | 'full';
  /** Attach children with negative margin (no gap) */
  attached?: boolean;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  function ButtonGroup(
    { orientation = 'horizontal', radius = '2', attached: _attached = true, style, children, ...props },
    ref
  ) {
    const radiusVal = `var(--renge-radius-${radius})`;
    const isH = orientation === 'horizontal';

    return (
      <div
        ref={ref}
        role="group"
        data-button-group
        style={{
          display: 'inline-flex',
          flexDirection: isH ? 'row' : 'column',
          ...style,
          // CSS custom properties to communicate radius to children
          ['--bg-group-radius' as string]: radiusVal,
          ['--bg-group-orient' as string]: orientation,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// Consumers compose like:
//   <ButtonGroup>
//     <Button style={{ borderRadius: '...' }}>A</Button>
//     <Button style={{ borderRadius: '...' }}>B</Button>
//   </ButtonGroup>
//
// To flatten middle radii, use the ButtonGroupItem helper:

export interface ButtonGroupItemProps extends ComponentPropsWithoutRef<'div'> {
  /** 1-indexed position within the group */
  position: 'first' | 'middle' | 'last' | 'only';
  orientation?: 'horizontal' | 'vertical';
  radius?: 'none' | '1' | '2' | '3' | 'full';
}

export function ButtonGroupItem({
  position: _position,
  orientation: _orientation = 'horizontal',
  radius: _radius = '2',
  style,
  children,
  ...props
}: ButtonGroupItemProps) {
  return (
    <div style={{ display: 'contents', ...style }} {...props}>
      {children}
    </div>
  );
}
