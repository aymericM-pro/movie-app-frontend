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

const emit = defineEmits<{
    (e: 'update:modelValue', value: (string | number)[]): void;
}>();

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
                'rounded-full px-4 py-1.5 text-sm transition border',
                isActive(opt.value)
                    ? 'bg-[var(--primary)] text-black border-[var(--primary)]'
                    : 'border-white/30 text-white hover:border-white',
            ]"
            type="button"
            @click="toggle(opt.value)"
        >
            {{ opt.label }}
        </button>
    </div>
</template>
