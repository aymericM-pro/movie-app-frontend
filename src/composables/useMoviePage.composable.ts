import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useMovies } from '@/composables/useMovies.composable';
import { useMovieFilters } from '@/composables/useMovieFilters.composable';
import { useGendersApi } from '@/services/gender-api.service';

export function useMoviePage() {
    const route = useRoute();
    const genderService = useGendersApi();

    const page = ref(Number(route.query.page) || 1);
    const viewMode = ref<'cards' | 'list'>('cards');
    const searchQuery = ref((route.query.query as string) || '');

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

    const refreshMovies = async () => {
        const provider = route.query.provider as string | undefined;

        const studio = route.query.studio
            ? Number(route.query.studio)
            : undefined;

        const genre = route.query.genre ? Number(route.query.genre) : undefined;

        await loadMovies({
            page: page.value,
            query: route.query.query as string | undefined,
            provider,
            studio,
            genre,
            filters: filters.value,
            hasActiveFilters:
                !provider && !studio && !genre && hasActiveFilters.value,
        });
    };

    onMounted(async () => {
        await loadGenres();
        await refreshMovies();
    });

    watch(
        () => route.query,
        async () => {
            page.value = Number(route.query.page) || 1;
            searchQuery.value = (route.query.query as string) || '';
            await refreshMovies();
        },
        { deep: true },
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
