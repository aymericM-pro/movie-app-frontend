import { z } from 'zod';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/core/stores/auth.store';
import { useNavigation } from '@/composables/navigation.composable.ts';
import { AppRoute } from '@/router';
import { useZodForm } from '@/composables/useZodForm.composable.ts';

type Mode = 'login' | 'register';

export function useAuthForm(mode: Mode) {
    const { t } = useI18n();
    const authStore = useAuthStore();
    const { goTo } = useNavigation();

    const base = {
        email: z.string().email(t('auth.invalidEmail')),
        password: z.string().min(6, t('auth.passwordMin')),
    };

    const schema =
        mode === 'register'
            ? z
                  .object({
                      ...base,
                      username: z.string().min(3, t('auth.usernameMin')),
                      confirmPassword: z.string().min(6),
                  })
                  .refine((data) => data.password === data.confirmPassword, {
                      path: ['confirmPassword'],
                      message: t('auth.passwordsMismatch'),
                  })
            : z.object(base);

    const initialValues =
        mode === 'register'
            ? {
                  email: '',
                  username: '',
                  password: '',
                  confirmPassword: '',
              }
            : {
                  email: '',
                  password: '',
              };

    const { form, errors, touched, onBlur, validateAll } = useZodForm(
        schema,
        initialValues,
    );

    const submit = () => {
        if (!validateAll()) return;

        // mock auth
        authStore.login(form.email);
        goTo(AppRoute.HOME);
    };

    return {
        form,
        errors,
        touched,
        onBlur,
        submit,
    };
}
