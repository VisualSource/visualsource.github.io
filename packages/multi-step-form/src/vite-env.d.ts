/// <reference types="vite/client" />


declare module '@caneara/iodine' {
    export default class Iodine {
        rule(key: string, callback: (value: string) => boolean): void;
        setErrorMessage(key: string, error: string): void;
        assert(value: string, rules: string[]): { valid: boolean; error: string; rule: string; }
    }
}