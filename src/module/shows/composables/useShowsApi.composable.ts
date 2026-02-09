import { ref } from 'vue';
import type {
    TvCollectionType,
    TvDetailsApiResponse,
    TvSearchResponse,
} from '@/module/shows/models/shows.model.ts';
import { ApiClient } from '@/services/baseServiceApi';

export function useShowsApi() {
    const api = new ApiClient();

    const loading = ref(false);
    const error = ref<string | null>(null);

    const call = async <T>(fn: () => Promise<T>): Promise<T> => {
        loading.value = true;
        error.value = null;

        try {
            return await fn();
        } catch (e) {
            error.value = 'Erreur API TV';
            throw e;
        } finally {
            loading.value = false;
        }
    };

    const getTvCollection = (
        type: TvCollectionType,
        page = 1,
        language = 'fr-FR',
    ) =>
        call<TvSearchResponse>(() =>
            api.request(`/tmdb/tv/${type}`, {
                page,
                language,
            }),
        );

    const getTvDetails = (tvId: number, language = 'fr-FR') =>
        call<TvDetailsApiResponse>(() =>
            api.request(`/tmdb/tv/${tvId}/details`, {
                language,
            }),
        );

    return {
        loading,
        error,
        getTvCollection,
        getTvDetails,
    };
}
