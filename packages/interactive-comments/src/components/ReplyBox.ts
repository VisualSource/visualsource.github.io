import { LitElement, type TemplateResult, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { consume } from "@lit/context";

import { EVENT_REPLY_DONE, emitEvent } from '../lib/event';
import { type State, context } from '../lib/state';


@customElement("reply-element")
export class ReplyElement extends LitElement {

    @consume({ context })
    @property({ attribute: false })
    public state?: State;

    @property({ type: String })
    public label: string = "Send";

    @property({ type: Boolean })
    public animateIn: boolean = false;

    @property({ type: Number })
    public parent?: number;

    @property({ type: String })
    public replyingTo?: string;

    @state()
    private content: string = "";

    private onInput(ev: InputEvent): void {
        this.content = (ev.target as HTMLTextAreaElement).value;
    }

    private onSubmit(ev: SubmitEvent): void {
        ev.preventDefault();

        emitEvent("comment::create", {
            content: this.content,
            parent: this.parent,
            replying: this.replyingTo
        }, this);

        this.dispatchEvent(new Event(EVENT_REPLY_DONE, { bubbles: true }));
        this.content = "";
        (ev.target as HTMLFormElement).reset();
    }

    protected render(): TemplateResult<1> {
        return html`
            <form @submit=${this.onSubmit} class="bg-white shadow-sm p-4 rounded grid grid-layout-reply-sm md:grid-layout-reply-lg space-y-4 md:space-y-0 ${this.animateIn ? "animate-in slide-in-from-top-7 duration-200" : ""}">
                <div class="grid-layout-body w-full">
                    <textarea name="comment" @input=${this.onInput} rows="3" class="w-full px-4 py-2 border border-light-gray rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-grayish-blue focus-visible:ring-offset-0 resize-none" placeholder="Add a comment..."></textarea>
                </div>

                <user-avatar class="grid-layout-count" size="h-8 w-8 md:h-10 md:w-10" src=${this.state?.user.image.webp ?? ""}></user-avatar>
                <div class="grid-layout-action flex justify-end">
                    <button aria-label="Post comment" type="submit" class="inline-flex items-center justify-center whitespace-nowrap font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-moderate-blue text-white hover:bg-moderate-blue/70 h-11 rounded-lg px-8 uppercase">${this.label}</button>
                </div>
            </form>
        `;
    }

    protected createRenderRoot(): this {
        return this;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'reply-element': ReplyElement
    }
}