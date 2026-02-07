<script lang="ts" setup>
import { provide, toRef } from 'vue';

export type TabsVariant = 'navigation' | 'segmented';

const props = withDefaults(
    defineProps<{
        modelValue: string;
        inset?: boolean;
        variant?: TabsVariant;
    }>(),
    {
        inset: true,
        variant: 'navigation',
    },
);

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

provide('tabs:value', toRef(props, 'modelValue'));
provide('tabs:update', (v: string) => emit('update:modelValue', v));
provide('tabs:variant', props.variant);
</script>

<template>
    <nav
        :class="[
            variant === 'navigation'
                ? 'flex border-b border-white/15'
                : 'inline-flex rounded-xl bg-white/5 p-1 gap-1',
            inset && 'ms-1 md:ms-2',
        ]"
        role="tablist"
    >
        <slot />
    </nav>
</template>
