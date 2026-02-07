<script lang="ts" setup>
import { AppRoute } from '@/router';
import { useNavigation } from '@/composables/navigation.composable.ts';
import genres from '@/datas/genders.datas.ts';

interface Genre {
    id: number;
    name: string;
    image?: string;
}

const { goToWithQuery } = useNavigation();

const goToGenre = (genre: Genre) => {
    goToWithQuery(AppRoute.MOVIES, {
        genre: genre.id,
        page: 1,
    });
};
</script>

<template>
    <section class="mb-10">
        <h2 class="mb-3 text-xl font-bold text-white">🎬 Genres</h2>

        <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <div
                v-for="genre in genres"
                :key="genre.id"
                :style="{ backgroundImage: `url(${genre.image})` }"
                class="relative w-[240px] h-[140px] shrink-0 rounded-xl overflow-hidden cursor-pointer bg-cover bg-center bg-no-repeat transition-transform duration-500 hover:scale-[1.05]"
                @click="goToGenre(genre)"
            >
                <div
                    class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-4"
                >
                    <span class="text-white font-semibold text-sm">
                        {{ genre.name }}
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>
