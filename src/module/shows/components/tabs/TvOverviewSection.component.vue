<script lang="ts" setup>
import { computed } from 'vue';
import { useTvDetailsStore } from '@/module/shows/store/tvDetails.store';

const store = useTvDetailsStore();

const tv = computed(() => store.tv);

const year = computed(() =>
    tv.value?.first_air_date ? tv.value.first_air_date.slice(0, 4) : '—',
);
</script>

<template>
    <section
        v-if="tv"
        class="space-y-8 rounded-2xl bg-neutral-900/60 p-6 backdrop-blur"
    >
        <!-- WARNING TMDB -->
        <div
            class="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
            Les informations, saisons et dates de sortie proviennent de la base
            de données publique TMDB. Des différences peuvent exister selon le
            pays.
        </div>

        <!-- SYNOPSIS -->
        <div class="space-y-3">
            <h2 class="text-xl font-semibold">Synopsis</h2>
            <p class="max-w-4xl leading-relaxed text-white/80">
                {{ tv.overview || 'Aucune description disponible.' }}
            </p>
        </div>

        <!-- META GRID -->
        <div class="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            <div>
                <p class="text-sm text-white/50">Saisons</p>
                <p class="text-lg font-semibold">
                    {{ tv.number_of_seasons }}
                </p>
            </div>

            <div>
                <p class="text-sm text-white/50">Épisodes</p>
                <p class="text-lg font-semibold">
                    {{ tv.number_of_episodes }}
                </p>
            </div>

            <div>
                <p class="text-sm text-white/50">Première diffusion</p>
                <p class="text-lg font-semibold">
                    {{ year }}
                </p>
            </div>

            <div>
                <p class="text-sm text-white/50">Note</p>
                <p class="flex items-center gap-1 text-lg font-semibold">
                    ⭐ {{ tv.vote_average.toFixed(1) }}/10
                </p>
            </div>
        </div>

        <!-- GENRES -->
        <div class="space-y-2">
            <p class="text-sm text-white/50">Genres</p>
            <div class="flex flex-wrap gap-2">
                <span
                    v-for="genre in tv.genres"
                    :key="genre.id"
                    class="rounded-full bg-white/10 px-3 py-1 text-sm text-white/80"
                >
                    {{ genre.name }}
                </span>
            </div>
        </div>
    </section>
</template>
