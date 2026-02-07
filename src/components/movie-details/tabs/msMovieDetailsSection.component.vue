<script lang="ts" setup>
import { computed } from 'vue';
import { useMovieDetailsStore } from '@/core/stores/movieDetails.store';

const store = useMovieDetailsStore();

const movie = computed(() => store.movie);

const profit = computed(() => {
    if (!movie.value?.budget || !movie.value?.revenue) return null;
    return movie.value.revenue - movie.value.budget;
});
</script>

<template>
    <section v-if="movie" class="space-y-10">
        <!-- Production -->
        <div>
            <h3 class="text-lg font-semibold mb-4">Sociétés de production</h3>

            <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div
                    v-for="c in movie.production_companies"
                    :key="c.id"
                    class="rounded-xl bg-white/5 p-4"
                >
                    {{ c.name }}
                </div>
            </div>
        </div>

        <!-- Pays -->
        <div>
            <h3 class="text-lg font-semibold mb-4">Pays de production</h3>

            <div class="flex flex-wrap gap-2">
                <span
                    v-for="p in movie.production_countries"
                    :key="p.iso_3166_1"
                    class="rounded-full bg-white/10 px-3 py-1 text-sm"
                >
                    {{ p.name }}
                </span>
            </div>
        </div>

        <!-- Langues -->
        <div>
            <h3 class="text-lg font-semibold mb-4">Langues</h3>

            <div class="flex flex-wrap gap-2">
                <span
                    v-for="l in movie.spoken_languages"
                    :key="l.iso_639_1"
                    class="rounded-full bg-white/10 px-3 py-1 text-sm"
                >
                    {{ l.name }}
                </span>
            </div>
        </div>

        <!-- Sortie -->
        <div>
            <h3 class="text-lg font-semibold mb-4">Sortie</h3>

            <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div class="rounded-xl bg-white/5 p-4">
                    <strong>Date :</strong>
                    {{ movie.release_date || '—' }}
                </div>

                <div class="rounded-xl bg-white/5 p-4">
                    <strong>Statut :</strong>
                    {{ movie.status || '—' }}
                </div>
            </div>
        </div>

        <!-- Financier -->
        <div>
            <h3 class="text-lg font-semibold mb-4">Statistiques financières</h3>

            <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div class="rounded-xl bg-white/5 p-4">
                    <strong>Budget :</strong>
                    {{
                        movie.budget
                            ? movie.budget.toLocaleString() + ' $'
                            : '—'
                    }}
                </div>

                <div class="rounded-xl bg-white/5 p-4">
                    <strong>Revenus :</strong>
                    {{
                        movie.revenue
                            ? movie.revenue.toLocaleString() + ' $'
                            : '—'
                    }}
                </div>

                <div
                    v-if="profit !== null"
                    class="md:col-span-2 rounded-xl bg-white/5 p-4"
                >
                    <strong>Bénéfice / Perte :</strong>
                    <span
                        :class="profit > 0 ? 'text-green-400' : 'text-red-400'"
                    >
                        {{ profit.toLocaleString() }} $
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>
