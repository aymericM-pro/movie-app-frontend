import { defineStore } from 'pinia';
import { ref } from 'vue';
import { TvDetailsApiResponse } from '@/module/shows/models/shows.model.ts';
import { useShowsApi } from '@/module/shows/composables/useShowsApi.composable.ts';

export const useTvDetailsStore = defineStore('tvDetails', () => {
    const loading = ref(false);
    const tv = ref<TvDetailsApiResponse | null>(null);
    const showsApi = useShowsApi();

    async function fetchTv(id: number) {
        loading.value = true;
        try {
            tv.value = await showsApi.getTvDetails(id);
        } finally {
            loading.value = false;
        }
    }

    return {
        loading,
        tv,
        fetchTv,
    };
});
