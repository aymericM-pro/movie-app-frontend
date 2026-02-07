import { computed, ref } from 'vue';
import type { MovieFilters } from '@/components/MovieFilters.component.vue';

export function useMovieFilters() {
    const filters = ref<MovieFilters>({
        sort: 'popularity.desc',
        genres: [],
        ratingRange: [0, 10],
        voteCountMin: 0,
        runtimeRange: [0, 360],
    });

    const hasActiveFilters = computed(() => {
        return (
            filters.value.genres.length > 0 ||
            filters.value.ratingRange[0] !== 0 ||
            filters.value.ratingRange[1] !== 10 ||
            filters.value.voteCountMin > 0 ||
            filters.value.runtimeRange[0] !== 0 ||
            filters.value.runtimeRange[1] !== 360 ||
            filters.value.sort !== 'popularity.desc'
        );
    });

    return {
        filters,
        hasActiveFilters,
    };
}
