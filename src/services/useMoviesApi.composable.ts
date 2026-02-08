import { ref } from 'vue';
import type { MoviesResponse } from '@/types/movie.types';
import type {
    CollectionDetails,
    TMDBImagesResponse,
    TMDBMovieDetails,
    TMDBMovieFull,
    TMDBVideoResponse,
} from '@/types/collection.types';
import { ApiClient } from '@/services/baseServiceApi';

export type DiscoverMoviesParams = {
    genres?: number[];
    companies?: number[];
    voteAverageMin?: number;
    voteAverageMax?: number;
    voteCountMin?: number;
    runtimeMin?: number;
    runtimeMax?: number;
    sortBy?: string;
    page?: number;
};

type CatalogSourceType = 'PROVIDER' | 'STUDIO';

export function useMoviesApi() {
    const api = new ApiClient();
    const loading = ref(false);
    const error = ref<string | null>(null);

    const call = async <T>(fn: () => Promise<T>): Promise<T> => {
        loading.value = true;
        error.value = null;
        try {
            return await fn();
        } catch (e) {
            error.value = 'Erreur API movies';
            throw e;
        } finally {
            loading.value = false;
        }
    };

    const getPopularMovies = (page = 1) =>
        call<MoviesResponse>(() =>
            api.request('/tmdb/movies/top-rated', { page }),
        );

    const getTrendingToday = (page = 1) =>
        call<MoviesResponse>(() =>
            api.request('/tmdb/movies/trending/MOVIE', {
                timeWindow: 'DAY',
                page,
            }),
        );

    const getTopRatedMovies = (page = 1) =>
        call<MoviesResponse>(() =>
            api.request('/tmdb/movies/top-rated', { page }),
        );

    const getNewReleases = (page = 1) =>
        call<MoviesResponse>(() =>
            api.request('/tmdb/movies/trending/MOVIE', {
                timeWindow: 'WEEK',
                page,
            }),
        );

    const getMoviesByCatalogSource = (
        type: CatalogSourceType,
        sourceId: number,
        page = 1,
    ) =>
        call<MoviesResponse>(() =>
            api.request('/tmdb/movies/catalog', {
                type,
                sourceId,
                page,
            }),
        );
    const searchMovies = (query: string, page = 1) =>
        call<MoviesResponse>(() =>
            api.request('/tmdb/movies/search', { query, page }),
        );

    const discoverMovies = (params: DiscoverMoviesParams) =>
        call<MoviesResponse>(() =>
            api.request('/tmdb/movies/discover', {
                genres: params.genres?.join(','),
                with_companies: params.companies?.join(','),
                voteAverageMin: params.voteAverageMin,
                voteAverageMax: params.voteAverageMax,
                voteCountMin: params.voteCountMin,
                runtimeMin: params.runtimeMin,
                runtimeMax: params.runtimeMax,
                sortBy: params.sortBy,
                page: params.page,
            }),
        );

    const getMovieDetails = (movieId: number) =>
        call<TMDBMovieDetails>(() => api.request(`/tmdb/movies/${movieId}`));

    const getMovieFull = (movieId: number) =>
        call<TMDBMovieFull>(() => api.request(`/tmdb/movies/${movieId}/full`));

    const getMovieVideos = (movieId: number) =>
        call<TMDBVideoResponse>(() =>
            api.request(`/tmdb/movies/${movieId}/videos`),
        );

    const getMovieImages = (movieId: number) =>
        call<TMDBImagesResponse>(() =>
            api.request(`/tmdb/movies/${movieId}/images`),
        );

    const getSimilarMovies = (movieId: number, page = 1) =>
        call<MoviesResponse>(() =>
            api.request(`/tmdb/movies/${movieId}/similar`, { page }),
        );

    const getCollectionDetails = (collectionId: number) =>
        call<CollectionDetails>(() =>
            api.request(`/tmdb/movies/collections/${collectionId}/details`),
        );

    const getMoviesByGenre = (genreId: number, page = 1) =>
        call<MoviesResponse>(() =>
            api.request(`/tmdb/movies/genre/${genreId}`, {
                page,
            }),
        );

    return {
        loading,
        error,
        getPopularMovies,
        getTrendingToday,
        getTopRatedMovies,
        getNewReleases,
        getMoviesByCatalogSource,
        searchMovies,
        discoverMovies,
        getMovieDetails,
        getMovieFull,
        getMovieVideos,
        getMovieImages,
        getSimilarMovies,
        getCollectionDetails,
        getMoviesByGenre,
    };
}
