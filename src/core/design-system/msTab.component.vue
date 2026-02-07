<script lang="ts" setup>
import { computed, inject } from 'vue';
import msButton from '@/core/design-system/msButton.component.vue';

const props = defineProps<{
    value: string;
    disabled?: boolean;
}>();

const modelValue = inject<any>('tabs:value');
const update = inject<(v: string) => void>('tabs:update');
const variant = inject<'navigation' | 'segmented'>('tabs:variant');

if (!modelValue || !update || !variant) {
    throw new Error('msTab must be used inside msTabs');
}

const isActive = computed(() => modelValue.value === props.value);
</script>

<template>
    <ms-button
        :class="[
            'relative transition',
            variant === 'navigation'
                ? 'rounded-none px-6 py-4'
                : 'rounded-lg px-4 py-2',
            isActive
                ? variant === 'navigation'
                    ? 'text-white'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'text-white/60 hover:text-white',
        ]"
        :disabled="disabled"
        role="tab"
        size="md"
        variant="ghost"
        @click="update(value)"
    >
        <slot />

        <!-- underline uniquement pour navigation -->
        <span
            v-if="isActive && variant === 'navigation'"
            class="absolute inset-x-0 bottom-0 h-0.5 bg-red-500"
        />
    </ms-button>
</template>
