<script lang="ts">
  import { onMount } from "svelte";
  import { switchProfile, switchMode } from "../stores/theme";

  export let profile: string = "clear";
  export let mode: "light" | "dark" = "light";

  onMount(() => {
    switchProfile(profile);
    switchMode(mode);
  });
</script>

<slot />

<style>
  /* RengeProvider is a wrapper component that applies theme context */
</style>
