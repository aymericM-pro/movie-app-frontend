import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Gender, useGendersApi } from '@/services/gender-api.service.ts';

const requestMock = vi.fn();

vi.mock('@/services/baseServiceApi', () => {
    return {
        ApiClient: class {
            request = requestMock;
        },
    };
});

describe('useGendersApi', () => {
    beforeEach(() => {
        requestMock.mockReset();
    });

    it('getGenres() calls /genders with default language', async () => {
        const fakeGenres: Gender[] = [
            { id: 28, name: 'Action' },
            { id: 12, name: 'Adventure' },
        ];

        requestMock.mockResolvedValue(fakeGenres);

        const { getGenres, loading, error } = useGendersApi();

        const promise = getGenres();
        expect(loading.value).toBe(true);

        const result = await promise;

        expect(result).toEqual(fakeGenres);
        expect(requestMock).toHaveBeenCalledWith('/genders', {
            language: 'fr-FR',
        });
        expect(loading.value).toBe(false);
        expect(error.value).toBeNull();
    });

    it('getGenres() calls /genders with custom language', async () => {
        requestMock.mockResolvedValue([]);

        const { getGenres } = useGendersApi();

        await getGenres('en-US');

        expect(requestMock).toHaveBeenCalledWith('/genders', {
            language: 'en-US',
        });
    });

    it('sets error when API call fails', async () => {
        requestMock.mockRejectedValue(new Error('API error'));

        const { getGenres, error, loading } = useGendersApi();

        await expect(getGenres()).rejects.toThrow();

        expect(error.value).toBe('Erreur API genres');
        expect(loading.value).toBe(false);
    });
});
