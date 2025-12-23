<script setup lang="ts">
import LoginForm from "./LoginForm.vue";

import Logo from "@/shared/ui/common/Logo.vue";
</script>

<template>
  <div class="flex flex-col items-center ">
    <!-- logo and title -->
    <div class="mb-[13px] flex flex-col">
      <Logo />
      <h1
        class="mt-[2px] text-light-charcoalBlack dark:text-dark-pureWhite font-semibold text-[32px]"
      >
        entrance
      </h1>
    </div>
    <LoginForm />
  </div>
</template>
