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
    <div class="relative flex h-12 w-[210px] rounded-lg bg-white/5 p-1">
        <!-- SLIDER -->
        <div
            :class="{ 'translate-x-full': !isCards }"
            class="absolute left-1 top-1 h-10 w-[calc(50%-4px)] rounded-sm bg-red-600 transition-transform duration-300 ease-out"
        />

        <!-- CARDS -->
        <button
            :class="isCards ? 'text-white' : 'text-white/60'"
            class="relative z-10 flex flex-1 items-center justify-center gap-2 text-sm font-medium focus:outline-none focus-visible:outline-none"
            @click="setMode('cards')"
        >
            <span class="mdi mdi-view-grid text-lg" />
            {{ $t('common.cards') }}
        </button>

        <!-- LIST -->
        <button
            :class="!isCards ? 'text-white' : 'text-white/60'"
            class="relative z-10 flex flex-1 items-center justify-center gap-2 text-sm font-medium focus:outline-none focus-visible:outline-none"
            @click="setMode('list')"
        >
            <span class="mdi mdi-view-list text-lg" />
            {{ $t('common.list') }}
        </button>
    </div>
</template>
