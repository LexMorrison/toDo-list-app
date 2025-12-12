<script setup lang="ts">
import { computed } from "vue";

import { useThemeStore } from "../store/useThemeStore";

const themeStore = useThemeStore();
const isOn = computed(() => themeStore.theme === "dark");

const toggle = () => {
  themeStore.toggleTheme();
};
</script>

<template>
  <div
    class="w-16 h-8 rounded-[100px] flex items-center relative cursor-pointer transition-colors
    duration-300"
    :class="isOn ? 'bg-light-pureBlack' : ' bg-light-pureWhite'"
    @click="toggle"
  >
    <div
      class="rounded-full w-7 h-7 absolute transition-all duration-300"
      :class="isOn ? 'translate-x-8 bg-light-pureWhite' : 'translate-x-1  bg-light-pureBlack'"
    />
  </div>
</template>
