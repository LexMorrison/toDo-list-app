<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";

import AuthLayout from "./AuthLayout.vue";
import DefaultLayout from "./DefaultLayout.vue";

import { useThemeStore } from "@/features/theme/store/useThemeStore";

const route = useRoute();

const themeStore = useThemeStore();

const layouts = {
  auth: AuthLayout,
  default: DefaultLayout,
};

const layoutComponent = computed(() => {
  const layoutKey = (route.meta.layout as keyof typeof layouts) || "default";
  return layouts[layoutKey];
});

watch(
  () => themeStore.theme,
  (theme) => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  },
  { immediate: true },
);
</script>

<template>
  <component :is="layoutComponent">
    <router-view />
  </component>
</template>
