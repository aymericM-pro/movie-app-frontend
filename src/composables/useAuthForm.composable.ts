import { z } from 'zod';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/core/stores/auth.store';
import { useNavigation } from '@/composables/navigation.composable';
import { AppRoute } from '@/router';
import { useZodForm } from '@/composables/useZodForm.composable';

type Mode = 'login' | 'register';

type LoginForm = {
    email: string;
    password: string;
    rememberMe?: boolean;
};

type RegisterForm = {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
    newsletter?: boolean;
};

export function useAuthForm(mode: Mode) {
    const { t } = useI18n();
    const authStore = useAuthStore();
    const { goTo } = useNavigation();

    const base = {
        email: z.string().email(t('auth.invalidEmail')),
        password: z.string().min(6, t('auth.passwordMin')),
    };

    const loginSchema = z.object({
        ...base,
        rememberMe: z.boolean().optional(),
    });

    const registerSchema = z
        .object({
            ...base,
            username: z.string().min(3, t('auth.usernameMin')),
            confirmPassword: z.string().min(6),
            acceptTerms: z.boolean().refine((v) => v === true, {
                message: t('auth.mustAcceptTerms'),
            }),
            newsletter: z.boolean().optional(),
        })
        .refine((data) => data.password === data.confirmPassword, {
            path: ['confirmPassword'],
            message: t('auth.passwordsMismatch'),
        });

    if (mode === 'login') {
        const { form, errors, touched, onBlur, validateAll } =
            useZodForm<LoginForm>(loginSchema, {
                email: '',
                password: '',
                rememberMe: false,
            });

        const submit = async () => {
            if (!validateAll()) return;

            await authStore.login({
                email: form.email,
                password: form.password,
                rememberMe: form.rememberMe,
            });

            goTo(AppRoute.HOME);
        };

        return { form, errors, touched, onBlur, submit };
    }

    // REGISTER
    const { form, errors, touched, onBlur, validateAll } =
        useZodForm<RegisterForm>(registerSchema, {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            acceptTerms: false as true,
            newsletter: false,
        });

    const submit = async () => {
        if (!validateAll()) return;

        await authStore.register({
            email: form.email,
            username: form.username,
            password: form.password,
            newsletter: form.newsletter,
        });

        goTo(AppRoute.HOME);
    };

    return { form, errors, touched, onBlur, submit };
}
