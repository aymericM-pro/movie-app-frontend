<script lang="ts" setup>
import { RouterView } from 'vue-router';

import msHeader from '@/core/design-system/msHeader.component.vue';
import msNav from '@/core/design-system/msNav.component.vue';
import msLink from '@/core/design-system/msLink.component.vue';
import msButton from '@/core/design-system/msButton.component.vue';
import msInput from '@/core/design-system/msInput.component.vue';
import msSearchPopover from '@/core/design-system/msSearchPopover.component.vue';

import { AppRoute } from '@/router';
import { getHeroImageUrl } from '@/core/utils/image.utils';
import { useAppLayout } from '@/composables/useAppLayout.component';

const {
    route,
    t,
    locale,
    authStore,
    login,
    register,
    logout,
    toggleLanguage,
    searchQuery,
    searchResults,
    searchLoading,
    showResults,
    closeResults,
    goToSearch,
    goToItem,
} = useAppLayout();
</script>

<template>
    <div class="min-h-screen bg-black text-on-surface">
        <!-- HEADER -->
        <msHeader
            :translucent="route.path === AppRoute.HOME"
            class="text-on-surface"
        >
            <!-- BRAND -->
            <template #brand>
                <div class="flex items-center gap-2 text-on-surface">
                    <span class="text-xl">🎬</span>
                    <span class="text-lg font-semibold tracking-tight">
                        {{ t('navigation.moviesDatabase') }}
                    </span>
                </div>
            </template>

            <!-- NAVIGATION -->
            <template #nav>
                <msNav class="text-on-surface">
                    <msLink :label="t('common.home')" :to="AppRoute.HOME" />
                    <msLink :label="t('common.movies')" :to="AppRoute.MOVIES" />
                    <msLink
                        :label="t('common.collections')"
                        :to="AppRoute.COLLECTIONS"
                    />
                    <msLink
                        v-if="authStore.isAuthenticated"
                        :label="t('common.library')"
                        :to="AppRoute.USER_LIBRARY"
                    />
                    <msLink :to="AppRoute.SHOWS" label="shows" />
                </msNav>
            </template>

            <!-- ACTIONS -->
            <template #actions>
                <div class="flex items-center gap-3 text-on-surface">
                    <!-- SEARCH -->
                    <div class="hidden md:block w-[300px]">
                        <msSearchPopover
                            :open="showResults"
                            @close="closeResults"
                        >
                            <!-- TRIGGER -->
                            <template #trigger>
                                <msInput
                                    v-model="searchQuery"
                                    icon="mdi mdi-magnify"
                                    placeholder="Rechercher un film ou une série…"
                                    variant="header"
                                />
                            </template>

                            <!-- CONTENT -->
                            <template #content>
                                <!-- LOADING -->
                                <div
                                    v-if="searchLoading"
                                    class="p-4 text-sm text-white/70"
                                >
                                    {{ t('common.loading') }}
                                </div>

                                <!-- RESULTS -->
                                <div v-else class="text-white">
                                    <button
                                        v-for="item in searchResults"
                                        :key="item.id"
                                        class="flex w-full gap-3 p-3 text-left cursor-pointer transition-all duration-150 hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
                                        @click="goToItem(item)"
                                    >
                                        <img
                                            :src="
                                                getHeroImageUrl(
                                                    item.poster_path,
                                                    null,
                                                    'w92',
                                                )
                                            "
                                            alt="Poster"
                                            class="h-14 w-10 rounded object-cover"
                                        />

                                        <div class="min-w-0">
                                            <!-- TITLE -->
                                            <p
                                                class="truncate text-sm font-medium text-white"
                                            >
                                                {{ item.title }}
                                            </p>

                                            <!-- META -->
                                            <p
                                                class="mt-0.5 flex items-center gap-2 text-xs text-white/70"
                                            >
                                                <span>
                                                    {{
                                                        item.media_type === 'tv'
                                                            ? 'Série'
                                                            : 'Film'
                                                    }}
                                                </span>
                                                <span>
                                                    • ⭐
                                                    {{
                                                        item.vote_average.toFixed(
                                                            1,
                                                        )
                                                    }}
                                                </span>
                                                <span>
                                                    •
                                                    {{
                                                        (
                                                            item.release_date ||
                                                            ''
                                                        ).slice(0, 4)
                                                    }}
                                                </span>
                                            </p>
                                        </div>
                                    </button>

                                    <!-- SEE ALL -->
                                    <button
                                        class="w-full border-t border-white/10 p-3 text-center text-sm text-white/80 transition hover:text-white"
                                        @click="goToSearch"
                                    >
                                        Voir tous les résultats
                                    </button>
                                </div>
                            </template>
                        </msSearchPopover>
                    </div>

                    <!-- LANGUAGE -->
                    <msButton
                        size="sm"
                        variant="secondary"
                        @click="toggleLanguage"
                    >
                        {{ locale === 'fr' ? 'FR' : 'EN' }}
                    </msButton>

                    <!-- AUTH -->
                    <template v-if="!authStore.isAuthenticated">
                        <msButton
                            size="sm"
                            variant="secondary"
                            @click="register"
                        >
                            {{ t('auth.register') }}
                        </msButton>

                        <msButton size="sm" variant="primary" @click="login">
                            {{ t('auth.login') }}
                        </msButton>
                    </template>

                    <template v-else>
                        <msButton size="sm" variant="secondary" @click="logout">
                            {{ t('auth.logout') }}
                        </msButton>
                    </template>
                </div>
            </template>
        </msHeader>

        <!-- MAIN -->
        <main class="relative z-10 w-full">
            <RouterView />
        </main>
    </div>
</template>
