<script lang="ts" setup>
import MsButton from '@/core/design-system/msButton.component.vue';
import { useHeroCarousel } from '@/composables/useHeroCarousel.composable';
import { getHeroImageUrl } from '@/core/utils/image.utils';
import { useNavigation } from '@/composables/navigation.composable';
import { AppRoute } from '@/router';

const { goToWithParams } = useNavigation();

const { currentMovie, loading, direction, onPointerDown, onPointerUp } =
    useHeroCarousel(5);

const goToDetails = () => {
    if (!currentMovie.value) return;

    goToWithParams(AppRoute.MOVIE_DETAIL, {
        id: currentMovie.value.id,
    });
};
</script>

<template>
    <section
        class="relative h-screen w-full overflow-hidden cursor-grab active:cursor-grabbing"
        @pointerdown="onPointerDown"
        @pointerup="onPointerUp"
    >
        <!-- LOADING -->
        <div
            v-if="loading"
            class="flex h-full items-center justify-center text-white/70 text-xl"
        >
            Chargement…
        </div>

        <!-- CAROUSEL -->
        <div v-else class="relative h-full w-full">
            <Transition
                :name="direction === 'right' ? 'slide-right' : 'slide-left'"
                mode="out-in"
            >
                <div
                    v-if="currentMovie"
                    :key="currentMovie.id"
                    :style="{
                        backgroundImage: `
                            linear-gradient(
                              to right,
                              rgba(0,0,0,.9),
                              rgba(0,0,0,.4),
                              rgba(0,0,0,.9)
                            ),
                            url(${getHeroImageUrl(
                                currentMovie.poster_path,
                                currentMovie.backdrop_path,
                                'w1280',
                            )})`,
                    }"
                    class="absolute inset-0 flex items-center bg-cover bg-center"
                >
                    <div class="mx-auto w-full max-w-[1400px] px-10">
                        <div class="max-w-2xl">
                            <h1
                                class="mb-4 text-5xl font-extrabold text-white drop-shadow-lg md:text-4xl"
                            >
                                {{ currentMovie.title }}
                            </h1>

                            <div
                                class="mb-6 flex items-center gap-6 text-white/80"
                            >
                                <span class="text-yellow-400 font-bold">
                                    ⭐
                                    {{ currentMovie.vote_average.toFixed(1) }}
                                </span>
                                <span>
                                    {{
                                        new Date(
                                            currentMovie.release_date,
                                        ).getFullYear()
                                    }}
                                </span>
                            </div>

                            <p
                                class="mb-8 text-white/90 leading-relaxed line-clamp-4"
                            >
                                {{ currentMovie.overview }}
                            </p>

                            <div class="flex gap-4">
                                <MsButton label="Lecture" variant="primary">
                                    <template #icon>▶</template>
                                </MsButton>

                                <MsButton
                                    label="Plus d'infos"
                                    variant="secondary"
                                    @click="goToDetails"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </section>
</template>

<style>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
    transition:
        transform 0.7s ease,
        opacity 0.7s ease;
}

.slide-right-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

.slide-right-leave-to {
    transform: translateX(-30%);
    opacity: 0;
}

.slide-left-enter-from {
    transform: translateX(-100%);
    opacity: 0;
}

.slide-left-leave-to {
    transform: translateX(30%);
    opacity: 0;
}
</style>
