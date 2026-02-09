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
    <nav class="mt-12 flex flex-wrap items-center justify-center gap-2">
        <msButton
            :disabled="modelValue === 1"
            size="sm"
            variant="secondary"
            @click="go(modelValue - 1)"
        >
            ‹ Précédent
        </msButton>

        <template v-for="(p, i) in pages" :key="i">
            <span
                v-if="p === '...'"
                class="px-2 text-sm text-white/40 select-none"
            >
                …
            </span>

            <msButton
                v-else
                :variant="p === modelValue ? 'primary' : 'pagination'"
                size="sm"
                @click="go(p)"
            >
                {{ p }}
            </msButton>
        </template>

        <msButton
            :disabled="modelValue === totalPages"
            size="sm"
            variant="secondary"
            @click="go(modelValue + 1)"
        >
            Suivant ›
        </msButton>
    </nav>
</template>
