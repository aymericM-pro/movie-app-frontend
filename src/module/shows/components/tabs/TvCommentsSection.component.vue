<script lang="ts" setup>
import { reactive, ref, provide } from 'vue';
import type {
    CommentNode,
    CommentActions,
} from '@/module/shows/components/tabs/comments.model';
import TvCommentItem from '@/module/shows/components/tabs/TvCommentItem.component.vue';

const comments = reactive<CommentNode[]>([]);
const newComment = ref('');
let nextId = 0;

function createNode(text: string): CommentNode {
    return {
        id: nextId++,
        text,
        date: new Date().toLocaleString(),
        likes: 0,
        dislikes: 0,
        liked: false,
        disliked: false,
        children: [],
    };
}

function findNode(nodes: CommentNode[], id: number): CommentNode | null {
    for (const node of nodes) {
        if (node.id === id) return node;
        const found = findNode(node.children, id);
        if (found) return found;
    }
    return null;
}

function addComment() {
    const text = newComment.value.trim();
    if (!text) return;
    comments.unshift(createNode(text));
    newComment.value = '';
}

function addReply(parentId: number, text: string) {
    const parent = findNode(comments, parentId);
    if (!parent) return;
    parent.children.push(createNode(text));
}

function toggleLike(id: number) {
    const node = findNode(comments, id);
    if (!node) return;
    if (node.liked) {
        node.liked = false;
        node.likes--;
    } else {
        node.liked = true;
        node.likes++;
        if (node.disliked) {
            node.disliked = false;
            node.dislikes--;
        }
    }
}

function toggleDislike(id: number) {
    const node = findNode(comments, id);
    if (!node) return;
    if (node.disliked) {
        node.disliked = false;
        node.dislikes--;
    } else {
        node.disliked = true;
        node.dislikes++;
        if (node.liked) {
            node.liked = false;
            node.likes--;
        }
    }
}

provide<CommentActions>('commentActions', {
    addReply,
    toggleLike,
    toggleDislike,
});
</script>

<template>
    <section class="space-y-6 rounded-2xl bg-neutral-900/60 p-6 backdrop-blur">
        <!-- FORM -->
        <div class="space-y-3">
            <h2 class="text-xl font-semibold">Commentaires</h2>

            <textarea
                v-model="newComment"
                class="w-full resize-none rounded-lg border border-white/10 bg-neutral-800/60 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/30"
                placeholder="Ajouter un commentaire…"
                rows="3"
                @keydown.meta.enter="addComment"
            />

            <button
                :disabled="!newComment.trim()"
                class="rounded-lg bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
                @click="addComment"
            >
                Publier
            </button>
        </div>

        <!-- LIST -->
        <div v-if="!comments.length" class="text-white/60">
            Aucun commentaire pour le moment.
        </div>

        <ul v-else class="space-y-4">
            <TvCommentItem
                v-for="comment in comments"
                :key="comment.id"
                :comment="comment"
                :depth="0"
            />
        </ul>
    </section>
</template>
