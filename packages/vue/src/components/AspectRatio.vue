<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { PHI } from '@renge-ui/tokens';

interface AspectRatioProps {
  ratio?: number;
}

const props = withDefaults(defineProps<AspectRatioProps>(), {
  ratio: PHI,
});

const outerStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  paddingBottom: `${(1 / props.ratio) * 100}%`,
};

const innerStyle: CSSProperties = {
  position: 'absolute',
  inset: '0',
  width: '100%',
  height: '100%',
};
</script>

<template>
  <div :style="outerStyle" v-bind="$attrs">
    <div :style="innerStyle">
      <slot />
    </div>
  </div>
</template>
