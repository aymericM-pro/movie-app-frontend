<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useNavigation } from '@/composables/navigation.composable.ts';
import { AppRoute } from '@/router';
import { useMoviePage } from '@/composables/useMoviePage.composable';
import MovieCard from '@/components/MovieCard.vue';
import MovieFilters from '@/components/MovieFilters.component.vue';
import SearchAndViewToggle from '@/components/DisplayListMode.component.vue';
import msPagination from '@/core/design-system/msPagination.component.vue';

const { t } = useI18n();
const { goToWithQuery } = useNavigation();

const {
    page,
    viewMode,
    searchQuery,
    genreOptions,
    filters,
    movies,
    loading,
    totalPages,
    refreshMovies,
} = useMoviePage();

const sortOptions = [
    { label: 'Popularité ↓', value: 'popularity.desc' },
    { label: 'Popularité ↑', value: 'popularity.asc' },
    { label: 'Note ↓', value: 'vote_average.desc' },
    { label: 'Note ↑', value: 'vote_average.asc' },
    { label: 'Date de sortie ↓', value: 'release_date.desc' },
    { label: 'Date de sortie ↑', value: 'release_date.asc' },
];

const title = computed(() =>
    searchQuery.value ? t('common.searchResults') : t('common.movies'),
);

const movieCardMode = computed(() =>
    viewMode.value === 'list' ? 'list' : 'grid',
);

const applySearch = (query: string) => {
    page.value = 1;
    goToWithQuery(AppRoute.MOVIES, {
        query: query || undefined,
        page: 1,
    });
};

const applyFilters = () => {
    page.value = 1;
    refreshMovies();
};

const goToPage = (p: number) => {
    page.value = p;
    refreshMovies();
    requestAnimationFrame(() =>
        window.scrollTo({ top: 0, behavior: 'smooth' }),
    );
};
</script>

<template>
    <section class="mx-auto max-w-[1280px] py-12 text-white">
        <div class="mb-12 flex flex-col justify-between gap-8">
            <h1 class="text-3xl text-center font-semibold">{{ title }}</h1>

            <SearchAndViewToggle
                v-model="searchQuery"
                :placeholder="t('common.movies') + '…'"
                :view-mode="viewMode"
                @search="applySearch(searchQuery)"
                @update:viewMode="viewMode = $event"
            />
        </div>

        <div class="grid grid-cols-1 gap-10 lg:grid-cols-[300px_1fr]">
            <MovieFilters
                v-model="filters"
                :genre-options="genreOptions"
                :sort-options="sortOptions"
                @apply="applyFilters"
            />

            <main class="space-y-10">
                <div v-if="loading" class="py-32 text-center text-white/60">
                    {{ t('common.loading') }}
                </div>

                <div
                    v-else
                    :class="
                        viewMode === 'cards'
                            ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6'
                            : 'space-y-4'
                    "
                >
                    <MovieCard
                        v-for="movie in movies"
                        :key="movie.id"
                        :mode="movieCardMode"
                        :movie="movie"
                    />
                </div>

                <msPagination
                    v-if="totalPages > 1"
                    v-model="page"
                    :total-pages="totalPages"
                    @update:modelValue="goToPage"
                />
            </main>
        </div>
    </section>
</template>
