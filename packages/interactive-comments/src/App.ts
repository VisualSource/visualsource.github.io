import { LitElement, type TemplateResult, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { provide } from "@lit/context";
import { produce, enableMapSet } from 'immer';
import { type State, context, loadState, saveState } from './lib/state';
import og_state from './assets/data.json';
import { COMMENT_CREATE, COMMENT_DELETE, COMMENT_PATCH, DISLIKE_POST, LIKE_POST } from './lib/event';
import type { CommentCreatePayload, CommentDeletePayload, CommentPatchPayload, PatchPayloadOption, PostVote } from './lib/types';

enableMapSet();


@customElement("message-app")
export class App extends LitElement {

    @provide({ context })
    @state()
    private state: State = {
        user: og_state.currentUser,
        liked: new Set(),
        disliked: new Set(),
        comments: og_state.comments,
        global_id: 4
    };

    private vote({ detail }: CustomEvent<PostVote>, action: "liked" | "disliked"): void {
        this.state = produce(this.state, draft => {

            let amount = action === "liked" ? 1 : -1;

            let root;
            if (!detail.parent) {
                const idx = draft.comments.findIndex(e => e.id === detail.id);
                if (idx === -1) throw new Error("Failed to find comment!");

                root = draft.comments[idx];
            } else {
                const parent = draft.comments.findIndex(e => e.id === detail.parent);
                if (parent === -1) throw new Error("Failed to find comment!");
                const idx = draft.comments[parent].replies.findIndex(e => e.id === detail.id);
                if (idx === -1) throw new Error("Failed to find comment!");

                root = draft.comments[parent].replies[idx];
            }

            if (draft[action].has(detail.id)) {
                root.score -= amount;
                draft[action].delete(detail.id);
            } else {
                root.score += amount;
                draft[action].add(detail.id);
            }

            const opts = action === "liked" ? "disliked" : "liked";
            if (draft[opts].has(detail.id)) {
                draft[opts].delete(detail.id);
                root.score += action === "liked" ? 1 : -1;
            }

        });

        saveState(this.state);
    }

    public connectedCallback(): void {
        super.connectedCallback();

        const state = loadState();
        if (state) {
            this.state = state;
        }

        this.addEventListener(COMMENT_CREATE, (ev) => {
            const { detail } = (ev as CustomEvent<CommentCreatePayload>);

            this.state = produce(this.state, draft => {
                if (detail.parent !== undefined) {
                    const root = draft.comments.findIndex(e => e.id === detail.parent);
                    if (root === -1) throw new Error("Failed to find parent!");
                    draft.comments[root].replies.push({
                        content: detail.content,
                        id: ++draft.global_id,
                        createdAt: new Date().toISOString(),
                        score: 0,
                        user: this.state.user,
                        replyingTo: detail.replying
                    });
                    return;
                }

                draft.comments.push({
                    content: detail.content,
                    replies: [],
                    id: ++draft.global_id,
                    createdAt: new Date().toISOString(),
                    score: 0,
                    user: this.state.user
                });
            });

            saveState(this.state);
        });

        this.addEventListener(COMMENT_PATCH, (ev) => {
            const { detail } = (ev as CustomEvent<CommentPatchPayload>);

            this.state = produce(this.state, draft => {

                let root;
                if (!detail.parent) {
                    const idx = draft.comments.findIndex(e => e.id === detail.id);
                    if (idx === -1) throw new Error("Failed to find comment!");

                    root = draft.comments[idx];
                } else {
                    const parent = draft.comments.findIndex(e => e.id === detail.parent);
                    if (parent === -1) throw new Error("Failed to find comment!");
                    const idx = draft.comments[parent].replies.findIndex(e => e.id === detail.id);
                    if (idx === -1) throw new Error("Failed to find comment!");

                    root = draft.comments[parent].replies[idx];
                }

                for (const key of Object.keys(detail) as PatchPayloadOption[]) {
                    if (["id", "parent"].includes(key)) continue;
                    (root[key] as CommentPatchPayload[typeof key]) = detail[key];
                }
            });

            saveState(this.state);
        });

        this.addEventListener(COMMENT_DELETE, (ev) => {
            const { detail } = (ev as CustomEvent<CommentDeletePayload>);

            this.state = produce(this.state, draft => {
                if (!detail.parent && detail.parent !== 0) {
                    const parent = draft.comments.findIndex(e => e.id === detail.parent);
                    if (parent === -1) throw new Error("Failed to find parent!");

                    const reply = draft.comments[parent].replies.findIndex(e => e.id === detail.id);
                    if (reply === -1) throw new Error("Failed to find reply!");

                    draft.comments[parent].replies.splice(reply, 1);
                    return;
                }

                const reply = draft.comments.findIndex(e => e.id === detail.id);
                if (reply === -1) throw new Error("Failed to find reply!");

                draft.comments.splice(reply, 1);
            });

            saveState(this.state);
        });

        this.addEventListener(LIKE_POST, (ev) => this.vote(ev as CustomEvent<PostVote>, "liked"));
        this.addEventListener(DISLIKE_POST, (ev) => this.vote(ev as CustomEvent<PostVote>, "disliked"));
    }

    protected render(): TemplateResult<1> {
        return html`
            <div class="flex flex-col items-center justify-center py-8">
                <div class="space-y-4 max-w-3xl">
                    <comment-group .comments=${this.state.comments}></comment-group>
                    <reply-element class="px-4"></reply-element>
                </div>
            </div>
            <delete-dialog></delete-dialog>
        `;
    }

    protected createRenderRoot() {
        return this;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'message-app': App
    }
}