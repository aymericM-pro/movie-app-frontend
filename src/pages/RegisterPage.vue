<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { AppRoute } from '@/router';
import { useAuthForm } from '@/composables/useAuthForm.composable';

const { t } = useI18n();

const { form, errors, touched, onBlur, submit } = useAuthForm('register');
</script>

<template>
    <div
        class="flex min-h-screen items-center justify-center bg-black text-white"
    >
        <div class="w-full max-w-md space-y-6 rounded-xl bg-neutral-900 p-8">
            <h1 class="text-2xl font-semibold">
                {{ t('auth.login') }}
            </h1>

            <div>
                <input
                    v-model="form.email"
                    :placeholder="t('auth.email')"
                    class="w-full rounded-lg bg-black px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-white/30"
                    type="email"
                    @blur="onBlur('email')"
                />
                <p
                    v-if="touched.email && errors.email"
                    class="mt-1 text-sm text-red-400"
                >
                    {{ errors.email }}
                </p>
            </div>

            <div>
                <input
                    v-model="form.password"
                    :placeholder="t('auth.password')"
                    class="w-full rounded-lg bg-black px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-white/30"
                    type="password"
                    @blur="onBlur('password')"
                />
                <p
                    v-if="touched.password && errors.password"
                    class="mt-1 text-sm text-red-400"
                >
                    {{ errors.password }}
                </p>
            </div>

            <button
                class="w-full rounded-lg bg-white py-3 font-medium text-black transition hover:bg-white/90"
                @click="submit"
            >
                {{ t('auth.login') }}
            </button>

            <p class="text-center text-sm text-white/60">
                {{ t('auth.noAccount') }}
                <router-link
                    :to="{ name: AppRoute.REGISTER }"
                    class="underline"
                >
                    {{ t('auth.register') }}
                </router-link>
            </p>
        </div>
    </div>
</template>
