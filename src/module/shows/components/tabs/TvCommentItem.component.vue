<script lang="ts" setup>
import { ref, inject } from 'vue';
import type {
    CommentNode,
    CommentActions,
} from '@/module/shows/components/tabs/comments.model';

defineOptions({ name: 'TvCommentItem' });

const props = defineProps<{
    comment: CommentNode;
    depth: number;
}>();

const actions = inject<CommentActions>('commentActions')!;
const isReplying = ref(false);
const replyText = ref('');

function openReply() {
    isReplying.value = true;
    replyText.value = '';
}

function cancelReply() {
    isReplying.value = false;
    replyText.value = '';
}

function submitReply() {
    const text = replyText.value.trim();
    if (!text) return;
    actions.addReply(props.comment.id, text);
    isReplying.value = false;
    replyText.value = '';
}
</script>

<template>
    <li>
        <!-- COMMENT CARD -->
        <div
            :class="[
                'rounded-lg px-4 py-3',
                depth === 0
                    ? 'bg-neutral-800/70'
                    : 'bg-neutral-800/40',
            ]"
        >
            <p class="leading-relaxed text-white/80">{{ comment.text }}</p>

            <!-- ACTIONS BAR -->
            <div class="mt-2 flex items-center gap-3">
                <span class="text-xs text-white/40">{{ comment.date }}</span>

                <!-- LIKE -->
                <button
                    class="flex items-center gap-1 text-xs transition"
                    :class="
                        comment.liked
                            ? 'text-green-400'
                            : 'text-white/50 hover:text-green-400'
                    "
                    @click="actions.toggleLike(comment.id)"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
                        />
                    </svg>
                    {{ comment.likes }}
                </button>

                <!-- DISLIKE -->
                <button
                    class="flex items-center gap-1 text-xs transition"
                    :class="
                        comment.disliked
                            ? 'text-red-400'
                            : 'text-white/50 hover:text-red-400'
                    "
                    @click="actions.toggleDislike(comment.id)"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3.5 w-3.5 rotate-180"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
                        />
                    </svg>
                    {{ comment.dislikes }}
                </button>

                <!-- REPLY -->
                <button
                    class="text-xs text-white/50 transition hover:text-white"
                    @click="openReply"
                >
                    Répondre
                </button>
            </div>
        </div>

        <!-- REPLY FORM -->
        <div
            v-if="isReplying"
            class="ml-4 mt-2 space-y-2 border-l-2 border-white/15 pl-4"
        >
            <textarea
                v-model="replyText"
                class="w-full resize-none rounded-lg border border-white/10 bg-neutral-900/60 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/30"
                placeholder="Écrire une réponse…"
                rows="2"
                @keydown.meta.enter="submitReply"
            />

            <div class="flex gap-2">
                <button
                    :disabled="!replyText.trim()"
                    class="rounded-lg bg-white/10 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
                    @click="submitReply"
                >
                    Répondre
                </button>

                <button
                    class="rounded-lg px-4 py-1.5 text-xs text-white/50 transition hover:text-white"
                    @click="cancelReply"
                >
                    Annuler
                </button>
            </div>
        </div>

        <!-- CHILDREN (recursive) -->
        <ul
            v-if="comment.children.length"
            class="ml-4 mt-2 space-y-2 border-l-2 border-white/15 pl-4"
        >
            <TvCommentItem
                v-for="child in comment.children"
                :key="child.id"
                :comment="child"
                :depth="depth + 1"
            />
        </ul>
    </li>
</template>
