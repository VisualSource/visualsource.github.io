/// <reference types="vite/client" />

declare module 'lit-element-state' {
    export class LitState { }
    type Constructor = new (...args: any[]) => {};
    export function observeState<T extends Constructor, S>(el: T): {
        new(...args: any[]): S
        prototype: S
    } & T;
    export function stateVar(): PropertyDecorator;

}