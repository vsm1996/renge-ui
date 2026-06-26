<script setup lang="ts">
export interface BreadcrumbItemProps {
  current?: boolean
  href?: string
}

withDefaults(defineProps<BreadcrumbItemProps>(), {
  current: false,
})

const handleMouseEnter = (e: any) => {
  if (e.currentTarget) {
    e.currentTarget.style.color = 'var(--renge-color-accent-hover)'
    e.currentTarget.style.textDecoration = 'underline'
  }
}

const handleMouseLeave = (e: any) => {
  if (e.currentTarget) {
    e.currentTarget.style.color = 'var(--renge-color-accent)'
    e.currentTarget.style.textDecoration = 'none'
  }
}
</script>

<template>
  <li>
    <span v-if="!href || current" :style="{ color: current ? 'var(--renge-color-fg)' : 'var(--renge-color-fg-subtle)', fontWeight: current ? 500 : undefined }" :aria-current="current ? 'page' : undefined" v-bind="$attrs">
      <slot />
    </span>
    <a v-else :href="href" :style="{ color: 'var(--renge-color-accent)', textDecoration: 'none', transition: 'color var(--renge-duration-1) var(--renge-easing-ease-out)' }" v-bind="$attrs" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <slot />
    </a>
  </li>
</template>

<style scoped>
:global(li) {
  display: flex;
  align-items: center;
}
</style>
