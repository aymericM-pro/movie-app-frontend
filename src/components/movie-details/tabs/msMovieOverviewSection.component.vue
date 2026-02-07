<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useMovieDetailsStore } from '@/core/stores/movieDetails.store';

const store = useMovieDetailsStore();

const movie = computed(() => store.movie);
const directors = computed(() => store.directors);

const cast = computed(() => movie.value?.credits?.cast ?? []);
const expanded = ref(false);

const visibleCast = computed(() =>
    expanded.value ? cast.value : cast.value.slice(0, 6),
);
</script>

<template>
    <section v-if="movie" class="space-y-12">
        <!-- INFO BANNER -->
        <div class="mx-auto max-w-[1400px] px-8">
            <div
                class="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm"
            >
                Les informations, saisons et dates de sortie proviennent de la
                base de données publique <strong>TMDB</strong>. Des différences
                peuvent exister selon le pays.
            </div>
        </div>

        <!-- SYNOPSIS -->
        <div class="mx-auto max-w-[1400px] px-8">
            <h2 class="text-xl font-semibold mb-3">Synopsis</h2>
            <p class="text-white/85 leading-relaxed">
                {{ movie.overview || 'Aucun synopsis disponible.' }}
            </p>
        </div>

        <!-- META -->
        <div
            class="mx-auto max-w-[1400px] px-8 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
            <div>
                <p class="text-white/60 text-sm mb-1">Durée</p>
                <p class="font-semibold">
                    {{ movie.runtime ? movie.runtime + ' minutes' : '—' }}
                </p>
            </div>

            <div>
                <p class="text-white/60 text-sm mb-1">Note</p>
                <p class="font-semibold">
                    ⭐ {{ movie.vote_average?.toFixed(1) }}/10
                </p>
            </div>

            <div>
                <p class="text-white/60 text-sm mb-1">Réalisateur</p>
                <p class="font-semibold">
                    {{ directors.map((d: any) => d.name).join(', ') || '—' }}
                </p>
            </div>
        </div>

        <!-- GENRES -->
        <div class="mx-auto max-w-[1400px] px-8">
            <h3 class="text-lg font-semibold mb-3">Genres</h3>
            <div class="flex flex-wrap gap-2">
                <span
                    v-for="g in movie.genres"
                    :key="g.id"
                    class="rounded-full bg-white/10 px-3 py-1 text-sm"
                >
                    {{ g.name }}
                </span>
            </div>
        </div>

        <!-- CAST GRID -->
        <div v-if="cast.length" class="mx-auto max-w-[1400px] px-8">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-semibold">Distribution et équipe</h3>

                <button
                    v-if="cast.length > 6"
                    class="text-sm text-red-400 hover:underline"
                    @click="expanded = !expanded"
                >
                    {{ expanded ? 'Voir moins' : 'Voir tout' }}
                </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                    v-for="c in visibleCast"
                    :key="c.id"
                    class="flex items-center gap-4"
                >
                    <img
                        v-if="c.profile_path"
                        :src="`https://image.tmdb.org/t/p/w185${c.profile_path}`"
                        alt="Actor Photo"
                        class="w-14 h-14 rounded-full object-cover"
                    />

                    <div class="leading-tight">
                        <p class="font-semibold">{{ c.name }}</p>
                        <p class="text-sm text-white/60">{{ c.character }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
