import { onMounted, ref } from 'vue';
import type { PopularCollection } from '@/types/collection.types';
import { useCollectionsApi } from '@/services/collections-api.service.ts';

export function useCollections() {
    const collections = ref<PopularCollection[]>([]);
    const searchQuery = ref('');
    const loading = ref(false);
    const collectionsApiService = useCollectionsApi();

    const loadCollections = async () => {
        loading.value = true;
        try {
            collections.value =
                await collectionsApiService.getPopularCollections();
        } finally {
            loading.value = false;
        }
    };

    const searchCollections = async () => {
        const query = searchQuery.value.trim();

        if (!query) {
            await loadCollections();
            return;
        }

        loading.value = true;
        try {
            collections.value =
                await collectionsApiService.searchCollections(query);
        } finally {
            loading.value = false;
        }
    };

    onMounted(loadCollections);

    return {
        collections,
        searchQuery,
        loading,
        loadCollections,
        searchCollections,
    };
}
