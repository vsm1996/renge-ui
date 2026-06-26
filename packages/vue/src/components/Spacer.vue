<script setup lang="ts">
interface SpacerProps {
  size?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
  axis?: 'vertical' | 'horizontal';
}

const props = withDefaults(defineProps<SpacerProps>(), {
  size: '4',
  axis: 'vertical',
});

const token = `var(--renge-space-${props.size})`;

const spacerStyle = {
  display: 'block',
  flexShrink: 0,
  width: props.axis === 'horizontal' ? token : '100%',
  height: props.axis === 'vertical' ? token : undefined,
  minWidth: props.axis === 'horizontal' ? token : undefined,
  minHeight: props.axis === 'vertical' ? token : undefined,
};
</script>

<template>
  <div aria-hidden="true" :style="spacerStyle" v-bind="$attrs" />
</template>
