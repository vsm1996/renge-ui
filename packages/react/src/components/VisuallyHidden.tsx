import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export type VisuallyHiddenProps = ComponentPropsWithoutRef<'span'>;

export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  (props, ref) => (
    <span
      ref={ref}
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: 0,
      }}
      {...props}
    />
  )
);

VisuallyHidden.displayName = 'VisuallyHidden';
