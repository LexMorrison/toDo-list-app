<script setup lang="ts">
import RegistrationForm from "./RegistrationForm.vue";

import Logo from "@/shared/ui/common/Logo.vue";
</script>

<template>
  <section
    class="mx-auto flex flex-col items-center border rounded-[32px] py-3 px-10 w-fit
    bg-dark-pureWhite dark:bg-dark-charcoalNavy shadow-formLight dark:border-transparent"
  >
    <Logo />
    <h1
      class="text-[32px] text-light-charcoalBlack dark:text-dark-pureWhite font-semibold
      mt-[6px] mb-[18px]"
    >
      Registration
    </h1>
    <RegistrationForm />
  </section>
</template>
