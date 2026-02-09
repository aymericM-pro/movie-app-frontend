<script lang="ts" setup>
import { TvSeason } from '@/module/shows/models/shows.model.ts';
import { getPosterUrl } from '@/core/utils/image.utils.ts';

defineProps<{
    seasons: TvSeason[];
}>();
</script>

<template>
    <div class="space-y-6">
        <div
            v-for="season in seasons"
            :key="season.season_number"
            class="flex gap-6 rounded-xl bg-neutral-900/60 p-4"
        >
            <img
                v-if="season.poster_path"
                :src="getPosterUrl(season.poster_path, 'w185')"
                class="w-[120px] rounded-md"
            />

            <div class="space-y-2">
                <h3 class="text-xl font-semibold">
                    {{ season.name }}
                </h3>

                <div class="text-sm text-white/60">
                    {{ season.episode_count }} épisodes
                    <span v-if="season.air_date">
                        • {{ season.air_date.slice(0, 4) }}
                    </span>
                </div>

                <p class="text-white/70 line-clamp-3">
                    {{ season.overview || 'Aucune description.' }}
                </p>
            </div>
        </div>
    </div>
</template>
