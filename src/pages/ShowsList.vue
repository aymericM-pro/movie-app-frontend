<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { Media } from '@/module/shows/models/media.model';
import type { TvCollectionType } from '@/module/shows/models/shows.model';
import { useShowsApi } from '@/module/shows/composables/useShowsApi.composable';
import MediaCard from '@/module/shows/components/MediaCard.component.vue';
import MovieFilters from '@/components/MovieFilters.component.vue';
import displayListMode from '@/components/DisplayListMode.component.vue';
import msPagination from '@/core/design-system/msPagination.component.vue';
import { AppRoute } from '@/router';
import { useNavigation } from '@/composables/navigation.composable.ts';

const { getTvCollection } = useShowsApi();
const { goToWithParams } = useNavigation();

const medias = ref<Media[]>([]);
const page = ref(1);
const totalPages = ref(1);

const collectionType: TvCollectionType = 'POPULAR';

const loadShows = async () => {
    const res = await getTvCollection(collectionType, page.value);

    medias.value = res.results.map((show) => ({
        id: show.id,
        media_type: 'tv',
        title: show.name,
        overview: show.name,
        poster_path: show.poster_path,
        backdrop_path: show.backdrop_path,
        vote_average: show.vote_average,
        date: show.first_air_date,
    }));

    totalPages.value = res.total_pages;
};

const goToShow = (id: number) => {
    goToWithParams(AppRoute.SHOW_DETAIL, { id });
};

onMounted(loadShows);
</script>

<template>
    <section class="mx-auto max-w-[1280px] py-12 text-white">
        <div class="mb-12 flex flex-col gap-8">
            <h1 class="text-3xl text-center font-semibold">Séries</h1>

            <displayListMode
                model-value=""
                placeholder="Séries…"
                view-mode="cards"
            />
        </div>

        <div class="grid grid-cols-1 gap-10 lg:grid-cols-[300px_1fr]">
            <MovieFilters
                :genre-options="[]"
                :model-value="{
                    genres: [],
                    ratingRange: [0, 10],
                    runtimeRange: [0, 300],
                    voteCountMin: 0,
                    sort: 'popularity.desc',
                }"
                :sort-options="[]"
            />

            <main class="space-y-10">
                <div
                    class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
                >
                    <MediaCard
                        v-for="media in medias"
                        :key="media.id"
                        :media="media"
                        mode="grid"
                        @click="goToShow(media.id)"
                    />
                </div>

                <msPagination
                    v-if="totalPages > 1"
                    v-model="page"
                    :total-pages="totalPages"
                />
            </main>
        </div>
    </section>
</template>
