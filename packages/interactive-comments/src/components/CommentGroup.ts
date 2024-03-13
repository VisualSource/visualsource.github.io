import { LitElement, type TemplateResult, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { type Comment } from '../lib/types';

@customElement("comment-group")
export class CommentGroup extends LitElement {

    @property({ type: Boolean })
    public indent: boolean = false;

    @property({ type: Number })
    public parentId?: number = undefined;

    @property({ type: Array })
    public comments: Comment[] = [];

    protected render(): TemplateResult<1> {
        return html`
           <div class="space-y-4 ${this.indent ? "border-l-2 border-grayish-blue border-opacity-15 pl-4 md:pl-10 md:ml-10" : "px-4"}">
                ${this.comments.map((comment) => {
            return html`
                <comment-element 
                    parentId=${this.parentId} 
                    commentId=${comment.id} 
                    createdAt=${comment.createdAt}
                    replyingTo=${comment.replyingTo} 
                    .replies=${comment.replies} 
                    avatar=${comment.user.image.webp} 
                    count=${comment.score} 
                    content=${comment.content} 
                    username=${comment.user.username}>
                </comment-element>`;
        })}
           </div>
        `;
    }

    protected createRenderRoot() {
        return this;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'comment-group': CommentGroup
    }
}