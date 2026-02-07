import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useCollectionsApi } from '@/services/collections-api.service';
import type {
    CollectionDetails,
    PopularCollection,
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
   Tests
------------------------------------------------------------------- */

describe('useCollectionsApi', () => {
    beforeEach(() => {
        requestMock.mockReset();
    });

    it('getPopularCollections() calls /collections/popular', async () => {
        const fakeCollections: PopularCollection[] = [
            {
                id: 1,
                name: 'Star Wars',
                overview: 'Saga',
                posterPath: '/poster.jpg',
                backdropPath: null,
                partsCount: 9,
            },
        ];

        requestMock.mockResolvedValue(fakeCollections);

        const { getPopularCollections, loading, error } = useCollectionsApi();

        const promise = getPopularCollections();
        expect(loading.value).toBe(true);

        const result = await promise;

        expect(result).toEqual(fakeCollections);
        expect(requestMock).toHaveBeenCalledWith('/collections/popular');
        expect(loading.value).toBe(false);
        expect(error.value).toBeNull();
    });

    it('searchCollections() calls /collections/search with query', async () => {
        requestMock.mockResolvedValue([]);

        const { searchCollections } = useCollectionsApi();

        await searchCollections('avatar');

        expect(requestMock).toHaveBeenCalledWith('/collections/search', {
            query: 'avatar',
        });
    });

    it('getCollectionDetails() calls /collections/:id', async () => {
        const fakeDetails: CollectionDetails = {
            id: 10,
            name: 'Avatar',
            overview: 'Pandora',
            poster_path: null,
            backdrop_path: null,
            parts: [],
        } as CollectionDetails;

        requestMock.mockResolvedValue(fakeDetails);

        const { getCollectionDetails } = useCollectionsApi();

        const result = await getCollectionDetails(10);

        expect(result).toEqual(fakeDetails);
        expect(requestMock).toHaveBeenCalledWith('/collections/10');
    });

    it('sets error when API call fails', async () => {
        requestMock.mockRejectedValue(new Error('API error'));

        const { getPopularCollections, error, loading } = useCollectionsApi();

        await expect(getPopularCollections()).rejects.toThrow();

        expect(error.value).toBe('Erreur API collections');
        expect(loading.value).toBe(false);
    });
});
