import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import type {
    CollectionDetails,
    PopularCollection,
} from '@/types/collection.types';
import type { Movie, MoviesResponse } from '@/types/movie.types';
import { useCollectionsApi } from '@/services/collections-api.service.ts';

export function useCollections() {
    const route = useRoute();
    const collectionService = useCollectionsApi();
    /* -------------------- State -------------------- */

    const collections = ref<PopularCollection[]>([]);
    const collection = ref<CollectionDetails | null>(null);

    const searchQuery = ref('');
    const loading = ref(false);

    /* -------------------- List -------------------- */

    const loadCollections = async () => {
        loading.value = true;
        try {
            collections.value = await collectionService.getPopularCollections();
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
                await collectionService.searchCollections(query);
        } finally {
            loading.value = false;
        }
    };

    /* -------------------- Detail -------------------- */

    const loadCollectionDetail = async () => {
        loading.value = true;
        try {
            const id = Number(route.params.id);
            if (!id) return;

            collection.value = await collectionService.getCollectionDetails(id);
        } finally {
            loading.value = false;
        }
    };

    /* -------------------- Derived (DETAIL) -------------------- */

    const stats = computed(() => {
        if (!collection.value) return null;

        const years = collection.value.parts
            .map((p) => p.release_date)
            .filter(Boolean)
            .map((d) => new Date(d!).getFullYear())
            .sort((a, b) => a - b);

        return {
            filmsCount: collection.value.parts.length,
            yearRange:
                years.length > 0
                    ? `${years[0]}-${years[years.length - 1]}`
                    : '',
        };
    });

    const moviesFetcher = computed<(() => Promise<MoviesResponse>) | null>(
        () => {
            if (!collection.value) return null;

            const movies: Movie[] = collection.value.parts.map((p) => ({
                id: p.id,
                title: p.title,
                overview: p.overview,
                poster_path: p.poster_path,
                backdrop_path: p.backdrop_path,
                vote_average: p.vote_average ?? 0,
                vote_count: 0,
                popularity: 0,
                release_date: p.release_date,
                media_type: 'movie',
            }));

            return async () => ({
                page: 1,
                total_pages: 1,
                total_results: movies.length,
                results: movies,
            });
        },
    );

    /* -------------------- Auto init -------------------- */

    onMounted(() => {
        if (route.name === 'collection-detail') {
            loadCollectionDetail();
        } else {
            loadCollections();
        }
    });

    return {
        /* list */
        collections,
        searchQuery,
        loadCollections,
        searchCollections,

        /* detail */
        collection,
        stats,
        moviesFetcher,
        loadCollectionDetail,

        /* shared */
        loading,
    };
}
