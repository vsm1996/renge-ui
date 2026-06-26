<script setup lang="ts">
interface SectionProps {
  padding?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
  paddingX?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
  paddingY?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none';
  center?: boolean;
  animation?: string;
}

const props = withDefaults(defineProps<SectionProps>(), {
  paddingX: '4',
  paddingY: '6',
  maxWidth: 'lg',
  center: true,
});

const maxWidthMap = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  full: '100%',
  none: undefined,
};

const sectionStyle = {
  paddingInline: props.padding ? `var(--renge-space-${props.padding})` : `var(--renge-space-${props.paddingX})`,
  paddingBlock: props.padding ? `var(--renge-space-${props.padding})` : `var(--renge-space-${props.paddingY})`,
  maxWidth: maxWidthMap[props.maxWidth],
  marginInline: props.center ? 'auto' : undefined,
  animation: props.animation ? `var(--renge-animation-${props.animation})` : undefined,
};
</script>

<template>
  <section :style="sectionStyle" v-bind="$attrs">
    <slot />
  </section>
</template>
