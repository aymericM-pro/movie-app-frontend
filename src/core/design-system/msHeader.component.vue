<script lang="ts" setup>
defineProps<{
    translucent?: boolean;
}>();
</script>

<template>
    <header
        :class="translucent ? 'bg-black/30' : 'bg-black/80'"
        class="sticky top-0 z-50 border-b border-white/10 backdrop-blur transition-colors"
    >
        <div
            class="mx-auto grid max-w-[1600px] grid-cols-[auto_1fr_auto] items-center px-8 py-4 md:px-6 md:py-3"
        >
            <!-- LEFT -->
            <div class="flex items-center">
                <slot name="brand" />
            </div>

            <!-- CENTER -->
            <div class="flex justify-center">
                <slot name="nav" />
            </div>

            <!-- RIGHT -->
            <div class="flex items-center justify-end gap-4">
                <slot name="actions" />
            </div>
        </div>
    </header>
</template>
