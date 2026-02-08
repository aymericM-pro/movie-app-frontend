<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { AppRoute } from '@/router';
import { useAuthForm } from '@/composables/useAuthForm.composable';

import msInput from '@/core/design-system/msInput.component.vue';
import msButton from '@/core/design-system/msButton.component.vue';

const { t } = useI18n();
const { form, errors, touched, onBlur, submit } = useAuthForm('login');
</script>

<template>
    <div
        class="flex min-h-screen items-center justify-center bg-black text-white"
    >
        <div class="w-full max-w-md space-y-6 rounded-xl bg-neutral-900 p-8">
            <h1 class="text-2xl font-semibold">
                {{ t('auth.login') }}
            </h1>

            <!-- EMAIL -->
            <div class="space-y-1">
                <ms-input
                    v-model="form.email"
                    :placeholder="t('auth.email')"
                    type="email"
                    @blur="onBlur('email')"
                />
                <p
                    v-if="touched.email && errors.email"
                    class="text-sm text-red-400"
                >
                    {{ errors.email }}
                </p>
            </div>

            <!-- PASSWORD -->
            <div class="space-y-1">
                <ms-input
                    v-model="form.password"
                    :placeholder="t('auth.password')"
                    type="password"
                    @blur="onBlur('password')"
                />
                <p
                    v-if="touched.password && errors.password"
                    class="text-sm text-red-400"
                >
                    {{ errors.password }}
                </p>
            </div>

            <!-- SUBMIT -->
            <ms-button
                :label="t('auth.login')"
                class="w-full"
                size="lg"
                @click="submit"
            />

            <!-- REGISTER LINK -->
            <p class="text-center text-sm text-white/60">
                {{ t('auth.noAccount') }}
                <router-link
                    :to="{ name: AppRoute.REGISTER }"
                    class="underline hover:text-white"
                >
                    {{ t('auth.register') }}
                </router-link>
            </p>
        </div>
    </div>
</template>
