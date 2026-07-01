<script setup lang="ts">
import { useRengeTheme } from "../composables/useRengeTheme";
import { onMounted } from "vue";

interface Props {
  profile?: string;
  mode?: "light" | "dark";
}

const props = withDefaults(defineProps<Props>(), {
  profile: "ocean",
  mode: "light",
});

const { switchProfile, switchMode } = useRengeTheme();

onMounted(() => {
  switchProfile(props.profile);
  switchMode(props.mode);
});
</script>

<template>
  <slot />
</template>

<style scoped>
/* RengeProvider is a wrapper component that applies theme context */
</style>
