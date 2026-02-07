<script lang="ts" setup>
import { computed } from 'vue';

type Size = 'sm' | 'md' | 'lg';
type Variant = 'default' | 'header';

const props = withDefaults(
    defineProps<{
        modelValue: string;
        placeholder?: string;
        type?: string;
        disabled?: boolean;
        readonly?: boolean;
        size?: Size;
        icon?: string;
        variant?: Variant;
    }>(),
    {
        type: 'text',
        size: 'md',
        variant: 'default',
        disabled: false,
        readonly: false,
    },
);

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'blur'): void;
    (e: 'keydown', event: KeyboardEvent): void;
}>();

/* -----------------------------
   Base
-------------------------------- */
const baseClasses =
    'w-full rounded-full border text-white outline-none transition disabled:opacity-50 disabled:cursor-not-allowed';

/* -----------------------------
   Variant (KEY PART)
-------------------------------- */
const variantClasses = computed(() => {
    if (props.variant === 'header') {
        return `
            h-9
            bg-white/5
            border-white/10
            text-sm
            placeholder-white/40
            focus:border-white/30
        `;
    }

    // default (pages, filters, search page)
    return `
        h-11
        bg-white/10
        border-white/20
        text-sm
        placeholder-white/40
        focus:border-white/40
    `;
});

/* -----------------------------
   Padding
-------------------------------- */
const paddingClasses = computed(() => {
    if (props.icon) {
        return props.variant === 'header' ? 'pl-9 pr-3' : 'pl-12 pr-5';
    }

    return props.variant === 'header' ? 'px-4' : 'px-5';
});
</script>

<template>
    <div class="relative w-full">
        <!-- ICON -->
        <span
            v-if="icon"
            :class="icon"
            class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/50 text-sm"
        />

        <!-- INPUT -->
        <input
            :class="[baseClasses, variantClasses, paddingClasses]"
            :disabled="disabled"
            :placeholder="placeholder"
            :readonly="readonly"
            :type="type"
            :value="modelValue"
            @blur="emit('blur')"
            @input="
                emit(
                    'update:modelValue',
                    ($event.target as HTMLInputElement).value,
                )
            "
            @keydown="emit('keydown', $event)"
        />
    </div>
</template>
