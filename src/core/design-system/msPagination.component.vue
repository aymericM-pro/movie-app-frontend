<script lang="ts" setup>
import { computed } from 'vue';
import msButton from '@/core/design-system/msButton.component.vue';

const props = withDefaults(
    defineProps<{
        modelValue: number;
        totalPages: number;
        range?: number;
    }>(),
    { range: 1 },
);

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void;
}>();

const pages = computed(() => {
    const current = props.modelValue;
    const total = props.totalPages;
    const r = props.range;

    const result: (number | '...')[] = [];

    const start = Math.max(2, current - r);
    const end = Math.min(total - 1, current + r);

    result.push(1);

    if (start > 2) result.push('...');

    for (let i = start; i <= end; i++) {
        result.push(i);
    }

    if (end < total - 1) result.push('...');

    if (total > 1) result.push(total);

    return result;
});

const go = (p: number) => {
    if (p >= 1 && p <= props.totalPages) {
        emit('update:modelValue', p);
    }
};
</script>

<template>
    <nav class="mt-12 flex justify-center items-center gap-2">
        <!-- Précédent -->
        <msButton
            :disabled="modelValue === 1"
            class="pagination-btn"
            @click="go(modelValue - 1)"
        >
            ‹ Précédent
        </msButton>

        <!-- Pages -->
        <template v-for="(p, i) in pages" :key="i">
            <span v-if="p === '...'" class="px-2 text-white/40 select-none">
                …
            </span>

            <msButton
                v-else
                :class="{
                    'pagination-active': p === modelValue,
                }"
                class="pagination-btn"
                @click="go(p)"
            >
                {{ p }}
            </msButton>
        </template>

        <!-- Suivant -->
        <msButton
            :disabled="modelValue === totalPages"
            class="pagination-btn"
            @click="go(modelValue + 1)"
        >
            Suivant ›
        </msButton>
    </nav>
</template>

<style scoped>
.pagination-btn {
    background-color: #2f3542;
    color: #ffffff;
    padding: 0.5rem 0.9rem;
    border-radius: 0.6rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.15s ease;
}

.pagination-btn:not(.pagination-active):hover {
    background-color: #3b4150;
    transform: translateY(-1px);
}

.pagination-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.pagination-active {
    background-color: #e50914;
}
</style>
