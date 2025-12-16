<script setup lang="ts">
import { PhEye, PhEyeSlash, PhUser, PhLock } from "@phosphor-icons/vue";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import axios from "axios";
import { reactive, ref, computed, watch } from "vue";
import { RouterLink } from "vue-router";

import VInput from "@/shared/ui/common/VInput.vue";

const form = reactive({
  email: "",
  password: "",
});

const showPassword = ref(false);

const validationError = ref(false);

const passwordRegex = helpers.withMessage("Invalid password", (value: string) =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value ?? ""),
);

const rules = computed(() => ({
  email: { required, email },
  password: { required, passwordRegex },
}));
const v$ = useVuelidate(rules, form);

const handleSubmit = async () => {
  validationError.value = false;

  const ok = await v$.value.$validate();

  if (!ok) {
    validationError.value = true;
    return;
  }

  try {
    const { data } = await axios.post("https://todolistbackend-z85b.onrender.com/api/auth/login", {
      ...form,
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

watch(
  () => ({ ...form }),
  () => {
    validationError.value = false;
  },
);
</script>

<template>
  <form
    class="flex flex-col border rounded-[32px] pt-[60px] pb-[30px] px-10 w-fit bg-dark-pureWhite
    dark:bg-dark-charcoalNavy shadow-formLight"
    @submit.prevent="handleSubmit"
  >
    <!-- Email -->
    <div class="mb-[54px]">
      <VInput
        v-model.trim="form.email"
        type="email"
        placeholder="Email"
        class="border border-light-coolLightGray rounded-xl w-[340px] h-12 bg-light-neutralGray
        outline-none dark:text-dark-mutedLavenderGray placeholder:text-light-mustedSteelBlue
         placeholder:font-semibold placeholder:dark:text-dark-mutedLavenderGray
         dark:bg-dark-veryDarkGrayBlue dark:border-dark-darkSlateGray"
        autocomplete="email"
        @blur="v$.email.$touch()"
      >
        <template #left>
          <PhUser :size="20" />
        </template>
      </VInput>
    </div>

    <!-- Password -->
    <div class="mb-[25px]">
      <VInput
        v-model="form.password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Password"
        class="border border-light-coolLightGray rounded-xl w-[340px] h-12 bg-light-neutralGray
        outline-none dark:text-dark-mutedLavenderGray placeholder:text-light-mustedSteelBlue
        placeholder:font-semibold placeholder:dark:text-dark-mutedLavenderGray
        dark:bg-dark-veryDarkGrayBlue dark:border-dark-darkSlateGray"
        autocomplete="current-password"
        @blur="v$.password.$touch()"
      >
        <template #left>
          <PhLock :size="20" />
        </template>

        <template #right>
          <button
            type="button"
            class="flex items-center text-light-charcoalBlack hover:text-light-pureBlack
            dark:text-dark-mutedLavenderGray dark:hover:text-dark-darkSlateGray"
            @click="showPassword = !showPassword"
          >
            <component
              :is="showPassword ? PhEyeSlash : PhEye"
              :size="20"
            />
          </button>
        </template>
      </VInput>
    </div>
    <div class="flex flex-col items-center gap-3">
      <p
        class="text-sm text-red-500 text-center transition-opacity duration-200 min-h-[20px]"
        :class="validationError ? 'opacity-100' : 'opacity-0'"
      >
        Email or password are incorrect.
      </p>
      <button
        type="submit"
        class="w-[340px] shadow-submitLight bg-light-warmOrange rounded-xl h-[54px] text-[18px]
        font-semibold text-light-pureWhite cursor-pointer dark:shadow-submitDark
        dark:bg-submit-dark"
      >
        Войти
      </button>
      <RouterLink
        to="/registration"
        class="text-[14px] font-semibold text-light-deepSlateBlue"
      >
        No account? To create
      </RouterLink>
    </div>
  </form>
</template>
