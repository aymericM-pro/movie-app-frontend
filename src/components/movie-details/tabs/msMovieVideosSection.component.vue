<script lang="ts" setup>
import { computed } from 'vue';
import { useMovieDetailsStore } from '@/core/stores/movieDetails.store';

const store = useMovieDetailsStore();
const trailers = computed(() => store.trailers);
const activeTrailer = computed(() => trailers.value[0] ?? null);
</script>

<template>
    <section class="mt-6">
        <div v-if="activeTrailer" class="relative pb-[56.25%] mb-8">
            <iframe
                :src="`https://www.youtube.com/embed/${activeTrailer.key}`"
                allowfullscreen
                class="absolute inset-0 w-full h-full rounded-xl"
                title="Movie Trailer"
            />
        </div>

        <p v-else class="text-white/60">Aucune vidéo disponible.</p>
    </section>
</template>
