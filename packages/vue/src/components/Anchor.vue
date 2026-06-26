<script setup lang="ts">
import { ref } from 'vue';

interface AnchorProps {
  variant?: 'default' | 'subtle' | 'plain';
  underline?: boolean;
}

const props = withDefaults(defineProps<AnchorProps>(), {
  variant: 'default',
  underline: false,
});

const colorMap = {
  default: 'var(--renge-color-accent)',
  subtle: 'var(--renge-color-fg-subtle)',
  plain: 'inherit',
};

const isHovered = ref(false);

const anchorStyle = {
  color: isHovered.value ? 'var(--renge-color-accent-hover)' : colorMap[props.variant],
  textDecoration: isHovered.value || props.underline ? 'underline' : 'none',
  textDecorationColor: 'var(--renge-color-accent)',
  textUnderlineOffset: '3px',
  transition: `color var(--renge-duration-1) var(--renge-easing-ease-out), text-decoration-color var(--renge-duration-1) var(--renge-easing-ease-out)`,
  cursor: 'pointer',
};
</script>

<template>
  <a
    :style="anchorStyle"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    v-bind="$attrs"
  >
    <slot />
  </a>
</template>
