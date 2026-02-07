<script lang="ts" setup>
import type { RouteParams } from 'vue-router';
import { RouterLink, useRoute } from 'vue-router';
import { computed } from 'vue';
import { AppRoute } from '@/router';

const props = defineProps<{
    to: AppRoute;
    label: string;
    params?: RouteParams;
}>();

const route = useRoute();

const isActive = computed(() => {
    if (route.name !== props.to) return false;

    if (!props.params) return true;

    return Object.entries(props.params).every(
        ([key, value]) => String(route.params[key]) === String(value),
    );
});
</script>

<template>
    <RouterLink
        :class="isActive ? 'text-white' : 'text-white/60 hover:text-white'"
        :to="{ name: to, params }"
        class="group relative cursor-pointer px-4 py-2 text-sm font-medium transition"
    >
        {{ label }}

        <!-- underline -->
        <span
            :class="isActive ? 'w-full' : 'w-0 group-hover:w-3/4'"
            class="absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 bg-white transition-all duration-300"
        />
    </RouterLink>
</template>
