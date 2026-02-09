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
        <!-- TRIGGER -->
        <button
            :class="[
                'w-full flex items-center justify-between gap-2',
                'rounded-lg px-4 py-2 text-sm',
                'bg-surface-raised text-white',
                'border border-white/10',
                'transition',
                'hover:bg-surface-raised-hover hover:border-white/20',
                'focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30',
            ]"
            type="button"
            @click="open = !open"
        >
            <span class="truncate">
                {{ selectedLabel }}
            </span>

            <span
                :class="open && 'rotate-180'"
                class="text-white/60 transition-transform"
            >
                ▾
            </span>
        </button>

        <!-- MENU -->
        <div
            v-if="open"
            class="absolute z-50 mt-2 w-full rounded-lg overflow-hidden bg-overlay-heavy border border-white/10 shadow-xl"
        >
            <button
                v-for="opt in options"
                :key="opt.value"
                :class="[
                    'w-full text-left px-4 py-2 text-sm',
                    'transition cursor-pointer',
                    opt.value === modelValue
                        ? 'bg-primary-600 text-white'
                        : 'text-white/80 hover:bg-white/10',
                ]"
                type="button"
                @click="select(opt.value)"
            >
                {{ opt.label }}
            </button>
        </div>
    </div>
</template>
