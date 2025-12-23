<script setup lang="ts">
import { PhEye, PhEyeSlash, PhUser, PhLock } from "@phosphor-icons/vue";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { reactive, ref, computed, watch } from "vue";
import { RouterLink } from "vue-router";

import { tokenManager } from "@/shared/api";
import { useApiPost } from "@/shared/composables/useApi";
import VButton from "@/shared/ui/common/VButton.vue";
import VInput from "@/shared/ui/common/VInput.vue";

type Login = {
  email: string;
  password: string;
};

type LoginResponce = {
  accessToken: string;
};

const form = reactive<Login>({
  email: "",
  password: "",
});

const showPassword = ref(false);

const passwordRegex = helpers.withMessage("Invalid password", (value: string) =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value ?? ""),
);

const rules = computed(() => ({
  email: { required, email },
  password: { required, passwordRegex },
}));
const v$ = useVuelidate(rules, form);

const { execute, loading, error, reset } = useApiPost<LoginResponce, Login>("/auth/login", {
  skipAuth: true,
});

const handleLogin = async () => {
  v$.value.$touch();
  const validation = await v$.value.$validate();
  if (!validation) return;

  const data = await execute({ data: { ...form } });
  if (!data) return;

  tokenManager.setTokens({
    accessToken: data.accessToken,
  } as any);
};

watch(
  () => ({ ...form }),
  () => {
    reset();
  },
);
</script>

<template>
  <form
    class="flex flex-col border rounded-[32px] pt-[60px] pb-[30px] px-10 w-fit
    bg-dark-pureWhite dark:bg-dark-charcoalNavy shadow-formLight dark:border-transparent"
    @submit.prevent="handleLogin"
  >
    <!-- Email -->
    <div class="mb-[54px]">
      <label
        for="email"
        class="sr-only"
      >
        Email
      </label>
      <VInput
        id="email"
        v-model.trim="form.email"
        type="email"
        placeholder="Email"
        class="border rounded-xl w-[340px] h-12 bg-light-neutralGray outline-none
        dark:text-dark-mutedLavenderGray placeholder:text-light-mustedSteelBlue
        placeholder:font-semibold placeholder:dark:text-dark-mutedLavenderGray
        dark:bg-dark-veryDarkGrayBlue"
        :class="
          v$.email.$error
            ? 'border-light-brightRed'
            : 'border-light-coolLightGray dark:border-dark-darkSlateGray'
        "
        autocomplete="email"
        @blur="v$.email.$touch()"
        @update:model-value="v$.email.$reset()"
      >
        <template #left>
          <PhUser :size="20" />
        </template>
      </VInput>
    </div>

    <!-- Password -->
    <div class="mb-[25px]">
      <label
        for="password"
        class="sr-only"
      >
        Password
      </label>
      <VInput
        id="password"
        v-model="form.password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Password"
        class="border rounded-xl w-[340px] h-12 bg-light-neutralGray outline-none
        dark:text-dark-mutedLavenderGray placeholder:text-light-mustedSteelBlue
        placeholder:font-semibold placeholder:dark:text-dark-mutedLavenderGray
        dark:bg-dark-veryDarkGrayBlue"
        :class="
          v$.password.$error
            ? 'border-light-brightRed'
            : 'border-light-coolLightGray dark:border-dark-darkSlateGray'
        "
        @blur="v$.password.$touch()"
        @update:model-value="v$.password.$reset()"
      >
        <template #left>
          <PhLock :size="20" />
        </template>

        <template #right>
          <VButton
            type="button"
            class="flex items-center text-light-charcoalBlack
            hover:text-light-pureBlack dark:text-dark-mutedLavenderGray
            dark:hover:text-dark-darkSlateGray"
            @click="showPassword = !showPassword"
          >
            <component
              :is="showPassword ? PhEyeSlash : PhEye"
              :size="20"
            />
          </VButton>
        </template>
      </VInput>
    </div>
    <div class="flex flex-col items-center gap-3">
      <p
        class="text-sm text-light-brightRed text-center transition-opacity duration-200
        min-h-[20px]"
        :class="error ? 'opacity-100' : 'opacity-0'"
      >
        Email or password are incorrect.
      </p>
      <VButton
        type="submit"
        class="w-[340px] shadow-submitLight bg-light-warmOrange rounded-xl h-[54px] text-[18px]
        font-semibold text-light-pureWhite cursor-pointer dark:shadow-submitDark
        dark:bg-submit-dark"
        :disabled="loading"
      >
        {{ loading ? "Loading..." : "Enter" }}
      </VButton>
      <RouterLink
        to="/registration"
        class="text-[14px] font-semibold text-light-deepSlateBlue"
      >
        No account? To create
      </RouterLink>
    </div>
  </form>
</template>
