<script setup lang="ts">
import ThemeToggle from "@/features/theme/components/ThemeToggle.vue";
</script>

<template>
  <div class="relative min-h-screen w-full bg-light-bg dark:bg-dark-bg">
    <div class="absolute top-[129px] right-[168px]">
      <ThemeToggle />
    </div>

    <router-view />
  </div>
</template>
