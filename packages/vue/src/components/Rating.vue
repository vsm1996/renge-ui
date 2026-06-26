<script setup lang="ts">
export interface RatingProps {
  value?: number
  max?: number
  readonly?: boolean
}

const props = withDefaults(defineProps<RatingProps>(), {
  value: 0,
  max: 5,
  readonly: false,
})

const emit = defineEmits<{
  change: [value: number]
}>()
</script>

<template>
  <div :style="{ display: 'inline-flex', gap: 'var(--renge-space-2)' }" v-bind="$attrs">
    <button
      v-for="idx in max"
      :key="idx - 1"
      type="button"
      :disabled="readonly"
      :style="{
        background: 'transparent',
        border: 'none',
        cursor: readonly ? 'default' : 'pointer',
        fontSize: 'var(--renge-font-size-2xl)',
      }"
      @click="!readonly && emit('change', idx)"
    >
      {{ idx - 1 < value ? '★' : '☆' }}
    </button>
  </div>
</template>
