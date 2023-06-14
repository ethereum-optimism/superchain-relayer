import { LitElement } from 'lit';
export declare class W3mModalBackcard extends LitElement {
    static styles: any[];
    private open;
    private isHelp;
    firstUpdated(): void;
    constructor();
    disconnectedCallback(): void;
    private readonly unsubscribeRouter?;
    private playTimeout?;
    private get canvasEl();
    private onHelp;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-modal-backcard': W3mModalBackcard;
    }
}
