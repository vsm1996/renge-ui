<script setup lang="ts">
interface AlertProps {
  status?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
}

const props = withDefaults(defineProps<AlertProps>(), {
  status: 'info',
});

const alertStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: props.title ? 'var(--renge-space-1)' : undefined,
  padding: 'var(--renge-space-3) var(--renge-space-4)',
  borderRadius: 'var(--renge-radius-2)',
  borderLeft: `3px solid var(--renge-color-${props.status})`,
  background: `var(--renge-color-${props.status}-subtle)`,
  color: 'var(--renge-color-fg)',
};

const titleStyle = {
  fontSize: 'var(--renge-font-size-sm)',
  fontWeight: 600,
  color: 'var(--renge-color-fg)',
};

const contentStyle = {
  fontSize: 'var(--renge-font-size-sm)',
  color: 'var(--renge-color-fg)',
};
</script>

<template>
  <div :style="alertStyle" role="alert" v-bind="$attrs">
    <strong v-if="title" :style="titleStyle">{{ title }}</strong>
    <span :style="contentStyle">
      <slot />
    </span>
  </div>
</template>
