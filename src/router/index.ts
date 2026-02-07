import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/core/stores/auth.store.ts';

export enum AppRoute {
    HOME = 'home',
    MOVIES = 'movies',
    COLLECTIONS = 'collections',
    COLLECTION_DETAIL = 'collection-detail',
    MOVIE_DETAIL = 'movie-detail',
    USER_LIBRARY = 'user-library',
    LOGIN = 'login',
    REGISTER = 'register',
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: AppRoute.LOGIN,
            component: () => import('@/pages/LoginPage.vue'),
            meta: { auth: false },
        },
        {
            path: '/register',
            name: AppRoute.REGISTER,
            component: () => import('@/pages/RegisterPage.vue'),
            meta: { auth: false },
        },
        {
            path: '/home',
            name: AppRoute.HOME,
            component: () => import('@/pages/HomePage.vue'),
            meta: { auth: false },
        },
        {
            path: '/movies',
            name: AppRoute.MOVIES,
            component: () => import('@/pages/MoviesList.component.vue'),
            meta: { auth: false },
        },
        {
            path: '/collections',
            name: AppRoute.COLLECTIONS,
            component: () => import('@/pages/CollectionsPage.vue'),
            meta: { auth: false },
        },
        {
            path: '/collections/:id',
            name: AppRoute.COLLECTION_DETAIL,
            component: () => import('@/pages/CollectionDetailPage.vue'),
            meta: { auth: false },
        },
        {
            path: '/movie/:id',
            name: AppRoute.MOVIE_DETAIL,
            component: () => import('@/pages/MovieDetailPage.vue'),
            meta: { auth: false },
        },
        {
            path: '/library',
            name: AppRoute.USER_LIBRARY,
            component: () => import('@/pages/UserMoviesPage.vue'),
            meta: { auth: true },
        },

        {
            path: '/:pathMatch(.*)*',
            redirect: '/login',
        },
    ],
});

router.beforeEach((to) => {
    const authStore = useAuthStore();

    if (to.meta.auth === true && !authStore.isAuthenticated) {
        return {
            name: AppRoute.LOGIN,
            query: { redirect: to.fullPath },
        };
    }

    if (
        (to.name === AppRoute.LOGIN || to.name === AppRoute.REGISTER) &&
        authStore.isAuthenticated
    ) {
        return { name: AppRoute.HOME };
    }

    return true;
});

export default router;
