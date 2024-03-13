import { createContext } from '@lit/context';
import superjson from 'superjson';
import type { User, Comment } from './types';

export interface State {
    user: User;
    liked: Set<number>;
    disliked: Set<number>;
    comments: Comment[];
    global_id: number;
}

export const STORAGE_KEY = "comment-session-state";
export const context = createContext<State>(Symbol('state'));

export function saveState(state: State): void {
    const local = superjson.stringify(state);

    localStorage.setItem(STORAGE_KEY, local);
}

export function loadState(): State | null {
    try {
        const local = localStorage.getItem(STORAGE_KEY);

        if (local === null) return null;

        return superjson.parse<State>(local);
    } catch (error) {
        console.error(error);
        return null;
    }
}