<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useTvDetailsStore } from '@/module/shows/store/tvDetails.store.ts';
import { getBackdropUrl, getPosterUrl } from '@/core/utils/image.utils.ts';
import msTabs from '@/core/design-system/msTabs.component.vue';
import msTab from '@/core/design-system/msTab.component.vue';
import TvOverviewSection from '@/module/shows/components/tabs/TvOverviewSection.component.vue';
import TvSeasonsSection from '@/module/shows/components/tabs/TvSeasonsSection.component.vue';
import TvCastSection from '@/module/shows/components/tabs/TvCastSection.component.vue';
import TvVideosSection from '@/module/shows/components/tabs/TvVideosSection.component.vue';
import TvImagesSection from '@/module/shows/components/tabs/TvImagesSection.component.vue';

const route = useRoute();
const store = useTvDetailsStore();

const tvId = computed<number | null>(() => {
    const id = Number(route.params.id);
    return Number.isFinite(id) ? id : null;
});

const activeTab = ref<
    'overview' | 'seasons' | 'cast' | 'videos' | 'images' | 'comments'
>('overview');

onMounted(() => {
    if (tvId.value) store.fetchTv(tvId.value);
});

watch(tvId, (id) => {
    if (id) store.fetchTv(id);
});
</script>

<template>
    <div class="relative min-h-screen bg-black text-white">
        <!-- BACKDROP FIXE -->
        <div
            v-if="store.tv"
            :style="{
                backgroundImage: `url(${getBackdropUrl(store.tv.backdrop_path, 'w1280')})`,
            }"
            class="fixed inset-0 -z-10 bg-cover bg-center"
        />

        <div class="absolute inset-0 bg-black/80" />

        <div class="relative z-10">
            <div v-if="store.loading" class="py-32 text-center">
                Chargement…
            </div>

            <div v-else-if="store.tv" class="mx-auto max-w-[1400px] px-8 py-20">
                <div class="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12">
                    <!-- POSTER -->
                    <aside>
                        <img
                            :src="getPosterUrl(store.tv.poster_path, 'w500')"
                            class="rounded-xl"
                        />
                    </aside>

                    <!-- CONTENT -->
                    <section class="space-y-8">
                        <div>
                            <h1 class="text-4xl font-bold">
                                {{ store.tv.name }}
                            </h1>

                            <p class="mt-4 text-white/70">
                                {{ store.tv.overview }}
                            </p>
                        </div>

                        <!-- TABS -->
                        <msTabs v-model="activeTab" variant="navigation">
                            <msTab value="overview">Présentation</msTab>
                            <msTab value="seasons">Saisons</msTab>
                            <msTab value="cast">Casting</msTab>
                            <msTab value="videos">Vidéos</msTab>
                            <msTab value="images">Images</msTab>
                            <msTab value="comments">Commentaires</msTab>
                        </msTabs>

                        <TvOverviewSection
                            v-if="activeTab === 'overview'"
                            :tv="store.tv"
                        />

                        <TvSeasonsSection
                            v-if="activeTab === 'seasons'"
                            :seasons="store.tv.seasons"
                        />

                        <TvCastSection
                            v-if="activeTab === 'cast' && store.credits"
                            :cast="store.credits.cast"
                        />

                        <TvVideosSection
                            v-if="activeTab === 'videos' && store.videos"
                        />

                        <TvImagesSection
                            v-if="activeTab === 'images' && store.images"
                        />

                        <section
                            v-if="activeTab === 'comments'"
                            class="rounded-xl bg-neutral-900/60 p-6"
                        >
                            <p class="text-white/60">
                                Les commentaires seront disponibles
                                prochainement.
                            </p>
                        </section>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>
