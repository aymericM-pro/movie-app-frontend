<script lang="ts" setup>
import { computed, inject } from 'vue';
import msButton from '@/core/design-system/msButton.component.vue';

const props = defineProps<{
    page: number;
    label?: string;
}>();

const current = inject<any>('pagination:value')!;
const update = inject<(v: number) => void>('pagination:update')!;
const total = inject<number>('pagination:total')!;

const isActive = computed(() => current.value === props.page);
const isDisabled = computed(() => props.page < 1 || props.page > total);
</script>

<template>
    <msButton
        :class="[
            'min-w-[40px]',
            isActive
                ? 'bg-red-600 text-white'
                : 'bg-neutral-800 text-white/70 hover:text-white',
        ]"
        :disabled="isDisabled"
        size="sm"
        variant="ghost"
        @click="update(page)"
    >
        {{ label ?? page }}
    </msButton>
</template>
