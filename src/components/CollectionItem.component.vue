<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { PopularCollection } from '@/types/collection.types';
import msButton from '@/core/design-system/msButton.component.vue';
import { getHeroImageUrl, getPosterUrl } from '@/core/utils/image.utils.ts';

const { t } = useI18n();

const props = defineProps<{
    collection: PopularCollection;
    viewMode: 'cards' | 'list';
}>();

const emit = defineEmits<(e: 'select', id: number) => void>();
const posterUrl = computed(() =>
    getPosterUrl(props.collection.posterPath, 'w342'),
);

const imageUrl = computed(() =>
    getHeroImageUrl(
        props.collection.posterPath,
        props.collection.backdropPath,
        'w780',
    ),
);
</script>

<template>
    <article
        :class="[
            'cursor-pointer rounded-xl bg-neutral-900/80 overflow-hidden',
            viewMode === 'list' && 'flex gap-5 p-4',
        ]"
        @click="emit('select', collection.id)"
    >
        <!-- IMAGE (CARDS) -->
        <div v-if="viewMode === 'cards'" class="relative w-full">
            <img
                :src="imageUrl"
                alt=""
                class="w-full aspect-[16/9] object-cover object-center"
                loading="lazy"
            />
        </div>

        <!-- IMAGE (LIST) -->
        <div
            v-if="viewMode === 'list'"
            class="w-[120px] aspect-[2/3] overflow-hidden rounded-lg bg-black"
        >
            <img
                :src="posterUrl"
                alt=""
                class="h-full w-full object-cover object-center"
                loading="lazy"
            />
        </div>

        <!-- CONTENT (CARDS) -->
        <div v-if="viewMode === 'cards'" class="p-4 flex flex-col gap-2">
            <h3 class="text-sm font-semibold text-white leading-tight">
                {{ collection.name }}
            </h3>

            <p class="text-xs text-white/70 line-clamp-2">
                {{ collection.overview }}
            </p>

            <div class="text-[11px] text-white/50">
                {{
                    t('collection.filmsCount', {
                        count: collection.partsCount,
                    })
                }}
            </div>

            <div class="mt-2 flex flex-wrap gap-2" @click.stop>
                <msButton size="sm" variant="secondary">
                    {{ t('common.watchlist') }}
                </msButton>
                <msButton size="sm" variant="secondary">
                    {{ t('common.favorites') }}
                </msButton>
                <msButton size="sm" variant="secondary">
                    {{ t('common.addToList') }}
                </msButton>
            </div>
        </div>

        <div
            v-if="viewMode === 'list'"
            class="flex flex-1 flex-col justify-between"
        >
            <div>
                <h3 class="text-base font-semibold text-white">
                    {{ collection.name }}
                </h3>

                <div class="mt-1 text-xs text-white/50">
                    {{
                        t('collection.filmsCount', {
                            count: collection.partsCount,
                        })
                    }}
                </div>

                <p class="mt-2 text-sm text-white/70 line-clamp-3">
                    {{ collection.overview }}
                </p>
            </div>

            <div class="mt-4 flex gap-2" @click.stop>
                <msButton size="sm" variant="secondary">
                    {{ t('common.watchlist') }}
                </msButton>
                <msButton size="sm" variant="secondary">
                    {{ t('common.favorites') }}
                </msButton>
                <msButton size="sm" variant="secondary">
                    {{ t('common.addToList') }}
                </msButton>
            </div>
        </div>
    </article>
</template>
