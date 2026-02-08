<script lang="ts" setup>
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import GenericList from '@/components/GenericList.vue';
import MovieCard from '@/components/MovieCard.vue';
import { useMovies } from '@/composables/useMovies.composable';

const { t } = useI18n();

const { movies, loading, loadMovies } = useMovies();

onMounted(() => {
    loadMovies({
        page: 1,
        hasActiveFilters: false,
    });
});
</script>

<template>
    <section class="min-h-screen bg-black text-white">
        <!-- HEADER -->
        <header
            class="mx-auto max-w-[1400px] px-6 py-16 text-center bg-gradient-to-b from-[rgba(255,0,0,0.15)] to-transparent"
        >
            <h1 class="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
                {{ t('home.popularMovies') }}
            </h1>

            <p class="mx-auto max-w-2xl text-white/70">
                {{ t('home.mustWatch') }}
            </p>
        </header>

        <!-- LIST -->
        <div class="mx-auto max-w-[1400px] px-6 pb-20">
            <GenericList :items="movies" :loading="loading">
                <template #item="{ item }">
                    <MovieCard :movie="item" />
                </template>
            </GenericList>
        </div>
    </section>
</template>
