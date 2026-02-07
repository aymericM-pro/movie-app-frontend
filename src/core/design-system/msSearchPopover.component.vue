<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

defineProps<{
    open: boolean;
}>();

const emit = defineEmits<(e: 'close') => void>();

const wrapperRef = ref<HTMLElement | null>(null);

const onClickOutside = (e: MouseEvent) => {
    if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
        emit('close');
    }
};

onMounted(() => {
    document.addEventListener('mousedown', onClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('mousedown', onClickOutside);
});
</script>

<template>
    <div ref="wrapperRef" class="relative">
        <!-- INPUT SLOT -->
        <slot name="trigger" />

        <!-- POPOVER -->
        <div
            v-if="open"
            class="absolute left-0 right-0 mt-2 rounded-2xl bg-black/95 backdrop-blur-xl shadow-2xl border border-white/10 overflow-hidden z-50"
        >
            <slot name="content" />
        </div>
    </div>
</template>
