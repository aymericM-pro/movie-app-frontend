<script lang="ts" setup>
import HeroCarousel from '@/components/HeroCarousel.vue';
import StreamingPlatforms from '@/components/StreamingPlatforms.vue';
import GenresList from '@/components/GenresList.vue';
import MovieRow from '@/components/MovieRow.vue';
import { useMoviesApi } from '@/services/useMoviesApi.composable';

const {
    getTrendingToday,
    getPopularMovies,
    getTopRatedMovies,
    getNewReleases,
} = useMoviesApi();
</script>
<template>
    <div class="w-full bg-surface-black">
        <HeroCarousel />

        <div
            class="relative z-10 mx-auto max-w-[1400px] px-4 pt-2 pb-6 md:px-0"
        >
            <StreamingPlatforms />
            <GenresList />

            <MovieRow
                :fetcher="() => getTrendingToday()"
                :limit="10"
                layout="row"
                title-key="home.trending"
            />

            <MovieRow
                :fetcher="() => getPopularMovies()"
                title-key="home.popularMovies"
            />

            <MovieRow
                :fetcher="() => getTopRatedMovies()"
                title-key="home.mustWatch"
            />

            <MovieRow
                :fetcher="() => getNewReleases()"
                title-key="home.newReleases"
            />
        </div>
    </div>
</template>
