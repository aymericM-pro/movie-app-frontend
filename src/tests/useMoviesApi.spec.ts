import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useMoviesApi } from '@/services/useMoviesApi.composable';
import type { MoviesResponse } from '@/types/movie.types';
import type {
    CollectionDetails,
    TMDBImagesResponse,
    TMDBMovieDetails,
    TMDBMovieFull,
    TMDBVideoResponse,
} from '@/types/collection.types';

/* ------------------------------------------------------------------
   Mock ApiClient (AS A CLASS)
------------------------------------------------------------------- */

const requestMock = vi.fn();

vi.mock('@/services/baseServiceApi', () => {
    return {
        ApiClient: class {
            request = requestMock;
        },
    };
});

/* ------------------------------------------------------------------
   Helpers
------------------------------------------------------------------- */

const emptyMoviesResponse = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0,
} as MoviesResponse;

/* ------------------------------------------------------------------
   Tests
------------------------------------------------------------------- */

describe('useMoviesApi', () => {
    beforeEach(() => {
        requestMock.mockReset();
    });

    /* -----------------------------
       Lists
    -------------------------------- */

    it('getPopularMovies()', async () => {
        requestMock.mockResolvedValue(emptyMoviesResponse);

        const { getPopularMovies } = useMoviesApi();
        const result = await getPopularMovies(2);

        expect(result).toEqual(emptyMoviesResponse);
        expect(requestMock).toHaveBeenCalledWith('/tmdb/movies/top-rated', {
            page: 2,
        });
    });

    it('getTrendingToday()', async () => {
        requestMock.mockResolvedValue(emptyMoviesResponse);

        const { getTrendingToday } = useMoviesApi();
        await getTrendingToday(1);

        expect(requestMock).toHaveBeenCalledWith(
            '/tmdb/movies/trending/MOVIE',
            { timeWindow: 'DAY', page: 1 },
        );
    });

    it('getTopRatedMovies()', async () => {
        requestMock.mockResolvedValue(emptyMoviesResponse);

        const { getTopRatedMovies } = useMoviesApi();
        await getTopRatedMovies(1);

        expect(requestMock).toHaveBeenCalledWith('/tmdb/movies/top-rated', {
            page: 1,
        });
    });

    it('getNowPlayingMovies()', async () => {
        requestMock.mockResolvedValue(emptyMoviesResponse);

        const { getNowPlayingMovies } = useMoviesApi();
        await getNowPlayingMovies(1);

        expect(requestMock).toHaveBeenCalledWith(
            '/tmdb/movies/platform/NOW_PLAYING',
            { page: 1 },
        );
    });

    it('getNewReleases()', async () => {
        requestMock.mockResolvedValue(emptyMoviesResponse);

        const { getNewReleases } = useMoviesApi();
        await getNewReleases(1);

        expect(requestMock).toHaveBeenCalledWith(
            '/tmdb/movies/trending/MOVIE',
            { timeWindow: 'WEEK', page: 1 },
        );
    });

    it('searchMovies()', async () => {
        requestMock.mockResolvedValue(emptyMoviesResponse);

        const { searchMovies } = useMoviesApi();
        await searchMovies('matrix', 3);

        expect(requestMock).toHaveBeenCalledWith('/tmdb/movies/search', {
            query: 'matrix',
            page: 3,
        });
    });

    it('getMoviesByGenre()', async () => {
        requestMock.mockResolvedValue(emptyMoviesResponse);

        const { getMoviesByGenre } = useMoviesApi();
        await getMoviesByGenre(28, 2);

        expect(requestMock).toHaveBeenCalledWith('/tmdb/movies/genre/28', {
            page: 2,
        });
    });

    it('discoverMovies() maps params correctly', async () => {
        requestMock.mockResolvedValue(emptyMoviesResponse);

        const { discoverMovies } = useMoviesApi();

        await discoverMovies({
            genres: [28, 12],
            voteAverageMin: 7,
            voteAverageMax: 9,
            voteCountMin: 100,
            runtimeMin: 90,
            runtimeMax: 150,
            sortBy: 'popularity.desc',
            page: 1,
        });

        expect(requestMock).toHaveBeenCalledWith('/tmdb/movies/discover', {
            genres: '28,12',
            voteAverageMin: 7,
            voteAverageMax: 9,
            voteCountMin: 100,
            runtimeMin: 90,
            runtimeMax: 150,
            sortBy: 'popularity.desc',
            page: 1,
        });
    });

    /* -----------------------------
       Movie
    -------------------------------- */

    it('getMovieDetails()', async () => {
        const fakeDetails = { id: 42, title: 'Alien' } as TMDBMovieDetails;
        requestMock.mockResolvedValue(fakeDetails);

        const { getMovieDetails } = useMoviesApi();
        const result = await getMovieDetails(42);

        expect(result).toEqual(fakeDetails);
        expect(requestMock).toHaveBeenCalledWith('/tmdb/movies/42');
    });

    it('getMovieFull()', async () => {
        const fakeFull = {
            details: { id: 1, title: 'Dune' },
        } as TMDBMovieFull;

        requestMock.mockResolvedValue(fakeFull);

        const { getMovieFull } = useMoviesApi();
        const result = await getMovieFull(1);

        expect(result).toEqual(fakeFull);
        expect(requestMock).toHaveBeenCalledWith('/tmdb/movies/1/full');
    });

    it('getMovieVideos()', async () => {
        const fakeVideos = { results: [] } as TMDBVideoResponse;
        requestMock.mockResolvedValue(fakeVideos);

        const { getMovieVideos } = useMoviesApi();
        const result = await getMovieVideos(10);

        expect(result).toEqual(fakeVideos);
        expect(requestMock).toHaveBeenCalledWith('/tmdb/movies/10/videos');
    });

    it('getMovieImages()', async () => {
        const fakeImages = {
            posters: [],
            backdrops: [],
        } as TMDBImagesResponse;

        requestMock.mockResolvedValue(fakeImages);

        const { getMovieImages } = useMoviesApi();
        const result = await getMovieImages(10);

        expect(result).toEqual(fakeImages);
        expect(requestMock).toHaveBeenCalledWith('/tmdb/movies/10/images');
    });

    it('getSimilarMovies()', async () => {
        requestMock.mockResolvedValue(emptyMoviesResponse);

        const { getSimilarMovies } = useMoviesApi();
        await getSimilarMovies(10, 2);

        expect(requestMock).toHaveBeenCalledWith('/tmdb/movies/10/similar', {
            page: 2,
        });
    });

    it('getCollectionDetails()', async () => {
        const fakeCollection = {
            id: 5,
            name: 'Marvel',
        } as CollectionDetails;

        requestMock.mockResolvedValue(fakeCollection);

        const { getCollectionDetails } = useMoviesApi();
        const result = await getCollectionDetails(5);

        expect(result).toEqual(fakeCollection);
        expect(requestMock).toHaveBeenCalledWith(
            '/tmdb/movies/collections/5/details',
        );
    });

    /* -----------------------------
       Error handling
    -------------------------------- */

    it('sets error when API call fails', async () => {
        requestMock.mockRejectedValue(new Error('API error'));

        const { getPopularMovies, error, loading } = useMoviesApi();

        await expect(getPopularMovies()).rejects.toThrow();

        expect(error.value).toBe('Erreur API movies');
        expect(loading.value).toBe(false);
    });
});
