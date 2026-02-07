import { ref } from 'vue';
import type { Movie } from '@/types/movie.types';
import type { MovieFilters } from '@/components/MovieFilters.component.vue';
import { useMoviesApi } from '@/services/useMoviesApi.composable';

export function useMovies() {
    const { getPopularMovies, searchMovies, discoverMovies } = useMoviesApi();

    const movies = ref<Movie[]>([]);
    const loading = ref(false);
    const totalPages = ref(1);

    const loadMovies = async (options: {
        page: number;
        query?: string;
        filters?: MovieFilters;
        hasActiveFilters: boolean;
    }) => {
        loading.value = true;

        try {
            let res;

            if (options.query) {
                res = await searchMovies(options.query, options.page);
            } else if (options.hasActiveFilters && options.filters) {
                res = await discoverMovies({
                    genres: options.filters.genres,
                    voteAverageMin: options.filters.ratingRange[0],
                    voteAverageMax: options.filters.ratingRange[1],
                    voteCountMin: options.filters.voteCountMin,
                    runtimeMin: options.filters.runtimeRange[0],
                    runtimeMax: options.filters.runtimeRange[1],
                    sortBy: options.filters.sort,
                    page: options.page,
                });
            } else {
                res = await getPopularMovies(options.page);
            }

            movies.value = res.results.filter((m) => m.poster_path);
            totalPages.value = Math.min(res.total_pages, 500);
        } finally {
            loading.value = false;
        }
    };

    const loadPopularForHero = async (limit: number) => {
        loading.value = true;

        try {
            const res = await getPopularMovies(1);

            movies.value = res.results
                .filter((m) => m.poster_path)
                .slice(0, limit);
        } finally {
            loading.value = false;
        }
    };

    return {
        movies,
        loading,
        totalPages,
        loadMovies,
        loadPopularForHero,
    };
}
