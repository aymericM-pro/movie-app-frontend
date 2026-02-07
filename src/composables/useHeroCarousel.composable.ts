import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useMovies } from '@/composables/useMovies.composable';

export function useHeroCarousel(limit = 5, autoplayDelay = 6000) {
    const { movies, loading, loadPopularForHero } = useMovies();

    const currentIndex = ref(0);
    const direction = ref<'left' | 'right'>('right');
    const autoPlayInterval = ref<number | null>(null);

    const currentMovie = computed(
        () => movies.value[currentIndex.value] ?? null,
    );

    const next = () => {
        if (!movies.value.length) return;
        direction.value = 'right';
        currentIndex.value = (currentIndex.value + 1) % movies.value.length;
    };

    const prev = () => {
        if (!movies.value.length) return;
        direction.value = 'left';
        currentIndex.value =
            currentIndex.value === 0
                ? movies.value.length - 1
                : currentIndex.value - 1;
    };

    const startAutoplay = () => {
        stopAutoplay();
        autoPlayInterval.value = window.setInterval(next, autoplayDelay);
    };

    const stopAutoplay = () => {
        if (autoPlayInterval.value) {
            clearInterval(autoPlayInterval.value);
            autoPlayInterval.value = null;
        }
    };

    onMounted(async () => {
        await loadPopularForHero(limit);
        if (movies.value.length) startAutoplay();
    });

    onUnmounted(stopAutoplay);

    return {
        currentMovie,
        loading,
        direction,

        next,
        prev,
        startAutoplay,
        stopAutoplay,
    };
}
