import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export type AvatarSize = '1' | '2' | '3' | '4' | '5';
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps extends ComponentPropsWithoutRef<'div'> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
}

// True Fibonacci sizes: FIBONACCI[3..7] × 4px = 20, 32, 52, 84, 136
// Consecutive ratios converge to φ: 32/20=1.6, 52/32=1.625, 84/52=1.615, 136/84=1.619
const sizePx: Record<AvatarSize, number> = {
  '1': 20,
  '2': 32,
  '3': 52,
  '4': 84,
  '5': 136,
};

const fontSizeFor: Record<AvatarSize, string> = {
  '1': 'var(--renge-font-size-xs)',
  '2': 'var(--renge-font-size-sm)',
  '3': 'var(--renge-font-size-base)',
  '4': 'var(--renge-font-size-lg)',
  '5': 'var(--renge-font-size-xl)',
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar(
    { src, alt, initials, size = '3', shape = 'circle', style, ...props },
    ref
  ) {
    const px = sizePx[size];
    const radius = shape === 'circle' ? 'var(--renge-radius-full)' : 'var(--renge-radius-3)';
    const label = initials ? initials.slice(0, 2).toUpperCase() : undefined;

    return (
      <div
        ref={ref}
        aria-label={alt}
        role={alt ? 'img' : undefined}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: px,
          height: px,
          borderRadius: radius,
          overflow: 'hidden',
          flexShrink: 0,
          background: src ? undefined : 'var(--renge-color-bg-muted)',
          color: 'var(--renge-color-fg-inverse)',
          fontSize: fontSizeFor[size],
          fontWeight: 600,
          userSelect: 'none',
          ...style,
        }}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt ?? ''}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          label
        )}
      </div>
    );
  }
);
