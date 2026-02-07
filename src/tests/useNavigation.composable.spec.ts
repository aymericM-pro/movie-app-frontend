import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useNavigation } from '@/composables/navigation.composable';
import type { AppRoute } from '@/router';

const pushMock = vi.fn();

vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: pushMock,
    }),
}));

describe('useNavigation', () => {
    beforeEach(() => {
        pushMock.mockClear();
    });

    it('goTo() navigates to a route by name', () => {
        const { goTo } = useNavigation();

        goTo('MOVIES' as AppRoute);

        expect(pushMock).toHaveBeenCalledOnce();
        expect(pushMock).toHaveBeenCalledWith({
            name: 'MOVIES',
        });
    });

    it('goToWithQuery() navigates with query params', () => {
        const { goToWithQuery } = useNavigation();

        goToWithQuery('MOVIES' as AppRoute, {
            query: 'avatar',
            page: 2,
        });

        expect(pushMock).toHaveBeenCalledOnce();
        expect(pushMock).toHaveBeenCalledWith({
            name: 'MOVIES',
            query: {
                query: 'avatar',
                page: 2,
            },
        });
    });

    it('goToWithParams() navigates with route params', () => {
        const { goToWithParams } = useNavigation();

        goToWithParams('MOVIE_DETAIL' as AppRoute, {
            id: 123,
        });

        expect(pushMock).toHaveBeenCalledOnce();
        expect(pushMock).toHaveBeenCalledWith({
            name: 'MOVIE_DETAIL',
            params: {
                id: 123,
            },
        });
    });
});
