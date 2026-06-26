<script setup lang="ts">
interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: '1' | '2' | '3' | '4' | '5';
  shape?: 'circle' | 'square';
}

const props = withDefaults(defineProps<AvatarProps>(), {
  size: '3',
  shape: 'circle',
});

const sizePx = {
  '1': 20,
  '2': 32,
  '3': 52,
  '4': 84,
  '5': 136,
};

const fontSizeFor = {
  '1': 'var(--renge-font-size-xs)',
  '2': 'var(--renge-font-size-sm)',
  '3': 'var(--renge-font-size-base)',
  '4': 'var(--renge-font-size-lg)',
  '5': 'var(--renge-font-size-xl)',
};

const px = sizePx[props.size];
const radius = props.shape === 'circle' ? 'var(--renge-radius-full)' : 'var(--renge-radius-3)';
const label = props.initials ? props.initials.slice(0, 2).toUpperCase() : undefined;

const avatarStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: `${px}px`,
  height: `${px}px`,
  borderRadius: radius,
  overflow: 'hidden',
  flexShrink: 0,
  background: props.src ? undefined : 'var(--renge-color-bg-muted)',
  color: 'var(--renge-color-fg-inverse)',
  fontSize: fontSizeFor[props.size],
  fontWeight: 600,
  userSelect: 'none',
};

const imgStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
};
</script>

<template>
  <div :style="avatarStyle" :aria-label="alt" :role="alt ? 'img' : undefined" v-bind="$attrs">
    <img v-if="src" :src="src" :alt="alt ?? ''" :style="imgStyle" />
    <span v-else>{{ label }}</span>
  </div>
</template>
