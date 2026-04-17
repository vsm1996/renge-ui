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
    { orientation = 'horizontal', radius = '2', attached = true, style, children, ...props },
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
  position,
  orientation = 'horizontal',
  radius = '2',
  style,
  children,
  ...props
}: ButtonGroupItemProps) {
  const r = `var(--renge-radius-${radius})`;
  const isH = orientation === 'horizontal';
  const none = '0px';

  const radiusCSS = (() => {
    if (position === 'only') return { borderRadius: r };
    if (position === 'first') return isH
      ? { borderTopLeftRadius: r, borderBottomLeftRadius: r, borderTopRightRadius: none, borderBottomRightRadius: none }
      : { borderTopLeftRadius: r, borderTopRightRadius: r, borderBottomLeftRadius: none, borderBottomRightRadius: none };
    if (position === 'last') return isH
      ? { borderTopLeftRadius: none, borderBottomLeftRadius: none, borderTopRightRadius: r, borderBottomRightRadius: r }
      : { borderTopLeftRadius: none, borderTopRightRadius: none, borderBottomLeftRadius: r, borderBottomRightRadius: r };
    // middle
    return { borderRadius: none };
  })();

  return (
    <div style={{ display: 'contents', ...style }} {...props}>
      {children}
    </div>
  );
}
