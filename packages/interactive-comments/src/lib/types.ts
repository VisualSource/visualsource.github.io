// Type for making other type objects better to ready
// @see https://timdeschryver.dev/bits/pretty-typescript-types
type Prettify<T> = {
    [K in keyof T]: Prettify<T[K]>;
} & {};

export type User = {
    image: {
        png: string;
        webp: string;
    }
    username: string;
}

export type Comment = {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    replyingTo?: string;
    user: User
    replies: Prettify<Omit<Comment, "replies">>[]
}

export type PostVote = {
    id: number;
    parent?: number
};

export type PatchPayloadOption = keyof Omit<CommentPatchPayload, "parent" | "id">;

export type CommentCreatePayload = {
    content: string;
    parent?: number;
    replying?: string;
}

export type CommentPatchPayload = Prettify<Partial<Omit<Comment, "replies" | "user" | "id">> & {
    id: number,
    parent?: number
}>;

export type CommentDeletePayload = {
    id: number;
    parent?: number;
};
