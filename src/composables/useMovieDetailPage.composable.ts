import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useMovieDetailsStore } from '@/core/stores/movieDetails.store';
import { useUserMoviesStore } from '@/core/stores/userMovies.store';
import { useMovies } from '@/composables/useMovies.composable';

export function useMovieDetailPage() {
    const route = useRoute();

    const movieStore = useMovieDetailsStore();
    const userMoviesStore = useUserMoviesStore();

    const { movies: similarMovies, loading: similarLoading } = useMovies();

    const movieId = computed<number | null>(() => {
        const id = Number(route.params.id);
        return Number.isFinite(id) ? id : null;
    });

    const activeTab = ref<
        'overview' | 'details' | 'videos' | 'images' | 'comments'
    >('overview');

    onMounted(async () => {
        if (!movieId.value) return;
        await movieStore.fetchMovie(movieId.value);
    });

    watch(movieId, async (id, prev) => {
        if (!id || id === prev) return;
        await movieStore.fetchMovie(id);
    });

    onUnmounted(() => {
        movieStore.clear();
    });

    const addTo = (mode: 'watchlist' | 'watched' | 'favorites') => {
        if (movieStore.movie) {
            userMoviesStore.add(mode, movieStore.movie);
        }
    };

    return {
        activeTab,
        movie: movieStore.movie,
        loading: movieStore.loading,
        similarMovies,
        similarLoading,
        addTo,
    };
}
