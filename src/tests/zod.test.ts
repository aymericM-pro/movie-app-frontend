import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { useZodForm } from '@/composables/useZodForm.composable';

const schema = z.object({
    email: z.string().email('email invalide'),
    password: z.string().min(6, 'mot de passe trop court'),
});

describe('useZodForm', () => {
    it('initialise le formulaire correctement', () => {
        const { form, errors, touched } = useZodForm(schema, {
            email: '',
            password: '',
        });

        expect(form.email).toBe('');
        expect(errors).toEqual({});
        expect(touched.email).toBe(false);
        expect(touched.password).toBe(false);
    });

    it('valide un champ invalide', () => {
        const { form, errors, validateField } = useZodForm(schema, {
            email: '',
            password: '',
        });

        form.email = 'not-an-email';
        const valid = validateField('email');

        expect(valid).toBe(false);
        expect(errors.email).toBe('email invalide');
    });

    it('supprime l’erreur quand le champ devient valide', () => {
        const { form, errors, validateField } = useZodForm(schema, {
            email: '',
            password: '',
        });

        form.email = 'bad';
        validateField('email');

        form.email = 'test@mail.com';
        validateField('email');

        expect(errors.email).toBeUndefined();
    });

    it('onBlur marque le champ comme touché', () => {
        const { form, touched, errors, onBlur } = useZodForm(schema, {
            email: '',
            password: '',
        });

        form.email = 'bad';
        onBlur('email');

        expect(touched.email).toBe(true);
        expect(errors.email).toBeDefined();
    });

    it('validateAll marque tous les champs et retourne false si invalide', () => {
        const { touched, errors, validateAll } = useZodForm(schema, {
            email: '',
            password: '',
        });

        const valid = validateAll();

        expect(valid).toBe(false);
        expect(touched.email).toBe(true);
        expect(touched.password).toBe(true);
        expect(errors.email).toBeDefined();
        expect(errors.password).toBeDefined();
    });

    it('validateAll retourne true si tout est valide', () => {
        // @ts-ignore
        const { _, errors, validateAll } = useZodForm(schema, {
            email: 'test@mail.com',
            password: '123456',
        });

        const valid = validateAll();

        expect(valid).toBe(true);
        expect(errors).toEqual({});
    });
});
