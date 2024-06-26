import { LitElement, type TemplateResult, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { normalize } from '../lib/utils';

@customElement("user-avatar")
export class UserAvatar extends LitElement {

    @property({ type: String })
    public size: string = "h-10 w-10";

    @property({ type: String })
    public src: string | undefined;

    protected render(): TemplateResult<1> {
        return html`
            <div class="relative flex ${this.size} shrink-0 overflow-hidden rounded-full">
                <img class="aspect-square h-full w-full" src="${normalize(`${import.meta.env.BASE_URL}${this.src}`)}" alt="user avatar"/>
            </div>
        `;
    }

    protected createRenderRoot(): this {
        return this;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'user-avatar': UserAvatar
    }
}