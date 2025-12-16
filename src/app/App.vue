<script setup lang="ts">
import { RouterView } from "vue-router";

import MasterLayout from "./layouts/MasterLayout.vue";
</script>

<template>
  <div
    id="app"
    class="min-h-screen bg-base-100 text-neutral"
  >
    <main class="max-w-full mx-auto">
      <MasterLayout><RouterView /></MasterLayout>
    </main>
  </div>
</template>
