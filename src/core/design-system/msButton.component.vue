<script lang="ts" setup>
import { computed } from 'vue';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const props = withDefaults(
    defineProps<{
        label?: string;
        variant?: Variant;
        size?: Size;
        disabled?: boolean;
    }>(),
    {
        variant: 'primary',
        size: 'md',
        disabled: false,
    },
);

const baseClasses =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-md transition focus:outline-none';

const variantClasses = computed(() => {
    switch (props.variant) {
        case 'secondary':
            return 'bg-[#2f3542] text-white hover:bg-[#3b4150]';
        case 'ghost':
            return 'bg-transparent text-white/70 hover:text-white hover:bg-white/10';
        default:
            return 'bg-red-600 text-white hover:bg-red-700';
    }
});

const sizeClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'px-3 py-1.5 text-xs';
        case 'lg':
            return 'px-8 py-4 text-base';
        default:
            return 'px-5 py-2.5 text-sm';
    }
});
</script>

<template>
    <button
        :class="[
            baseClasses,
            variantClasses,
            sizeClasses,
            disabled && 'opacity-40 cursor-not-allowed',
        ]"
        :disabled="disabled"
    >
        <slot name="icon" />
        <span v-if="label">{{ label }}</span>
        <slot />
    </button>
</template>
