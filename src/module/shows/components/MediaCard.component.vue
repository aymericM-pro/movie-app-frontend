<script lang="ts" setup>
import { computed } from 'vue';
import type { Media } from '@/module/shows/models/media.model';
import { useNavigation } from '@/composables/navigation.composable';
import { AppRoute } from '@/router';
import { getHeroImageUrl } from '@/core/utils/image.utils';

interface Props {
    media: Media;
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
    getHeroImageUrl(props.media.poster_path, null, imageSize.value),
);

const goTo = () => {
    goToWithParams(
        props.media.media_type === 'movie'
            ? AppRoute.MOVIE_DETAIL
            : AppRoute.SHOWS,
        { id: props.media.id },
    );
};
</script>

<template>
    <div
        class="cursor-pointer transition-transform hover:-translate-y-1"
        @click="goTo"
    >
        <div class="relative aspect-[2/3] rounded-xl overflow-hidden bg-black">
            <img
                :src="imageUrl"
                class="w-full h-full object-cover"
                loading="lazy"
            />
            <div
                class="absolute top-2 right-2 rounded-md bg-black/80 px-2 py-0.5 text-xs font-bold text-white"
            >
                {{ media.vote_average.toFixed(1) }}
            </div>
        </div>

        <h3 class="mt-2 text-sm font-semibold truncate">
            {{ media.title }}
        </h3>
    </div>
</template>
