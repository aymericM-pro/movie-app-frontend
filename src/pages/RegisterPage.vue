<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { AppRoute } from '@/router';
import { useAuthForm } from '@/composables/useAuthForm.composable';

import msInput from '@/core/design-system/msInput.component.vue';
import msButton from '@/core/design-system/msButton.component.vue';
import msLink from '@/core/design-system/msLink.component.vue';

const { t } = useI18n();
const { form, errors, touched, onBlur, submit } = useAuthForm('register');
</script>

<template>
    <div
        class="flex min-h-screen items-center justify-center bg-black text-white"
    >
        <div class="w-full max-w-md space-y-6 rounded-xl bg-neutral-900 p-8">
            <h1 class="text-2xl font-semibold">
                {{ t('auth.register') }}
            </h1>

            <!-- EMAIL -->
            <div class="space-y-1">
                <msInput
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

            <!-- USERNAME -->
            <div class="space-y-1">
                <msInput
                    v-model="form.username"
                    :placeholder="t('auth.username')"
                    @blur="onBlur('username')"
                />
                <p
                    v-if="touched.username && errors.username"
                    class="text-sm text-red-400"
                >
                    {{ errors.username }}
                </p>
            </div>

            <!-- PASSWORD -->
            <div class="space-y-1">
                <msInput
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

            <!-- CONFIRM PASSWORD -->
            <div class="space-y-1">
                <msInput
                    v-model="form.confirmPassword"
                    :placeholder="t('auth.confirmPassword')"
                    type="password"
                    @blur="onBlur('confirmPassword')"
                />
                <p
                    v-if="touched.confirmPassword && errors.confirmPassword"
                    class="text-sm text-red-400"
                >
                    {{ errors.confirmPassword }}
                </p>
            </div>

            <!-- SUBMIT -->
            <msButton
                :label="t('auth.register')"
                class="w-full"
                size="lg"
                @click="submit"
            />

            <!-- LOGIN LINK -->
            <p class="flex justify-center gap-2 text-sm text-white/60">
                <span>{{ t('auth.haveAccount') }}</span>
                <msLink :label="t('auth.login')" :to="AppRoute.LOGIN" />
            </p>
        </div>
    </div>
</template>
