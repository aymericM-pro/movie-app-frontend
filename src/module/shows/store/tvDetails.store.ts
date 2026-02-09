import { defineStore } from 'pinia';
import { ref } from 'vue';
import type {
    TvCredits,
    TvImagesResponse,
    TvMainDetails,
    TvSearchResponse,
    TvSeason,
    TvVideosResponse,
} from '@/module/shows/models/shows.model';
import { useShowsApi } from '@/module/shows/composables/useShowsApi.composable.ts';

export const useTvDetailsStore = defineStore('tvDetails', () => {
    const { getTvDetails } = useShowsApi();

    const loading = ref(false);

    const tv = ref<TvMainDetails | null>(null);
    const credits = ref<TvCredits | null>(null);
    const seasons = ref<TvSeason[]>([]);

    const images = ref<TvImagesResponse | null>(null);
    const videos = ref<TvVideosResponse | null>(null);
    const similar = ref<TvSearchResponse | null>(null);

    const fetchTv = async (tvId: number, language = 'fr-FR') => {
        loading.value = true;

        try {
            const res = await getTvDetails(tvId, language);

            tv.value = res.details;
            credits.value = res.credits;
            seasons.value = res.details.seasons;

            images.value = res.images;
            videos.value = res.videos;
            similar.value = res.similar;
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,

        tv,
        credits,
        seasons,

        images,
        videos,
        similar,

        fetchTv,
    };
});
