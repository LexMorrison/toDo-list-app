<script setup lang="ts">
import { PhEye, PhEnvelope, PhEyeSlash, PhUser, PhLock } from "@phosphor-icons/vue";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers, sameAs, minLength } from "@vuelidate/validators";
import axios from "axios";
import { reactive, ref, computed } from "vue";
import { RouterLink } from "vue-router";

import VInput from "@/shared/ui/common/VInput.vue";

const form = reactive({ name: "", email: "", password: "", confirmPassword: "" });

const showPassword = ref(false);
const ConfirmShowPassword = ref(false);
const requiredPassword = helpers.withMessage("Password is required", required);

const passwordComplexity = helpers.withMessage(
  "Minimum 8 characters. Must contain at least one number and one letter",
  (value: string) => {
    if (!value) return true;
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
  },
);

const rules = computed(() => ({
  name: { required, minLength: minLength(2) },
  email: { required, email },
  password: { required: requiredPassword, passwordComplexity },
  confirmPassword: { required, sameAs: sameAs(() => form.password) },
}));

const v$ = useVuelidate(rules, form);

const handleRegistration = async () => {
  v$.value.$touch();
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  try {
    const { data } = await axios.post(
      "https://todolistbackend-z85b.onrender.com/api/auth/register",
      {
        email: form.email,
        password: form.password,
        name: form.name,
      },
    );
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <form @submit.prevent="handleRegistration">
    <!-- name -->
    <div class="mb-5">
      <label
        for="name"
        class="sr-only"
      >
        Name
      </label>
      <VInput
        id="name"
        v-model.trim="form.name"
        type="text"
        placeholder="Name"
        class="border border-light-coolLightGray rounded-xl w-[340px] h-12 bg-light-neutralGray
        outline-none dark:text-dark-mutedLavenderGray
        placeholder:text-light-mustedSteelBlue placeholder:font-semibold
        placeholder:dark:text-dark-mutedLavenderGray
         dark:bg-dark-veryDarkGrayBlue dark:border-dark-darkSlateGray"
        @blur="v$.name.$touch()"
      >
        <template #left>
          <PhUser :size="20" />
        </template>
      </VInput>
      <p class="ml-4 mt-0.5 text-[10px] text-light-brightRed min-h-[14px]">
        <span v-if="v$.name.$error && v$.name.required.$invalid">Name is required</span>
        <span v-else-if="v$.name.$error && v$.name.minLength.$invalid">
          Name must be at least 2 characters
        </span>
      </p>
    </div>
    <!-- email -->
    <div class="mb-5">
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
        class="border border-light-coolLightGray rounded-xl w-[340px] h-12 bg-light-neutralGray
        outline-none dark:text-dark-mutedLavenderGray
        placeholder:text-light-mustedSteelBlue placeholder:font-semibold
        placeholder:dark:text-dark-mutedLavenderGray
        dark:bg-dark-veryDarkGrayBlue dark:border-dark-darkSlateGray"
        autocomplete="email"
        @blur="v$.email.$touch()"
      >
        <template #left>
          <PhEnvelope :size="20" />
        </template>
      </VInput>
      <p class="ml-4 mt-0.5 text-[10px] text-light-brightRed min-h-[14px]">
        <span v-if="v$.email.$error && v$.email.required.$invalid">Email is required</span>
        <span v-else-if="v$.email.$error && v$.email.email.$invalid"> Invalid email address </span>
      </p>
    </div>
    <!-- password -->
    <div class="mb-5">
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
        class="border border-light-coolLightGray rounded-xl w-[340px] h-12 bg-light-neutralGray
        outline-none dark:text-dark-mutedLavenderGray
        placeholder:text-light-mustedSteelBlue placeholder:font-semibold
        placeholder:dark:text-dark-mutedLavenderGray
        dark:bg-dark-veryDarkGrayBlue dark:border-dark-darkSlateGray"
        @blur="v$.password.$touch()"
      >
        <template #left>
          <PhLock :size="20" />
        </template>

        <template #right>
          <button
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
          </button>
        </template>
      </VInput>
      <p class="ml-4 mt-0.5 text-[10px] text-light-brightRed min-h-[14px]">
        <span v-if="v$.password.$error && v$.password.required.$invalid">
          Password is required</span>
        <span v-else-if="v$.password.$error && v$.password.passwordComplexity.$invalid">
          Minimum 8 characters. Must contain at least one number and one letter</span>
      </p>
    </div>
    <!-- confirm password -->
    <div class="mb-5">
      <label
        for="confirmPassword"
        class="sr-only"
      >
        Confirm Password
      </label>
      <VInput
        id="confirmPassword"
        v-model="form.confirmPassword"
        :type="ConfirmShowPassword ? 'text' : 'password'"
        placeholder="Confirm Password"
        class="border border-light-coolLightGray rounded-xl w-[340px] h-12 bg-light-neutralGray
        outline-none dark:text-dark-mutedLavenderGray
        placeholder:text-light-mustedSteelBlue placeholder:font-semibold
        placeholder:dark:text-dark-mutedLavenderGray
        dark:bg-dark-veryDarkGrayBlue dark:border-dark-darkSlateGray"
        autocomplete="current-password"
        @blur="v$.confirmPassword.$touch()"
      >
        <template #left>
          <PhLock :size="20" />
        </template>

        <template #right>
          <button
            type="button"
            class="flex items-center text-light-charcoalBlack
            hover:text-light-pureBlack dark:text-dark-mutedLavenderGray
            dark:hover:text-dark-darkSlateGray"
            @click="ConfirmShowPassword = !ConfirmShowPassword"
          >
            <component
              :is="ConfirmShowPassword ? PhEyeSlash : PhEye"
              :size="20"
            />
          </button>
        </template>
      </VInput>
      <p class="ml-4 mt-0.5 text-[10px] text-light-brightRed min-h-[14px]">
        <span v-if="v$.confirmPassword.$error && v$.confirmPassword.required.$invalid">
          Confirm password is required</span>
        <span v-else-if="v$.confirmPassword.$error && v$.confirmPassword.sameAs.$invalid">
          Password don't match with Confirm password</span>
      </p>
    </div>
    <div class="flex flex-col items-center gap-1">
      <!-- create acc button -->
      <button
        type="submit"
        class="w-[340px] shadow-submitLight bg-light-warmOrange rounded-xl h-[54px] text-[18px]
        font-semibold text-light-pureWhite cursor-pointer dark:shadow-submitDark
        dark:bg-submit-dark"
      >
        Create an account
      </button>
      <!-- navLink -->
      <RouterLink
        to="/login"
        class="text-[14px] font-semibold text-light-deepSlateBlue"
      >
        No account? To create
      </RouterLink>
    </div>
  </form>
</template>
