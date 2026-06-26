<script setup lang="ts">
import { ref, inject, computed, onMounted } from 'vue'

export interface AccordionItemProps {
  id: string
  title: string
}

const props = defineProps<AccordionItemProps>()

const ctx = inject<any>('accordion', null)
const contentEl = ref<HTMLDivElement>()
const scrollHeight = ref(0)

const isOpen = computed(() => ctx?.openIds.value.has(props.id) ?? false)

onMounted(() => {
  if (contentEl.value) {
    scrollHeight.value = contentEl.value.scrollHeight
  }
})

const handleClick = () => {
  ctx?.toggle(props.id)
}
</script>

<template>
  <div :style="{ borderBottom: '1px solid var(--renge-color-border-subtle)' }" v-bind="$attrs">
    <button
      type="button"
      :style="{
        width: '100%',
        padding: 'var(--renge-space-4)',
        textAlign: 'left',
        background: 'transparent',
        border: 'none',
        color: 'var(--renge-color-fg)',
        fontSize: 'var(--renge-font-size-base)',
        fontWeight: 500,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all var(--renge-duration-2) var(--renge-easing-ease-out)',
      }"
      @click="handleClick"
    >
      <span>{{ title }}</span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :style="{ transform: `rotate(${isOpen ? '180deg' : '0'})`, transition: 'transform var(--renge-duration-2)' }"
        aria-hidden="true"
      >
        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <div
      ref="contentEl"
      :style="{
        maxHeight: isOpen ? scrollHeight + 'px' : '0',
        overflow: 'hidden',
        transition: `max-height var(--renge-duration-3) var(--renge-easing-ease-out)`,
      }"
    >
      <div :style="{ padding: '0 var(--renge-space-4) var(--renge-space-4)' }">
        <slot />
      </div>
    </div>
  </div>
</template>
