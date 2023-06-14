import { LitElement } from 'lit';
export declare class W3mWalletConnectQr extends LitElement {
    static styles: any[];
    private uri;
    constructor();
    private get overlayEl();
    private createConnectionAndWait;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-walletconnect-qr': W3mWalletConnectQr;
    }
}
