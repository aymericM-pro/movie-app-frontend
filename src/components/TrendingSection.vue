<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { tmdbService } from '@/services/useMoviesApi.composable.ts';
import type { Movie } from '@/types/movie.types';
import { useNavigation } from '@/composables/navigation.composable.ts';
import { AppRoute } from '@/router';

const { t } = useI18n();
const { goToWithParams } = useNavigation();

const props = defineProps<{
    titleKey: string;
}>();

const trendingMovies = ref<Movie[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const loadTrending = async () => {
    loading.value = true;
    error.value = null;

    try {
        const response = await tmdbService.getTrendingToday();
        trendingMovies.value = response.results.slice(0, 10);
    } catch {
        error.value = t('common.loading');
    } finally {
        loading.value = false;
    }
};

const goToMovie = (movie: Movie) => {
    goToWithParams(AppRoute.MOVIE_DETAIL, { id: movie.id });
};

onMounted(loadTrending);
</script>

<template>
    <section class="mb-12 bg-primary/10 py-8">
        <div class="mx-auto max-w-[1400px] px-4 md:px-0">
            <h2 class="mb-2 text-2xl font-semibold text-white">
                {{ t(props.titleKey) }}
            </h2>

            <div v-if="loading" class="py-6 text-center text-white/70">
                {{ t('home.trendingLoading') }}
            </div>

            <div v-else-if="error" class="py-6 text-center text-red-500">
                {{ error }}
            </div>

            <div v-else class="overflow-x-auto pb-4">
                <div class="flex gap-4">
                    <article
                        v-for="(movie, index) in trendingMovies"
                        :key="movie.id"
                        class="relative w-[220px] shrink-0 cursor-pointer group"
                        @click="goToMovie(movie)"
                    >
                        <!-- INDEX -->
                        <div
                            class="absolute -top-1 -left-1 z-10 bg-red-600 text-white w-9 h-9 flex items-center justify-center font-bold rounded"
                        >
                            {{ index + 1 }}
                        </div>

                        <!-- POSTER -->
                        <img
                            :alt="movie.title"
                            :src="
                                tmdbService.getImageUrl(
                                    movie.poster_path,
                                    'w342',
                                )
                            "
                            class="rounded-xl transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                        />w

                        <!-- TITLE -->
                        <div
                            class="mt-2 text-center text-sm text-white/90 line-clamp-2"
                        >
                            {{ movie.title || movie.name }}
                        </div>

                        <!-- MEDIA TYPE -->
                        <div class="mt-1 text-center text-xs text-white/50">
                            {{
                                movie.media_type === 'tv'
                                    ? t('home.tv')
                                    : t('home.movie')
                            }}
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </section>
</template>
