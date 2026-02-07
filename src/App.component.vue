<script lang="ts" setup>
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
    <div class="min-h-screen bg-black">
        <msHeader :translucent="route.path === '/home'">
            <!-- BRAND -->
            <template #brand>
                <div class="flex items-center gap-2 text-white">
                    <span class="text-xl">🎬</span>
                    <span class="text-lg font-semibold tracking-tight">
                        {{ t('navigation.moviesDatabase') }}
                    </span>
                </div>
            </template>

            <!-- NAV -->
            <template #nav>
                <msNav>
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
                </msNav>
            </template>

            <!-- ACTIONS -->
            <template #actions>
                <div class="flex items-center gap-3">
                    <!-- SEARCH -->
                    <div class="hidden md:block w-[300px]">
                        <msSearchPopover
                            :open="showResults"
                            @close="closeResults"
                        >
                            <!-- INPUT -->
                            <template #trigger>
                                <msInput
                                    v-model="searchQuery"
                                    icon="mdi mdi-magnify"
                                    placeholder="Rechercher un film ou une série…"
                                    variant="header"
                                />
                            </template>

                            <!-- RESULTS -->
                            <template #content>
                                <div
                                    v-if="searchLoading"
                                    class="p-4 text-white/50 text-sm"
                                >
                                    {{ t('common.loading') }}
                                </div>

                                <div v-else>
                                    <button
                                        v-for="item in searchResults"
                                        :key="item.id"
                                        class="flex gap-3 w-full p-3 hover:bg-white/5 transition text-left"
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
                                            class="w-10 h-14 rounded object-cover"
                                        />

                                        <div class="min-w-0">
                                            <p
                                                class="text-sm font-medium text-white truncate"
                                            >
                                                {{ item.title }}
                                            </p>

                                            <p
                                                class="text-xs text-white/60 flex items-center gap-2"
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

                                    <button
                                        class="w-full p-3 text-center text-sm text-white/70 hover:text-white border-t border-white/10"
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

        <main class="w-full">
            <RouterView />
        </main>
    </div>
</template>
