<script lang="ts" setup>
import { computed } from 'vue';
import { useTvDetailsStore } from '@/module/shows/store/tvDetails.store';

const store = useTvDetailsStore();

const videos = computed(
    () => store.videos?.results.filter((v) => v.site === 'YouTube') ?? [],
);

const activeVideo = computed(() => videos.value[0] ?? null);
</script>

<template>
    <section class="mt-6 space-y-10">
        <!-- MAIN VIDEO -->
        <div v-if="activeVideo" class="relative pb-[56.25%]">
            <iframe
                :src="`https://www.youtube.com/embed/${activeVideo.key}`"
                :title="activeVideo.name"
                allowfullscreen
                class="absolute inset-0 w-full h-full rounded-xl"
            />
        </div>
        <!-- LIST -->
        <div
            v-if="videos.length > 1"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
            <button
                v-for="video in videos.slice(1)"
                :key="video.id"
                class="group text-left"
            >
                <div class="relative aspect-video rounded-lg overflow-hidden">
                    <img
                        :src="`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`"
                        alt="Thumbnail de {{ video.name }}"
                        class="w-full h-full object-cover group-hover:scale-105 transition"
                        loading="lazy"
                    />
                    <div class="absolute inset-0 bg-black/40" />
                </div>

                <p class="mt-2 text-sm text-white/80 line-clamp-2">
                    {{ video.name }}
                </p>
            </button>
        </div>

        <!-- EMPTY -->
        <p v-if="!videos.length" class="text-white/60">
            Aucune vidéo disponible.
        </p>
    </section>
</template>
