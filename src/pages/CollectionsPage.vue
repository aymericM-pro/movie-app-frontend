<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useNavigation } from '@/composables/navigation.composable.ts';
import { useCollections } from '@/composables/useCollections.composable';
import { AppRoute } from '@/router';
import CollectionItem from '@/components/CollectionItem.component.vue';
import SearchAndViewToggle from '@/components/DisplayListMode.component.vue';

const { t } = useI18n();
const { goToWithParams } = useNavigation();

const viewMode = ref<'cards' | 'list'>('cards');

const { collections, searchQuery, loading, searchCollections } =
    useCollections();

const goToCollection = (id: number) => {
    goToWithParams(AppRoute.COLLECTION_DETAIL, { id });
};
</script>

<template>
    <div class="mx-auto min-h-screen max-w-[1400px] px-6 py-12 text-white">
        <header class="space-y-8 text-center">
            <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">
                {{ t('common.collections') }}
            </h1>

            <SearchAndViewToggle
                v-model="searchQuery"
                :placeholder="t('common.collections') + '…'"
                :view-mode="viewMode"
                @search="searchCollections"
                @update:viewMode="viewMode = $event"
            />
        </header>

        <section class="mt-14">
            <div v-if="loading" class="flex justify-center py-16 text-white/60">
                {{ t('common.loading') }}
            </div>

            <div
                v-else
                :class="[
                    'grid gap-6',
                    viewMode === 'cards'
                        ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                        : 'grid-cols-1',
                ]"
            >
                <CollectionItem
                    v-for="collection in collections"
                    :key="collection.id"
                    :collection="collection"
                    :viewMode="viewMode"
                    @select="goToCollection"
                />
            </div>
        </section>
    </div>
</template>
