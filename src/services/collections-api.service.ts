import { ref } from 'vue';
import { ApiClient } from '@/services/baseServiceApi';
import type {
    CollectionDetails,
    PopularCollection,
} from '@/types/collection.types';

export function useCollectionsApi() {
    const api = new ApiClient();
    const loading = ref(false);
    const error = ref<string | null>(null);

    const call = async <T>(fn: () => Promise<T>): Promise<T> => {
        loading.value = true;
        error.value = null;
        try {
            return await fn();
        } catch (e) {
            error.value = 'Erreur API collections';
            throw e;
        } finally {
            loading.value = false;
        }
    };

    const getPopularCollections = () =>
        call<PopularCollection[]>(() => api.request('/collections/popular'));

    const searchCollections = (query: string) =>
        call<PopularCollection[]>(() =>
            api.request('/collections/search', { query }),
        );

    const getCollectionDetails = (id: number) =>
        call<CollectionDetails>(() => api.request(`/collections/${id}`));

    return {
        loading,
        error,
        getPopularCollections,
        searchCollections,
        getCollectionDetails,
    };
}
