<script lang="ts" setup>
import { computed } from 'vue';
import type { Movie } from '@/types/movie.types';
import { useNavigation } from '@/composables/navigation.composable.ts';
import { AppRoute } from '@/router';
import { getHeroImageUrl } from '@/core/utils/image.utils.ts';

interface Props {
    movie: Movie;
    mode?: 'grid' | 'list' | 'ranked';
    index?: number;
}

const props = withDefaults(defineProps<Props>(), {
    mode: 'grid',
});

const { goToWithParams } = useNavigation();

const imageSize = computed<'w154' | 'w342'>(() =>
    props.mode === 'list' ? 'w154' : 'w342',
);

const imageUrl = computed(() =>
    getHeroImageUrl(props.movie.poster_path, null, imageSize.value),
);

const ratingColor = computed(() => {
    const r = props.movie.vote_average;
    if (r >= 7) return 'border-[var(--primary)]';
    if (r >= 5) return 'border-orange-400';
    return 'border-red-500';
});

const goToMovie = () => {
    goToWithParams(AppRoute.MOVIE_DETAIL, { id: props.movie.id });
};
</script>

<template>
    <!-- GRID / RANKED -->
    <div
        v-if="mode !== 'list'"
        class="cursor-pointer transition-transform duration-300 hover:-translate-y-1"
        @click="goToMovie"
    >
        <div class="relative aspect-[2/3] overflow-hidden rounded-xl bg-black">
            <img
                :alt="movie.title"
                :src="imageUrl"
                class="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                loading="lazy"
            />

            <!-- RANK -->
            <div
                v-if="mode === 'ranked' && index !== undefined"
                class="absolute top-0 left-0 w-10 h-10 rounded-br-xl bg-red-600 text-white font-bold flex items-center justify-center"
            >
                {{ index + 1 }}
            </div>

            <!-- RATING -->
            <div
                v-else
                :class="ratingColor"
                class="absolute top-2 right-2 rounded-md border-2 bg-black/80 px-2 py-0.5 text-xs font-bold text-white"
            >
                {{ movie.vote_average.toFixed(1) }}
            </div>
        </div>
    </div>

    <!-- LIST -->
    <article
        v-else
        class="flex gap-4 p-4 rounded-xl bg-neutral-900/70 hover:bg-neutral-800/80 cursor-pointer"
        @click="goToMovie"
    >
        <img
            :src="imageUrl"
            class="w-[90px] rounded-md object-cover"
            loading="lazy"
        />

        <div class="min-w-0">
            <h3 class="font-semibold truncate text-white">
                {{ movie.title }}
            </h3>
            <p class="text-sm text-white/60 line-clamp-2">
                {{ movie.overview }}
            </p>
        </div>
    </article>
</template>
