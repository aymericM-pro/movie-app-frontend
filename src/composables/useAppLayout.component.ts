import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/core/stores/auth.store';
import { useNavigation } from '@/composables/navigation.composable';
import { useMoviesApi } from '@/services/useMoviesApi.composable';
import { AppRoute } from '@/router';
import type { Movie } from '@/types/movie.types';

export function useAppLayout() {
    const route = useRoute();
    const { t, locale } = useI18n();
    const authStore = useAuthStore();
    const { goTo, goToWithQuery, goToWithParams } = useNavigation();
    const { searchMovies } = useMoviesApi();

    const login = () => goTo(AppRoute.LOGIN);
    const register = () => goTo(AppRoute.REGISTER);

    const logout = () => {
        authStore.logout();
        goTo(AppRoute.LOGIN);
    };

    const toggleLanguage = () => {
        locale.value = locale.value === 'fr' ? 'en' : 'fr';
        localStorage.setItem('locale', locale.value);
    };

    const searchQuery = ref('');
    const searchResults = ref<Movie[]>([]);
    const searchLoading = ref(false);
    const showResults = ref(false);

    const searchWrapperRef = ref<HTMLElement | null>(null);

    watch(searchQuery, async (q) => {
        if (!q || q.length < 2) {
            searchResults.value = [];
            showResults.value = false;
            return;
        }

        searchLoading.value = true;
        showResults.value = true;

        try {
            const res = await searchMovies(q);

            searchResults.value = res.results
                .filter(
                    (m) =>
                        typeof m.id === 'number' &&
                        typeof m.poster_path === 'string' &&
                        m.poster_path.length > 0,
                )
                .slice(0, 5);
        } finally {
            searchLoading.value = false;
        }
    });

    const openResults = () => {
        if (searchQuery.value.length >= 2) {
            showResults.value = true;
        }
    };

    const closeResults = () => {
        showResults.value = false;
    };

    const goToSearch = () => {
        if (!searchQuery.value.trim()) return;

        closeResults();

        goToWithQuery(AppRoute.MOVIES, {
            query: searchQuery.value.trim(),
            page: 1,
        });

        searchQuery.value = '';
    };

    const goToItem = (item: Movie) => {
        closeResults();
        requestAnimationFrame(() => {
            goToWithParams(AppRoute.MOVIE_DETAIL, { id: item.id });
        });
    };

    const onClickOutside = (e: MouseEvent) => {
        if (
            searchWrapperRef.value &&
            !searchWrapperRef.value.contains(e.target as Node)
        ) {
            closeResults();
        }
    };

    onMounted(() => {
        document.addEventListener('mousedown', onClickOutside);
    });

    onUnmounted(() => {
        document.removeEventListener('mousedown', onClickOutside);
    });

    return {
        route,
        t,
        locale,
        authStore,
        login,
        register,
        logout,
        toggleLanguage,
        searchQuery,
        searchResults,
        searchLoading,
        showResults,
        searchWrapperRef,
        openResults,
        closeResults,
        goToSearch,
        goToItem,
    };
}
