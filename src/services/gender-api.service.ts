import { ref } from 'vue';
import { ApiClient } from '@/services/baseServiceApi';

export interface Gender {
    id: number;
    name: string;
}

export function useGendersApi() {
    const api = new ApiClient();
    const loading = ref(false);
    const error = ref<string | null>(null);

    const call = async <T>(fn: () => Promise<T>): Promise<T> => {
        loading.value = true;
        error.value = null;
        try {
            return await fn();
        } catch (e) {
            error.value = 'Erreur API genres';
            throw e;
        } finally {
            loading.value = false;
        }
    };

    const getGenres = (language = 'fr-FR') =>
        call<Gender[]>(() => api.request('/genders', { language }));

    return {
        loading,
        error,
        getGenres,
    };
}
