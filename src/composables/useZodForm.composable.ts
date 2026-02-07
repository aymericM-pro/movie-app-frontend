import { reactive } from 'vue';
import type { ZodIssue, ZodSchema } from 'zod';

export function useZodForm<T extends Record<string, any>>(
    schema: ZodSchema<T>,
    initialValues: T,
) {
    const form = reactive({ ...initialValues }) as T;

    const errors = reactive<Record<string, string>>({});
    const touched = reactive<Record<string, boolean>>(
        Object.keys(initialValues).reduce(
            (acc, key) => {
                acc[key] = false;
                return acc;
            },
            {} as Record<string, boolean>,
        ),
    );

    const validateField = (field: string) => {
        const result = schema.safeParse(form);

        if (result.success) {
            delete errors[field];
            return true;
        }

        const issue = result.error.issues.find((i) => i.path[0] === field);

        if (issue) {
            errors[field] = issue.message;
            return false;
        }

        delete errors[field];
        return true;
    };

    const validateAll = () => {
        Object.keys(touched).forEach((k) => (touched[k] = true));

        const result = schema.safeParse(form);

        if (result.success) {
            Object.keys(errors).forEach((k) => delete errors[k]);
            return true;
        }

        result.error.issues.forEach((issue: ZodIssue) => {
            const key = issue.path[0];
            if (typeof key === 'string') {
                errors[key] = issue.message;
            }
        });

        return false;
    };

    const onBlur = (field: string) => {
        touched[field] = true;
        validateField(field);
    };

    return {
        form,
        errors,
        touched,
        onBlur,
        validateField,
        validateAll,
    };
}
