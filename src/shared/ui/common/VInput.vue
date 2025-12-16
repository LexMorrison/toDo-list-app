<script setup lang="ts">
import { computed, useAttrs } from "vue";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  type?: string;
}>();

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: "update:modelValue", value: string): void;
  // eslint-disable-next-line no-unused-vars
  (e: "blur", ev: FocusEvent): void;
}>();

const attrs = useAttrs();

const value = computed({
  get: () => props.modelValue,
  set: (val: string) => emit("update:modelValue", val),
});

const clear = () => {
  emit("update:modelValue", "");
};
</script>

<template>
  <div class="relative">
    <!-- Left slot -->
    <div
      v-if="$slots.left"
      class="absolute left-3 top-1/2 -translate-y-1/2 text-dark-mutedLavenderGray"
    >
      <slot name="left" />
    </div>

    <!-- Input -->
    <input
      v-model="value"
      :type="type || 'text'"
      :placeholder="placeholder"
      v-bind="attrs"
      class="w-full rounded border py-[15px] pl-10 pr-20"
      @blur="emit('blur', $event)"
    >

    <!-- Right actions -->
    <div
      v-if="modelValue || $slots.right"
      class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2"
    >
      <!-- Clear -->
      <button
        v-if="modelValue"
        type="button"
        class="text-light-charcoalBlack hover:text-light-pureBlack
        dark:text-dark-mutedLavenderGray dark:hover:text-dark-darkSlateGray"
        @click.prevent="clear"
      >
        ✕
      </button>


      <slot name="right" />
    </div>
  </div>
</template>
