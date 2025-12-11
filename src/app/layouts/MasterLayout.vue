<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import AuthLayout from "./AuthLayout.vue";
import DefaultLayout from "./DefaultLayout.vue";

const route = useRoute();

const layouts = {
  auth: AuthLayout,
  default: DefaultLayout,
};

const layoutComponent = computed(() => {
  const layoutKey = (route.meta.layout as keyof typeof layouts) || "default";
  return layouts[layoutKey];
});
</script>

<template>
  <component :is="layoutComponent">
    <slot />
  </component>
</template>
