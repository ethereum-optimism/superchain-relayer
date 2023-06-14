import { LitElement } from 'lit';
export declare class W3mModal extends LitElement {
    static styles: any[];
    private open;
    private preload;
    private activeChainId?;
    constructor();
    disconnectedCallback(): void;
    private readonly unsubscribeModal?;
    private readonly unsubscribeConfig?;
    private readonly unwatchAccount?;
    private readonly unwatchNetwork?;
    private abortController?;
    private get overlayEl();
    private get containerEl();
    private fetchEnsProfile;
    private fetchBalance;
    private toggleBodyScroll;
    private preloadExplorerData;
    private preloadExplorerImages;
    private preloadCustomImages;
    private preloadConnectorImages;
    private preloadModalData;
    private onCloseModal;
    private onOpenModalEvent;
    private onCloseModalEvent;
    private addKeyboardEvents;
    private removeKeyboardEvents;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-modal': W3mModal;
    }
}
