<script lang="ts" setup>
import { ref, watch } from 'vue';
import msDropdown from '@/core/design-system/msDropdown.component.vue';
import msChip from '@/core/design-system/msChip.component.vue';
import msRangeSlider from '@/core/design-system/msRangeSlider.component.vue';
import msButton from '@/core/design-system/msButton.component.vue';

export type MovieFilters = {
    sort: string;
    genres: number[];
    ratingRange: [number, number];
    voteCountMin: number;
    runtimeRange: [number, number];
};

const props = defineProps<{
    modelValue: MovieFilters;
    sortOptions: { label: string; value: string }[];
    genreOptions: { label: string; value: number }[];
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: MovieFilters): void;
    (e: 'apply'): void;
}>();

const filters = ref<MovieFilters>({ ...props.modelValue });

watch(
    () => props.modelValue,
    (v) => {
        filters.value = { ...v };
    },
    { deep: true },
);

const apply = () => {
    emit('update:modelValue', { ...filters.value });
    emit('apply');
};
</script>

<template>
    <aside class="rounded-xl bg-neutral-900 p-6 space-y-6">
        <msDropdown
            v-model="filters.sort"
            :options="sortOptions"
            placeholder="Trier par"
        />

        <div>
            <h3 class="mb-3 text-sm font-semibold">Genres</h3>
            <msChip v-model="filters.genres" :options="genreOptions" />
        </div>

        <msRangeSlider
            v-model="filters.ratingRange"
            :max="10"
            :min="0"
            :step="0.5"
            label="Score d’évaluation"
        />

        <msRangeSlider
            v-model="filters.voteCountMin"
            :max="500"
            :min="0"
            :step="10"
            label="Votes minimum"
            mode="single"
        />

        <msRangeSlider
            v-model="filters.runtimeRange"
            :max="360"
            :min="0"
            :step="10"
            label="Durée (minutes)"
        />

        <msButton
            class="w-full"
            label="Rechercher"
            size="lg"
            variant="secondary"
            @click="apply"
        />
    </aside>
</template>
