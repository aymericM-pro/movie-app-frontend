<script lang="ts" setup>
export interface ChipOption {
    label: string;
    value: string | number;
}

const props = withDefaults(
    defineProps<{
        modelValue: (string | number)[];
        options: ChipOption[];
        multiple?: boolean;
    }>(),
    {
        multiple: true,
    },
);

const emit =
    defineEmits<(e: 'update:modelValue', value: (string | number)[]) => void>();

const toggle = (value: string | number) => {
    if (props.multiple) {
        emit(
            'update:modelValue',
            props.modelValue.includes(value)
                ? props.modelValue.filter((v) => v !== value)
                : [...props.modelValue, value],
        );
    } else {
        emit(
            'update:modelValue',
            props.modelValue.includes(value) ? [] : [value],
        );
    }
};

const isActive = (value: string | number) => props.modelValue.includes(value);
</script>

<template>
    <div class="flex flex-wrap gap-2">
        <button
            v-for="opt in options"
            :key="opt.value"
            :class="[
                'rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150',
                'cursor-pointer select-none',
                'focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30',

                isActive(opt.value)
                    ? 'bg-primary-600 text-white border border-primary-600 hover:bg-primary-700'
                    : 'bg-surface-raised text-white/80 border border-white/20 hover:bg-surface-raised-hover hover:border-white/40',
            ]"
            type="button"
            @click="toggle(opt.value)"
        >
            {{ opt.label }}
        </button>
    </div>
</template>
