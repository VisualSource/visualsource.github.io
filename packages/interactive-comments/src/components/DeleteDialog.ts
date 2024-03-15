import { LitElement, type TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { EVENT_DIALOG_CLOSE, EVENT_DIALOG_OPEN } from '../lib/event';

@customElement("delete-dialog")
export class DeleteDialog extends LitElement {

    protected firstUpdated(): void {
        const dialog = document.getElementById("delete-dialog") as HTMLDialogElement | null;
        if (!dialog) return;

        dialog.addEventListener("click", (ev) => {
            if (!(ev.target as HTMLElement).isSameNode(dialog)) return;
            dialog.close("cancel");
        });

        window.addEventListener(EVENT_DIALOG_OPEN, () => dialog.showModal());
        dialog.addEventListener("close", () => window.dispatchEvent(new CustomEvent(EVENT_DIALOG_CLOSE, {
            detail: dialog.returnValue
        })));
    }

    protected render(): TemplateResult<1> {
        return html`
           <dialog id="delete-dialog" class="backdrop:bg-grayish-blue backdrop:opacity-70 animate-in zoom-in-75 rounded-lg h-60 w-full md:w-96 overflow-hidden">
            <form method="dialog" class="flex flex-col justify-between h-full p-8">
                <h1 class="text-lg text-dark-blue font-bold">Delete Comment</h1>
                <p class="text-grayish-blue">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</P>

                <div class="flex gap-3">
                    <button aira-label="Cancel Delete" value="cancel" formmethod="dialog" class="inline-flex w-full items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grayish-blue focus-visible:ring-offset-2 disabled:pointer-events-none uppercase disabled:opacity-50 bg-grayish-blue text-white hover:bg-grayish-blue/90 rounded-md h-10 md:h-11 px-4 md:px-8 py-2 md:py-0">No, Cancel</button>
                    <button aria-label="Accept Delete" value="ok" class="inline-flex w-full items-center uppercase justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grayish-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8 bg-soft-red text-white hover:bg-soft-red/90">Yes, Delete</button>
                </div>
            </form>
           </dialog>
        `;
    }

    protected createRenderRoot(): this {
        return this;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'delete-dialog': DeleteDialog
    }
}