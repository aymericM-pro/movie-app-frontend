import { computed, onMounted, ref } from 'vue';
import { useMovies } from '@/composables/useMovies.composable';

export function useHeroCarousel(limit = 5) {
    const { movies, loading, loadPopularForHero } = useMovies();

    const currentIndex = ref(0);
    const direction = ref<'left' | 'right'>('right');

    const dragStartX = ref<number | null>(null);
    const dragThreshold = 60;

    const currentMovie = computed(
        () => movies.value[currentIndex.value] ?? null,
    );

    const next = () => {
        if (!movies.value.length) {
            return;
        }
        
        direction.value = 'right';
        currentIndex.value = (currentIndex.value + 1) % movies.value.length;
    };

    const prev = () => {
        if (!movies.value.length) {
            return;
        }

        direction.value = 'left';
        currentIndex.value =
            currentIndex.value === 0
                ? movies.value.length - 1
                : currentIndex.value - 1;
    };

    const onPointerDown = (e: PointerEvent) => {
        dragStartX.value = e.clientX;
    };

    const onPointerUp = (e: PointerEvent) => {
        if (dragStartX.value === null) {
            return;
        }

        const deltaX = e.clientX - dragStartX.value;
        dragStartX.value = null;

        if (Math.abs(deltaX) < dragThreshold) {
            return;
        }

        deltaX < 0 ? next() : prev();
    };

    onMounted(async () => {
        await loadPopularForHero(limit);
    });

    return {
        currentMovie,
        loading,
        direction,
        onPointerDown,
        onPointerUp,
    };
}
