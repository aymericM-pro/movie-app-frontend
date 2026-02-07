import { defineStore } from 'pinia';
import type { Movie } from '@/types/movie.types';

export type LibraryMode = 'watchlist' | 'watched' | 'favorites';

interface UserMoviesState {
    watchlist: Movie[];
    watched: Movie[];
    favorites: Movie[];
}

export const useUserMoviesStore = defineStore('userMovies', {
    state: (): UserMoviesState => ({
        watchlist: [],
        watched: [],
        favorites: [],
    }),

    getters: {
        getByCategory:
            (state) =>
            (mode: LibraryMode): Movie[] =>
                state[mode],
    },

    actions: {
        add(mode: LibraryMode, movie: Movie) {
            if (!this[mode].some((m) => m.id === movie.id)) {
                this[mode].push(movie);
            }
        },

        remove(mode: LibraryMode, movieId: number) {
            this[mode] = this[mode].filter((m) => m.id !== movieId);
        },
    },
});
