<script setup lang="ts">
interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  spacing?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  color?: 'border' | 'border-subtle';
}

const props = withDefaults(defineProps<DividerProps>(), {
  orientation: 'horizontal',
  spacing: '3',
  color: 'border-subtle',
});

const isHorizontal = props.orientation === 'horizontal';

const dividerStyle = {
  border: 'none',
  backgroundColor: `var(--renge-color-${props.color})`,
  ...(isHorizontal
    ? {
        height: '1px',
        width: '100%',
        marginBlock: `var(--renge-space-${props.spacing})`,
      }
    : {
        width: '1px',
        height: '100%',
        marginInline: `var(--renge-space-${props.spacing})`,
      }),
};
</script>

<template>
  <hr :style="dividerStyle" v-bind="$attrs" />
</template>
