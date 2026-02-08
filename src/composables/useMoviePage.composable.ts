import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useMovies } from '@/composables/useMovies.composable';
import { useMovieFilters } from '@/composables/useMovieFilters.composable';
import { useGendersApi } from '@/services/gender-api.service.ts';

export function useMoviePage() {
    const route = useRoute();
    const genderService = useGendersApi();
    const page = ref(Number(route.query.page) || 1);
    const viewMode = ref<'cards' | 'list'>('cards');
    const searchQuery = ref('');

    const genreOptions = ref<{ label: string; value: number }[]>([]);

    const { filters, hasActiveFilters } = useMovieFilters();
    const { movies, loading, totalPages, loadMovies } = useMovies();

    const loadGenres = async () => {
        const genres = await genderService.getGenres();
        genreOptions.value = genres.map((g) => ({
            label: g.name,
            value: g.id,
        }));
    };

    const refreshMovies = () =>
        loadMovies({
            page: page.value,
            query: route.query.query as string | undefined,
            filters: filters.value,
            hasActiveFilters: hasActiveFilters.value,
        });

    onMounted(async () => {
        await loadGenres();
        await refreshMovies();
    });

    watch(
        () => route.query.query,
        async () => {
            page.value = 1;
            await refreshMovies();
        },
    );

    return {
        page,
        viewMode,
        searchQuery,
        genreOptions,
        filters,
        movies,
        loading,
        totalPages,
        refreshMovies,
    };
}
