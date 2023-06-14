import { LitElement } from 'lit';
export declare class W3mMobileWalletSelection extends LitElement {
    static styles: any[];
    private onGoToQrcode;
    private onConnectorWallet;
    private mobileWalletsTemplate;
    private previewWalletsTemplate;
    private connectorWalletsTemplate;
    private recentWalletTemplate;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-mobile-wallet-selection': W3mMobileWalletSelection;
    }
}
