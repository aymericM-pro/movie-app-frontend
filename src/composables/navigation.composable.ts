import { useRouter } from 'vue-router';
import type { AppRoute } from '@/router';

export type MovieQueryParams = {
    provider?: number;
    studio?: number;
    genre?: number;
    query?: string;
    page?: number;
};

export function useNavigation() {
    const router = useRouter();

    const goTo = (route: AppRoute) => {
        void router.push({ name: route });
    };

    const goToWithQuery = (route: AppRoute, query: MovieQueryParams) => {
        void router.push({ name: route, query });
    };

    const goToWithParams = (route: AppRoute, params: Record<string, any>) => {
        void router.push({ name: route, params });
    };

    return {
        goTo,
        goToWithQuery,
        goToWithParams,
    };
}
