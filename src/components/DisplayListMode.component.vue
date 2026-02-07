<script lang="ts" setup>
import { computed } from 'vue';
import msInput from '@/core/design-system/msInput.component.vue';
import msToggle from '@/core/design-system/msToggle.component.vue';

const props = defineProps<{
    modelValue: string;
    viewMode: 'cards' | 'list';
    placeholder: string;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'update:viewMode', value: 'cards' | 'list'): void;
    (e: 'search'): void;
}>();

const query = computed({
    get: () => props.modelValue,
    set: (v: string) => emit('update:modelValue', v),
});
</script>
<template>
    <div
        class="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
        <!-- SEARCH INPUT -->
        <div class="w-full sm:max-w-[420px]">
            <msInput
                v-model="query"
                :placeholder="placeholder"
                icon="mdi mdi-magnify"
                size="sm"
                @blur="$emit('search')"
                @keydown.enter.prevent="$emit('search')"
            />
        </div>

        <!-- VIEW TOGGLE -->
        <msToggle
            :model-value="viewMode"
            size="sm"
            @update:modelValue="$emit('update:viewMode', $event)"
        />
    </div>
</template>
