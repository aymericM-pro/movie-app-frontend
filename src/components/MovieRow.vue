<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import MovieCard from '@/components/MovieCard.vue';
import type { Movie } from '@/types/movie.types';

const { t } = useI18n();

const props = withDefaults(
    defineProps<{
        titleKey: string;
        fetcher: () => Promise<{ results: Movie[] }>;
        limit?: number;
        mode?: 'grid' | 'ranked';
        layout?: 'row';
        size?: 'sm' | 'md' | 'lg';
    }>(),
    {
        mode: 'grid',
        layout: 'row',
        size: 'lg',
    },
);

const movies = ref<Movie[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const load = async () => {
    loading.value = true;
    error.value = null;

    try {
        const res = await props.fetcher();
        movies.value = props.limit
            ? res.results.slice(0, props.limit)
            : res.results;
    } catch {
        error.value = t('common.loading');
    } finally {
        loading.value = false;
    }
};

onMounted(load);
</script>

<template>
    <section class="mb-10">
        <!-- HEADER -->
        <header class="mb-4 px-4 max-w-[1400px] mx-auto">
            <h2 class="text-xl md:text-2xl font-semibold text-white">
                {{ t(titleKey) }}
            </h2>
        </header>

        <!-- STATES -->
        <div v-if="loading" class="py-6 text-center text-white/70">
            {{ t('common.loading') }}
        </div>

        <div v-else-if="error" class="py-6 text-center text-red-500">
            {{ error }}
        </div>

        <!-- ROW -->
        <div class="flex gap-6 overflow-x-auto">
            <div
                v-for="(movie, index) in movies"
                :key="movie.id"
                class="flex-shrink-0 w-[240px]"
            >
                <MovieCard :index="index" :movie="movie" mode="grid" />
            </div>
        </div>
    </section>
</template>
