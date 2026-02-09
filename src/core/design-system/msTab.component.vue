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

const buttonVariant = computed(() => {
    if (variant === 'segmented') {
        return isActive.value ? 'primary' : 'secondary';
    }

    return 'ghost';
});
</script>

<template>
    <msButton
        :class="
            variant === 'navigation' ? 'rounded-none px-6 py-4' : 'px-4 py-2'
        "
        :disabled="disabled"
        :variant="buttonVariant"
        class="relative"
        role="tab"
        size="md"
        @click="update(value)"
    >
        <slot />

        <!-- underline navigation -->
        <span
            v-if="isActive && variant === 'navigation'"
            class="absolute inset-x-0 bottom-0 h-0.5 bg-primary-600"
        />
    </msButton>
</template>
