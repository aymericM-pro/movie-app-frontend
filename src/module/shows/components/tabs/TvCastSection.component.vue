<script lang="ts" setup>
import { getPosterUrl } from '@/core/utils/image.utils';
import { TvCast } from '@/module/shows/models/shows.model.ts';

defineProps<{
    cast: TvCast[];
}>();
</script>

<template>
    <section class="space-y-6">
        <div v-if="!cast.length" class="text-white/60">
            Aucun casting disponible.
        </div>

        <div
            v-else
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
            <div
                v-for="member in cast"
                :key="member.id"
                class="rounded-xl bg-neutral-900/60 p-4 text-center transition hover:bg-neutral-800/70"
            >
                <!-- PHOTO -->
                <img
                    v-if="member.profile_path"
                    :src="getPosterUrl(member.profile_path, 'w185')"
                    class="mx-auto h-[140px] w-[140px] rounded-full object-cover"
                    loading="lazy"
                />

                <div
                    v-else
                    class="mx-auto h-[140px] w-[140px] rounded-full bg-neutral-700 flex items-center justify-center text-white/40 text-sm"
                >
                    N/A
                </div>

                <!-- INFOS -->
                <div class="mt-4 space-y-1">
                    <p class="font-semibold leading-tight">
                        {{ member.name }}
                    </p>

                    <p class="text-sm text-white/60">
                        {{ member.character || '—' }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
