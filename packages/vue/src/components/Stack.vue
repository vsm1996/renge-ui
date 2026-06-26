<script setup lang="ts">
interface StackProps {
  gap?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
  direction?: 'vertical' | 'horizontal';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
}

const props = withDefaults(defineProps<StackProps>(), {
  gap: '3',
  direction: 'vertical',
  align: 'stretch',
  justify: 'start',
});

const alignMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

const justifyMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
};

const stackStyle = {
  display: 'flex',
  flexDirection: props.direction === 'vertical' ? 'column' : 'row',
  gap: `var(--renge-space-${props.gap})`,
  alignItems: alignMap[props.align],
  justifyContent: justifyMap[props.justify],
};
</script>

<template>
  <div :style="stackStyle" v-bind="$attrs">
    <slot />
  </div>
</template>
