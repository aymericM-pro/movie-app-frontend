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
        :disabled="isDisabled"
        :variant="isActive ? 'primary' : 'pagination'"
        class="min-w-[40px]"
        size="sm"
        @click="update(page)"
    >
        {{ label ?? page }}
    </msButton>
</template>
