<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useUserMoviesStore } from '@/core/stores/userMovies.store';
import msTabs from '@/core/design-system/msTabs.component.vue';
import msTab from '@/core/design-system/msTab.component.vue';
import MovieCard from '@/components/MovieCard.vue';

type LibraryTab = 'watchlist' | 'watched' | 'favorites';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const store = useUserMoviesStore();

const activeTab = ref<LibraryTab>(
    (route.query.tab as LibraryTab) || 'watchlist',
);

watch(activeTab, (tab) => {
    router.replace({
        query: { ...route.query, tab },
    });
});

const movies = computed(() => store.getByCategory(activeTab.value));
</script>

<template>
    <section class="mx-auto max-w-[1400px] px-6 py-12 text-white">
        <!-- HEADER -->
        <header class="mb-10 space-y-4">
            <h1 class="text-3xl font-semibold">
                {{ t('common.library') }}
            </h1>

            <msTabs v-model="activeTab" variant="navigation">
                <msTab value="watchlist">
                    {{ t('common.watchlist') }}
                </msTab>
                <msTab value="watched">
                    {{ t('common.watched') }}
                </msTab>
                <msTab value="favorites">
                    {{ t('common.favorites') }}
                </msTab>
            </msTabs>
        </header>

        <!-- CONTENT -->
        <div v-if="movies.length === 0" class="py-20 text-center text-white/50">
            {{ t('library.empty') }}
        </div>

        <div
            v-else
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
            <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
        </div>
    </section>
</template>
