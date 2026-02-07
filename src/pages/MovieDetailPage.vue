<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { getBackdropUrl, getPosterUrl } from '@/core/utils/image.utils';
import { useMovieDetailsStore } from '@/core/stores/movieDetails.store';
import { useUserMoviesStore } from '@/core/stores/userMovies.store';
import type { Movie } from '@/types/movie.types';

import msTabs from '@/core/design-system/msTabs.component.vue';
import msTab from '@/core/design-system/msTab.component.vue';
import msButton from '@/core/design-system/msButton.component.vue';
import MovieRow from '@/components/MovieRow.vue';

import msMovieOverviewSection from '@/components/movie-details/tabs/msMovieOverviewSection.component.vue';
import msMovieDetailsSection from '@/components/movie-details/tabs/msMovieDetailsSection.component.vue';
import msMovieVideosSection from '@/components/movie-details/tabs/msMovieVideosSection.component.vue';
import msMovieImagesSection from '@/components/movie-details/tabs/msMovieImagesSection.component.vue';
import msMovieCommentsSection from '@/components/movie-details/tabs/msMovieCommentsSection.component.vue';

const { t } = useI18n();
const route = useRoute();

const movieStore = useMovieDetailsStore();
const userMoviesStore = useUserMoviesStore();

const movieId = computed<number | null>(() => {
    const id = Number(route.params.id);
    return Number.isFinite(id) ? id : null;
});

const activeTab = ref<
    'overview' | 'details' | 'videos' | 'images' | 'comments'
>('overview');

/* ----------------------------
   Lifecycle
----------------------------- */

onMounted(async () => {
    if (!movieId.value) return;
    await movieStore.fetchMovie(movieId.value);
});

watch(movieId, async (id, prev) => {
    if (!id || id === prev) return;
    await movieStore.fetchMovie(id);
});

/* ----------------------------
   Actions
----------------------------- */

const addTo = (mode: 'watchlist' | 'watched' | 'favorites') => {
    if (movieStore.movie) {
        userMoviesStore.add(mode, movieStore.movie);
    }
};

/* ----------------------------
   Similar movies (from store)
----------------------------- */

const similarMoviesFetcher = computed<
    (() => Promise<{ results: Movie[] }>) | null
>(() => {
    if (!movieStore.similarMovies.length) return null;

    return async () => ({
        results: movieStore.similarMovies,
    });
});
</script>

<template>
    <div class="relative min-h-screen bg-black text-white overflow-hidden">
        <!-- BACKGROUND -->
        <div
            v-if="movieStore.movie"
            :style="{
                backgroundImage: `url(${getBackdropUrl(
                    movieStore.movie.backdrop_path,
                    'w1280',
                )})`,
            }"
            class="absolute inset-0 bg-cover bg-center"
        />

        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <div
            class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"
        />

        <div class="relative z-10">
            <!-- LOADING -->
            <div
                v-if="movieStore.loading"
                class="py-32 text-center text-white/70"
            >
                {{ t('common.loading') }}
            </div>

            <!-- CONTENT -->
            <div v-else-if="movieStore.movie">
                <div class="mx-auto max-w-[1400px] px-8 py-20">
                    <div
                        class="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12"
                    >
                        <!-- POSTER -->
                        <aside class="space-y-4">
                            <img
                                :alt="movieStore.movie.title"
                                :src="
                                    getPosterUrl(
                                        movieStore.movie.poster_path,
                                        'w500',
                                    )
                                "
                                class="w-full rounded-xl shadow-2xl"
                            />

                            <div class="flex gap-2">
                                <msButton
                                    class="flex-1"
                                    size="sm"
                                    variant="secondary"
                                    @click="addTo('watchlist')"
                                >
                                    {{ t('common.watchlist') }}
                                </msButton>

                                <msButton
                                    class="flex-1"
                                    size="sm"
                                    variant="secondary"
                                    @click="addTo('favorites')"
                                >
                                    {{ t('common.favorites') }}
                                </msButton>

                                <msButton
                                    class="flex-1"
                                    size="sm"
                                    variant="secondary"
                                    @click="addTo('watched')"
                                >
                                    {{ t('common.watched') }}
                                </msButton>
                            </div>
                        </aside>

                        <!-- MAIN CONTENT -->
                        <section class="space-y-10 min-w-0">
                            <div>
                                <h1
                                    class="text-[2.6rem] font-bold leading-tight"
                                >
                                    {{ movieStore.movie.title }}
                                </h1>

                                <div
                                    class="mt-2 flex flex-wrap gap-4 text-white/70"
                                >
                                    <span
                                        >⭐
                                        {{
                                            movieStore.movie.vote_average.toFixed(
                                                1,
                                            )
                                        }}</span
                                    >
                                    <span
                                        >•
                                        {{ movieStore.movie.runtime }} min</span
                                    >
                                    <span
                                        >•
                                        {{
                                            movieStore.movie.release_date?.slice(
                                                0,
                                                4,
                                            )
                                        }}</span
                                    >
                                </div>
                            </div>

                            <!-- TABS -->
                            <msTabs v-model="activeTab" variant="navigation">
                                <msTab value="overview"
                                    >{{ t('movie.overview') }}
                                </msTab>
                                <msTab value="details"
                                    >{{ t('movie.details') }}
                                </msTab>
                                <msTab value="videos"
                                    >{{ t('movie.videos') }}
                                </msTab>
                                <msTab value="images"
                                    >{{ t('movie.images') }}
                                </msTab>
                                <msTab value="comments"
                                    >{{ t('movie.comments') }}
                                </msTab>
                            </msTabs>

                            <msMovieOverviewSection
                                v-if="activeTab === 'overview'"
                            />
                            <msMovieDetailsSection
                                v-if="activeTab === 'details'"
                            />
                            <msMovieVideosSection
                                v-if="activeTab === 'videos'"
                            />
                            <msMovieImagesSection
                                v-if="activeTab === 'images'"
                            />
                            <msMovieCommentsSection
                                v-if="activeTab === 'comments'"
                            />
                        </section>
                    </div>

                    <section v-if="similarMoviesFetcher" class="mt-20">
                        <MovieRow
                            :fetcher="similarMoviesFetcher"
                            :limit="12"
                            mode="grid"
                            title-key="movie.similar"
                        />
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>
