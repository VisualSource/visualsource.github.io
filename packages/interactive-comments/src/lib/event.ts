import type { CommentCreatePayload, CommentDeletePayload, CommentPatchPayload, PostVote } from "./types";

export const EVENT_DIALOG_CLOSE = "dialog::close";
export const EVENT_DIALOG_OPEN = "dialog::open";
export const EVENT_REPLY_DONE = "reply::done";
export const COMMENT_CREATE = "comment::create";
export const COMMENT_DELETE = "comment::delete";
export const COMMENT_PATCH = "comment::patch";
export const LIKE_POST = "like::inc";
export const DISLIKE_POST = "like::dec";

type EventMap = {
    [COMMENT_CREATE]: CommentCreatePayload,
    [COMMENT_DELETE]: CommentDeletePayload,
    [COMMENT_PATCH]: CommentPatchPayload,
    [DISLIKE_POST]: PostVote
    [LIKE_POST]: PostVote
}

export function canDelete() {
    return new Promise<string>((ok) => {
        window.addEventListener(EVENT_DIALOG_CLOSE, (ev) => {
            const { detail } = (ev as CustomEvent<string>);
            ok(detail);
        }, { once: true });

        window.dispatchEvent(new CustomEvent(EVENT_DIALOG_OPEN));
    });
}

export function emitEvent<E extends keyof EventMap, D extends EventTarget>(key: E, payload: EventMap[E], dispatch: D): void {
    const event = new CustomEvent(key, { detail: payload, bubbles: true, composed: true });
    dispatch.dispatchEvent(event);
}