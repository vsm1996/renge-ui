<script setup lang="ts">
interface TextProps {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  color?: 'fg' | 'fg-subtle' | 'fg-muted' | 'accent' | 'success' | 'warning' | 'danger';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  animation?: string;
}

const props = withDefaults(defineProps<TextProps>(), {
  size: 'base',
  color: 'fg',
  weight: 'normal',
});

const weightMap = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const textStyle = {
  fontSize: `var(--renge-font-size-${props.size})`,
  lineHeight: `var(--renge-line-height-${props.size})`,
  color: `var(--renge-color-${props.color})`,
  fontWeight: weightMap[props.weight],
  textAlign: props.align,
  animation: props.animation ? `var(--renge-animation-${props.animation})` : undefined,
};
</script>

<template>
  <span :style="textStyle" v-bind="$attrs">
    <slot />
  </span>
</template>
