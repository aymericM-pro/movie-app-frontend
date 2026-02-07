<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useMovieDetailsStore } from '@/core/stores/movieDetails.store';

import msTabs from '@/core/design-system/msTabs.component.vue';
import msTab from '@/core/design-system/msTab.component.vue';

const store = useMovieDetailsStore();

const activeImageTab = ref<'backdrops' | 'posters' | 'logos'>('backdrops');

const images = computed(() => ({
    backdrops: store.images?.backdrops ?? [],
    posters: store.images?.posters ?? [],
    logos: store.images?.logos ?? [],
}));
</script>

<template>
    <section
        v-if="
            images.backdrops.length ||
            images.posters.length ||
            images.logos.length
        "
    >
        <msTabs v-model="activeImageTab" variant="segmented">
            <msTab value="backdrops">
                Arrière-plans ({{ images.backdrops.length }})
            </msTab>

            <msTab value="posters">
                Affiches ({{ images.posters.length }})
            </msTab>

            <msTab value="logos"> Logos ({{ images.logos.length }})</msTab>
        </msTabs>

        <div
            v-if="images[activeImageTab].length"
            class="mt-6 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
            <img
                v-for="img in images[activeImageTab]"
                :key="img.file_path"
                :src="`https://image.tmdb.org/t/p/w780${img.file_path}`"
                class="rounded-lg"
                loading="lazy"
            />
        </div>

        <p v-else class="mt-6 text-white/60">Aucune image disponible.</p>
    </section>
</template>
