<script lang="ts" setup>
import { computed } from 'vue';

type Variant = 'primary' | 'secondary' | 'ghost' | 'pagination';
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
    'inline-flex items-center justify-center gap-2 ' +
    'rounded-md font-semibold ' +
    'transition-all duration-150 ' +
    'focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30';

const variantClasses = computed(() => {
    if (props.disabled) {
        return 'bg-surface-raised text-white/40';
    }

    switch (props.variant) {
        case 'secondary':
            return `
                bg-surface-raised
                text-white
                border border-white/10
                hover:bg-surface-raised-hover
                hover:border-white/20
            `;

        case 'pagination':
            return `
                bg-surface-elevated
                text-white/80
                border border-white/10
                hover:text-white
                hover:bg-surface-raised
                hover:border-white/20
            `;

        case 'ghost':
            return `
                bg-transparent
                text-white/60
                hover:text-white
                hover:bg-white/10
            `;

        default:
            return `
                bg-primary-600
                text-white
                shadow-md
                hover:bg-primary-700
                hover:shadow-lg
            `;
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
            disabled
                ? 'cursor-not-allowed pointer-events-none'
                : 'cursor-pointer',
        ]"
        :disabled="disabled"
    >
        <slot name="icon" />
        <span v-if="label">{{ label }}</span>
        <slot />
    </button>
</template>
