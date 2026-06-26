<script setup lang="ts">
import { computed } from 'vue'

export interface PaginationProps {
  total: number
  page: number
  siblings?: number
  showEdges?: boolean
}

const props = withDefaults(defineProps<PaginationProps>(), {
  siblings: 1,
  showEdges: true,
})

const emit = defineEmits<{
  change: [page: number]
}>()

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

function getPages(total: number, page: number, siblings: number): (number | string)[] {
  const totalDisplayed = siblings * 2 + 5
  if (total <= totalDisplayed) return range(1, total)

  const leftSib = Math.max(page - siblings, 2)
  const rightSib = Math.min(page + siblings, total - 1)
  const showLeft = leftSib > 2
  const showRight = rightSib < total - 1

  const middle = range(leftSib, rightSib)

  return [1, ...(showLeft ? ['...'] : []), ...middle, ...(showRight ? ['...'] : []), total]
}

const pages = computed(() => getPages(props.total, props.page, props.siblings))

const buttonStyle = (active: boolean, disabled: boolean) => ({
  minWidth: 'var(--renge-space-5)',
  height: 'var(--renge-space-5)',
  padding: '0 var(--renge-space-2)',
  borderRadius: 'var(--renge-radius-1)',
  border: active ? '1px solid var(--renge-color-accent)' : '1px solid transparent',
  background: active ? 'var(--renge-color-accent)' : 'transparent',
  color: active
    ? 'var(--renge-color-fg-inverse)'
    : 'var(--renge-color-fg-subtle)',
  fontSize: 'var(--renge-font-size-sm)',
  fontFamily: 'inherit',
  cursor: disabled ? 'default' : 'pointer',
  opacity: disabled ? 0.4 : 1,
  transition: `all var(--renge-duration-1) var(--renge-easing-ease-out)`,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontVariantNumeric: 'tabular-nums',
})
</script>

<template>
  <nav
    aria-label="Pagination"
    :style="{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--renge-space-1)',
    }"
    v-bind="$attrs"
  >
    <!-- Previous -->
    <button :disabled="page <= 1" :style="buttonStyle(false, page <= 1)" @click="emit('change', page - 1)">
      ←
    </button>

    <!-- Pages -->
    <template v-for="(p, i) in pages" :key="`page-${i}`">
      <span
        v-if="p === '...'"
        :style="{
          width: 'var(--renge-space-4)',
          textAlign: 'center',
          color: 'var(--renge-color-fg-muted)',
          fontSize: 'var(--renge-font-size-sm)',
          userSelect: 'none',
        }"
        aria-hidden="true"
      >
        …
      </span>
      <button
        v-else
        :aria-current="p === page ? 'page' : undefined"
        :style="buttonStyle(p === page, false)"
        @click="emit('change', p as number)"
      >
        {{ p }}
      </button>
    </template>

    <!-- Next -->
    <button :disabled="page >= total" :style="buttonStyle(false, page >= total)" @click="emit('change', page + 1)">
      →
    </button>
  </nav>
</template>
