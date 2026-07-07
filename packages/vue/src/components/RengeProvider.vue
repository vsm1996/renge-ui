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

const { switchProfile, switchMode } = useRengeTheme({
  profile: props.profile,
  mode: props.mode,
});

onMounted(() => {
  switchProfile(props.profile);
  switchMode(props.mode);
});
</script>

<template>
  <slot />
</template>
