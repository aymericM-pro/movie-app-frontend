<script generic="T" lang="ts" setup>
import { useI18n } from 'vue-i18n';

interface Props {
    items: T[];
    loading?: boolean;
    error?: string | null;
}

withDefaults(defineProps<Props>(), {
    loading: false,
    error: null,
});

const { t } = useI18n();
</script>

<template>
    <div class="w-full">
        <!-- LOADING -->
        <div
            v-if="loading"
            class="flex min-h-[400px] flex-col items-center justify-center text-white/70"
        >
            <div
                class="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-[var(--primary)]"
            />
            <p class="text-sm">
                {{ t('common.loading') }}
            </p>
        </div>

        <!-- ERROR -->
        <div
            v-else-if="error"
            class="flex min-h-[400px] items-center justify-center text-red-400"
        >
            <p class="text-sm">
                {{ error }}
            </p>
        </div>

        <!-- EMPTY -->
        <div
            v-else-if="items.length === 0"
            class="flex min-h-[400px] items-center justify-center text-white/50"
        >
            <p class="text-sm">
                {{ t('common.empty', 'Aucun élément à afficher') }}
            </p>
        </div>

        <!-- LIST -->
        <div
            v-else
            class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6 p-6 sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] sm:gap-4 sm:p-4"
        >
            <slot
                v-for="item in items"
                :key="(item as any).id"
                :item="item"
                name="item"
            />
        </div>
    </div>
</template>
