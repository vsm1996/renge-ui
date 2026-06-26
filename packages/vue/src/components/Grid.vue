<script setup lang="ts">
interface GridProps {
  columns?: number | string;
  rows?: number | string;
  gap?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  gapX?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  gapY?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'stretch';
}

const props = withDefaults(defineProps<GridProps>(), {
  columns: 1,
  gap: '3',
  align: 'stretch',
  justify: 'stretch',
});

const getTemplate = (value: number | string | undefined) => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return `repeat(${value}, 1fr)`;
  return value;
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: getTemplate(props.columns),
  gridTemplateRows: getTemplate(props.rows),
  columnGap: props.gapX ? `var(--renge-space-${props.gapX})` : `var(--renge-space-${props.gap})`,
  rowGap: props.gapY ? `var(--renge-space-${props.gapY})` : `var(--renge-space-${props.gap})`,
  alignItems: props.align,
  justifyItems: props.justify,
};
</script>

<template>
  <div :style="gridStyle" v-bind="$attrs">
    <slot />
  </div>
</template>
