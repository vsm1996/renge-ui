<script setup lang="ts">
import { ref } from 'vue';

interface SkipLinkProps {
  href?: string;
  label?: string;
}

const props = withDefaults(defineProps<SkipLinkProps>(), {
  href: '#main',
  label: 'Skip to main content',
});

const topPosition = ref('-40px');

const getStyle = () => ({
  position: 'absolute',
  top: topPosition.value,
  left: 0,
  background: 'var(--renge-color-accent)',
  color: 'var(--renge-color-bg)',
  padding: 'var(--renge-space-2) var(--renge-space-3)',
  textDecoration: 'none',
  borderRadius: 'var(--renge-radius-2)',
  zIndex: 100,
});

const handleFocus = () => {
  topPosition.value = '0';
};

const handleBlur = () => {
  topPosition.value = '-40px';
};
</script>

<template>
  <a :href="props.href" :style="getStyle()" @focus="handleFocus" @blur="handleBlur" v-bind="$attrs">
    {{ props.label }}
  </a>
</template>
