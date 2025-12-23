<script setup lang="ts">
const props = defineProps<{
  type?: "submit" | "button" ;
  disabled?: boolean;
}>();
</script>
<template>
  <button
    :type="props.type ?? 'button'"
    :disabled="props.disabled"
  >
    <slot />
  </button>
</template>
