<script setup lang="ts">
interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  color?: 'fg' | 'fg-subtle' | 'accent';
  animation?: string;
}

const props = withDefaults(defineProps<HeadingProps>(), {
  level: 2,
  color: 'fg',
});

const defaultSizeForLevel = {
  1: '3xl' as const,
  2: '2xl' as const,
  3: 'xl' as const,
  4: 'lg' as const,
  5: 'lg' as const,
  6: 'lg' as const,
};

const resolvedSize = props.size ?? defaultSizeForLevel[props.level];

const headingStyle = {
  fontSize: `var(--renge-font-size-${resolvedSize})`,
  lineHeight: `var(--renge-line-height-${resolvedSize})`,
  color: `var(--renge-color-${props.color})`,
  fontWeight: 600,
  margin: 0,
  animation: props.animation ? `var(--renge-animation-${props.animation})` : undefined,
};

const component = `h${props.level}` as const;
</script>

<template>
  <component :is="component" :style="headingStyle" v-bind="$attrs">
    <slot />
  </component>
</template>
