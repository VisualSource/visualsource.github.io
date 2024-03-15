import { customElement, property, state } from 'lit/decorators.js';
import { LitElement, type TemplateResult, html } from 'lit';
import { formatRelative } from "date-fns/formatRelative";
import { when } from 'lit/directives/when.js';
import { consume } from "@lit/context";

import { EVENT_REPLY_DONE, canDelete, emitEvent } from '../lib/event';
import { type State, context } from '../lib/state';
import type { Comment } from '../lib/types';

@customElement("comment-element")
export class CommentElement extends LitElement {

    @consume({ context, subscribe: true })
    @property({ attribute: false })
    public state?: State;

    @property({ type: Number })
    public commentId?: number;

    @property({ type: Number })
    public parentId?: number = undefined;

    @property({ type: String })
    public replyingTo?: string;

    @property({ type: Number })
    public count: number = 0;

    @property({ type: String })
    public content: string = "";

    @property({ type: String })
    public createdAt: string = "";

    @property({ type: String })
    public username: string = "";

    @property({ type: String })
    public avatar: string = "";

    @property({ type: Array })
    public replies: Comment[] = [];

    @state()
    protected edit: boolean = false;

    @state()
    protected reply: boolean = false;

    @state()
    private editContent: string = "";

    private voteUp(): void {
        if (!this.state || !this.commentId) return;

        emitEvent("like::inc", { id: this.commentId, parent: this.parentId }, this);
    }

    private voteDown(): void {
        if (!this.state || !this.commentId) return;

        emitEvent("like::dec", { id: this.commentId, parent: this.parentId }, this);
    }

    private toggleEdit(): void {
        this.edit = !this.edit;
    }

    private toggleReply(): void {
        this.reply = !this.reply;
    }

    private commentActions(): TemplateResult<1> {
        return when(this.state?.user.username === this.username,
            () => html`
                <div class="flex justify-end grid-layout-action">
                    <button aria-label="Delete Post" @click=${this.deleteSelf} class="inline-flex gap-2 items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 rounded-md px-2 hover:opacity-60">
                        <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
                        <span class="text-soft-red font-bold">Delete</span>
                    </button>
                    <button aria-label="Edit Post" @click=${this.toggleEdit} class="inline-flex gap-2 items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 rounded-md px-2 hover:opacity-60">
                        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
                        <span class="text-moderate-blue font-bold">Edit</span>
                    </button>
                </div>
            `,
            () => html`
                <div class="grid-layout-action flex justify-end">
                    <button aria-label="Reply to Post" @click=${this.toggleReply} class="inline-flex gap-2 items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 rounded-md px-2 hover:opacity-60">
                        <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                        <span class="text-moderate-blue font-bold">Reply</span>
                    </button>
                </div>
            `
        );
    }

    private deleteSelf(): void {
        canDelete().then((event) => {
            if (event === "cancel") return;
            if (!this.commentId) throw new Error("Comment has no id");
            emitEvent("comment::delete", { id: this.commentId, parent: this.parentId }, this);
        });
    }

    private onInput(ev: InputEvent): void {
        this.editContent = (ev.target as HTMLTextAreaElement).value;
    }

    private getId(): number {
        if (this.parentId === undefined || this.parentId === 0) {
            if (this.commentId === undefined) throw new Error("Missing comment id");
            return this.commentId;
        }
        return this.parentId;
    }

    private submit(ev: SubmitEvent): void {
        ev.preventDefault();

        if (!this.commentId) throw new Error("No Comment id");

        const replyto = this.editContent.match(/^@(\w|\S|\d|_)+/);

        if (replyto !== null) {
            this.replyingTo = replyto[0].replace("@", "");
            this.editContent = this.editContent.replace(replyto[0], "");
        }

        emitEvent("comment::patch", {
            id: this.commentId,
            parent: this.parentId,
            content: this.editContent,
            replyingTo: this.replyingTo
        }, this);

        (ev.target as HTMLFormElement).reset();
        this.editContent = "";
        this.toggleEdit();
    }

    private message(): TemplateResult<1> {
        return when(this.edit, () => html`
                <form @submit=${this.submit} class="flex flex-col space-y-4 w-full animate-in fade-in-15 duration-200 motion-safe:fade-in-0">
                    <textarea name="editcontent" @input=${this.onInput} rows="4" class="flex w-full px-3 py-2 border border-light-gray font-medium text-grayish-blue rounded-md placeholder:font-bold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-grayish-blue focus-visible:ring-offset-0 resize-none">${this.replyingTo ? `@${this.replyingTo}` : ""} ${this.content}
                    </textarea>
                
                    <div class="flex justify-stretch md:justify-end">
                        <button aria-label="Update post" type="submit" class="inline-flex items-center justify-center whitespace-nowrap font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-moderate-blue text-white hover:bg-moderate-blue/70 h-11 rounded-lg px-8 uppercase">Update</button>
                    </div>
                </form>
            `, () => html` 
                <article class="text-grayish-blue text-md">
                    ${when(this.replyingTo?.length, () => html`
                        <span class="text-moderate-blue font-bold">@${this.replyingTo}</span>
                    `)}
                    ${this.content}
                </article>`
        )
    }

    private formatCreated(): string {
        const created = Date.parse(this.createdAt);
        if (Number.isNaN(created)) {
            return this.createdAt;
        }
        return formatRelative(created, new Date());
    }

    public connectedCallback(): void {
        super.connectedCallback();

        this.addEventListener(EVENT_REPLY_DONE, (ev) => {
            ev.stopPropagation();
            this.reply = false;
        });
    }

    protected render(): TemplateResult<1> {
        return html`
                <div class="bg-white p-4 rounded-md shadow-sm grid grid-layout-sm space-y-2 md:grid-layout-large md:space-y-0 md:p-6">
                    <div class="flex items-center gap-3 grid-layout-header md:mb-4">
                        <user-avatar size="h-8 w-8" src=${this.avatar}></user-avatar>
                        <h4 class="text-dark-blue font-bold inline-flex items-center">
                            ${this.username}
                            ${when(this.state?.user.username === this.username, () => html`<span class="ml-1 inline-flex items-center rounded-sm border px-1.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-moderate-blue text-white hover:bg-moderate-blue/80">you</span>`)}
                        </h4>
                        <span class="text-grayish-blue text-opacity-75 text-base">${this.formatCreated()}</span>
                    </div>

                    <div class="grid-layout-body flex">
                        ${this.message()}
                    </div>

                    <div class="grid-layout-count md:mr-6">
                        <div class="bg-light-gray flex items-center gap-2 rounded-xl py-0.5 w-fit md:flex-col md:justify-start md:h-24 md:w-10 md:py-2">
                            <button aria-label="Like Post" @click=${this.voteUp} class="inline-flex items-center justify-center h-10 w-9 group">
                                <svg class="${this.state?.liked.has(this.commentId ?? -1) ? "fill-moderate-blue group-hover:fill-moderate-blue/70" : "fill-light-grayish-blue group-hover:fill-moderate-blue"} transition-colors" width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"/></svg>
                            </button>
                            <span class="text-moderate-blue font-bold text-lg px-0.5">${this.count}</span>
                            <button aria-label="Dislike Post" @click=${this.voteDown} class="h-10 w-9 inline-flex items-center justify-center group">
                                <svg class="${this.state?.disliked.has(this.commentId ?? -1) ? "fill-moderate-blue group-hover:fill-moderate-blue/70" : "fill-light-grayish-blue group-hover:fill-moderate-blue"} transition-colors" width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"/></svg>
                            </button>
                        </div>
                    </div>
                  
                    ${this.commentActions()}
                </div>

                ${when(this.reply, () => html`
                    <reply-element 
                        parent=${this.getId()} 
                        replyingTo=${this.username} 
                        animateIn 
                        label="Reply" class="mt-4"></reply-element>
                `)}

                ${when(!!this.replies?.length, () => html`
                    <comment-group class="pt-4"
                        .parentId=${this.commentId} 
                        indent
                        .comments=${this.replies}>
                    </comment-group>
                `)}
        `;
    }

    protected createRenderRoot(): this {
        return this;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'comment-element': CommentElement
    }
}
