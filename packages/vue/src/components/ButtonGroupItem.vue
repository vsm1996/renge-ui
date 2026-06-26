<script setup lang="ts">
export interface ButtonGroupItemProps {
  position?: 'first' | 'middle' | 'last' | 'only'
  orientation?: 'horizontal' | 'vertical'
  radius?: 'none' | '1' | '2' | '3' | 'full'
}

withDefaults(defineProps<ButtonGroupItemProps>(), {
  position: 'only',
  orientation: 'horizontal',
  radius: '2',
})
</script>

<template>
  <div :style="{ display: 'contents' }" v-bind="$attrs">
    <slot />
  </div>
</template>
