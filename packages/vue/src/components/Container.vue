<script setup lang="ts">
interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  px?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
}

const props = withDefaults(defineProps<ContainerProps>(), {
  size: 'lg',
  px: '5',
});

const maxWidthMap = {
  sm: 'var(--renge-container-sm)',
  md: 'var(--renge-container-md)',
  lg: 'var(--renge-container-lg)',
  xl: 'var(--renge-container-xl)',
  full: 'var(--renge-container-full)',
};

const containerStyle = {
  width: '100%',
  maxWidth: maxWidthMap[props.size],
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: `var(--renge-space-${props.px})`,
  paddingRight: `var(--renge-space-${props.px})`,
};
</script>

<template>
  <div :style="containerStyle" v-bind="$attrs">
    <slot />
  </div>
</template>
