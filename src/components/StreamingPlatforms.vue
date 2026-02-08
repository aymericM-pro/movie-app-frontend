<script lang="ts" setup>
import type { CatalogSource } from '@/types/platform.types';
import { useNavigation } from '@/composables/navigation.composable';
import { useI18n } from 'vue-i18n';
import { AppRoute } from '@/router';
import platforms from '@/datas/platforms.datas';

const { t } = useI18n();
const { goToWithQuery } = useNavigation();

const goToPlatform = (item: CatalogSource) => {
    goToWithQuery(AppRoute.MOVIES, {
        [item.type]: item.id,
        page: 1,
    });
};
</script>

<template>
    <section class="mb-10">
        <!-- TITLE -->
        <h2 class="mb-3 text-xl font-bold text-white">
            🎬 {{ t('common.movies') }} – {{ t('home.trending') }}
        </h2>

        <!-- LIST -->
        <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
            <div
                v-for="platform in platforms"
                :key="platform.id"
                class="flex h-[140px] w-[240px] shrink-0 cursor-pointer flex-col items-center justify-between rounded-2xl bg-white p-4 shadow-xl transition hover:-translate-y-1"
                @click="goToPlatform(platform)"
            >
                <!-- LOGO -->
                <div class="flex flex-1 items-center justify-center w-full">
                    <img
                        :alt="platform.name"
                        :src="platform.logo"
                        class="max-h-[60px] max-w-[120px] object-contain"
                    />
                </div>

                <!-- COUNT -->
                <div
                    class="rounded-full bg-neutral-700 px-4 py-1 text-xs font-medium text-white"
                >
                    {{ t('home.catalogCount', { count: platform.count }) }}
                </div>
            </div>
        </div>
    </section>
</template>
