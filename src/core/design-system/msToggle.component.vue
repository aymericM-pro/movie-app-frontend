<script lang="ts" setup>
import { computed } from 'vue';

export type ViewMode = 'cards' | 'list';

const props = defineProps<{
    modelValue: ViewMode;
}>();

const emit = defineEmits<(e: 'update:modelValue', value: ViewMode) => void>();

const isCards = computed(() => props.modelValue === 'cards');

const setMode = (mode: ViewMode) => {
    if (props.modelValue !== mode) {
        emit('update:modelValue', mode);
    }
};
</script>

<template>
    <div class="relative flex h-11 w-[210px] rounded-xl bg-surface-raised p-1">
        <!-- slider -->
        <div
            :class="{ 'translate-x-full': !isCards }"
            class="absolute top-1 left-1 h-9 w-[calc(50%-4px)] rounded-lg bg-primary-600 transition-transform duration-300"
        />

        <!-- cards -->
        <button
            :class="isCards ? 'text-white' : 'text-white/60 hover:text-white'"
            class="relative z-10 flex flex-1 items-center justify-center gap-2 text-sm font-medium transition"
            @click="setMode('cards')"
        >
            <span class="mdi mdi-view-grid text-lg" />
            {{ $t('common.cards') }}
        </button>

        <!-- list -->
        <button
            :class="!isCards ? 'text-white' : 'text-white/60 hover:text-white'"
            class="relative z-10 flex flex-1 items-center justify-center gap-2 text-sm font-medium transition"
            @click="setMode('list')"
        >
            <span class="mdi mdi-view-list text-lg" />
            {{ $t('common.list') }}
        </button>
    </div>
</template>
