<script lang="ts" setup>
import { computed, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

export interface MsDropdownOption {
    label: string;
    value: string;
}

const props = withDefaults(
    defineProps<{
        modelValue: string;
        options: MsDropdownOption[];
        placeholder?: string;
    }>(),
    {
        placeholder: 'Sélectionner',
    },
);

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const open = ref(false);
const root = ref<HTMLElement | null>(null);

onClickOutside(root, () => {
    open.value = false;
});

const selectedLabel = computed(() => {
    return (
        props.options.find((o) => o.value === props.modelValue)?.label ??
        props.placeholder
    );
});

const select = (value: string) => {
    emit('update:modelValue', value);
    open.value = false;
};
</script>

<template>
    <div ref="root" class="relative w-full">
        <!-- Trigger -->
        <button
            class="w-full flex items-center justify-between gap-2 rounded-lg bg-neutral-800 border border-white/10 px-4 py-2 text-sm text-white hover:bg-neutral-700 transition"
            type="button"
            @click="open = !open"
        >
            <span class="truncate">{{ selectedLabel }}</span>
            <span
                :class="open && 'rotate-180'"
                class="text-white/60 transition-transform"
            >
                ▾
            </span>
        </button>

        <!-- Menu -->
        <div
            v-if="open"
            class="absolute z-50 mt-2 w-full rounded-lg bg-neutral-900 border border-white/10 shadow-xl overflow-hidden"
        >
            <button
                v-for="opt in options"
                :key="opt.value"
                :class="opt.value === modelValue && 'bg-neutral-800'"
                class="w-full text-left px-4 py-2 text-sm text-white transition hover:bg-neutral-800"
                type="button"
                @click="select(opt.value)"
            >
                {{ opt.label }}
            </button>
        </div>
    </div>
</template>
