export interface CommentNode {
    id: number;
    text: string;
    date: string;
    likes: number;
    dislikes: number;
    liked: boolean;
    disliked: boolean;
    children: CommentNode[];
}

export interface CommentActions {
    addReply: (parentId: number, text: string) => void;
    toggleLike: (id: number) => void;
    toggleDislike: (id: number) => void;
}
