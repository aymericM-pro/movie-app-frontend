import { defineStore } from 'pinia';
import type {
    TMDBImagesResponse,
    TMDBMovieDetails,
    TMDBVideo,
} from '@/types/collection.types';
import type { Movie } from '@/types/movie.types';
import { useMoviesApi } from '@/services/useMoviesApi.composable';

export const useMovieDetailsStore = defineStore('movieDetails', {
    state: () => ({
        movieId: null as number | null,

        movie: null as TMDBMovieDetails | null,
        videos: [] as TMDBVideo[],
        images: null as TMDBImagesResponse | null,
        similarMovies: [] as Movie[],
        loading: false,
        error: null as string | null,
    }),

    getters: {
        trailers: (s) =>
            s.videos.filter(
                (v) => v.type === 'Trailer' && v.site === 'YouTube',
            ),

        directors: (s) =>
            s.movie?.credits?.crew?.filter((c) => c.job === 'Director') ?? [],

        cast: (s) => s.movie?.credits?.cast?.slice(0, 10) ?? [],
    },

    actions: {
        async fetchMovie(movieId: number) {
            const { getMovieFull } = useMoviesApi();

            this.movieId = movieId;
            this.loading = true;
            this.error = null;

            this.movie = null;
            this.videos = [];
            this.images = null;
            this.similarMovies = [];

            try {
                const full = await getMovieFull(movieId);

                if (this.movieId !== movieId) return;

                this.movie = full.details;
                this.videos = full.videos?.results ?? [];
                this.images = full.images ?? null;
                this.similarMovies = full.similar?.results ?? [];
            } catch (e) {
                if (this.movieId !== movieId) return;
                this.error = 'Erreur de chargement du film';
            } finally {
                if (this.movieId === movieId) {
                    this.loading = false;
                }
            }
        },

        clear() {
            this.$reset();
        },
    },
});
