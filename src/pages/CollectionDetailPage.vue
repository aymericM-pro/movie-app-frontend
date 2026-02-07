<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useNavigation } from '@/composables/navigation.composable.ts';
import { getHeroImageUrl, getPosterUrl } from '@/core/utils/image.utils';
import { useCollections } from '@/composables/useCollectionDetail.composable';
import { AppRoute } from '@/router';
import msButton from '@/core/design-system/msButton.component.vue';
import MovieRow from '@/components/MovieRow.vue';

const { t } = useI18n();
const { goTo, goToWithParams } = useNavigation();

const { collection, loading, stats, moviesFetcher } = useCollections();

const goBack = () => goTo(AppRoute.COLLECTIONS);
const goToMovie = (id: number) => goToWithParams(AppRoute.MOVIE_DETAIL, { id });
</script>

<template>
    <div
        v-if="loading"
        class="min-h-screen flex items-center justify-center text-white/70"
    >
        {{ t('common.loading') }}
    </div>

    <div v-else-if="collection">
        <!-- HERO -->
        <section
            :style="{
                backgroundImage: `linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.9)), url(${getHeroImageUrl(
                    collection.poster_path,
                    collection.backdrop_path,
                    'original',
                )})`,
            }"
            class="relative bg-cover bg-center py-12"
        >
            <div class="mx-auto max-w-[1400px] px-6">
                <msButton
                    :label="'← ' + t('common.collections')"
                    size="sm"
                    variant="ghost"
                    @click="goBack"
                />

                <div class="mt-6 flex flex-col gap-8 lg:flex-row">
                    <img
                        :src="getPosterUrl(collection.poster_path, 'w500')"
                        alt=""
                        class="w-[220px] shrink-0 rounded-xl shadow-xl lg:w-[260px]"
                    />

                    <div class="space-y-5 text-white">
                        <h1
                            class="text-3xl font-semibold tracking-tight lg:text-[2.75rem]"
                        >
                            {{ collection.name }}
                        </h1>

                        <div
                            class="flex gap-6 text-sm uppercase tracking-wide text-white/70"
                        >
                            <span>
                                {{
                                    t('collection.filmsCount', {
                                        count: stats?.filmsCount,
                                    })
                                }}
                            </span>
                            <span>{{ stats?.yearRange }}</span>
                        </div>

                        <p class="max-w-xl text-sm leading-snug text-white/80">
                            {{ collection.overview }}
                        </p>

                        <div class="flex flex-wrap gap-3 pt-2">
                            <msButton
                                :label="t('common.watchlist')"
                                variant="secondary"
                            />
                            <msButton
                                :label="t('common.favorites')"
                                variant="secondary"
                            />
                            <msButton
                                :label="t('common.addToList')"
                                variant="secondary"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="mx-auto max-w-[1400px] px-6 py-14">
            <MovieRow
                v-if="moviesFetcher"
                :fetcher="moviesFetcher"
                :limit="collection.parts.length"
                mode="grid"
                title-key="common.movies"
                @select="goToMovie"
            />
        </section>
    </div>
</template>
