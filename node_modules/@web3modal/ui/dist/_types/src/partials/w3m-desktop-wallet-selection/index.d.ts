import { LitElement } from 'lit';
export declare class W3mDesktopWalletSelection extends LitElement {
    static styles: any[];
    private onDesktopWallet;
    private onInjectedWallet;
    private onInstallConnector;
    private onConnectorWallet;
    private desktopWalletsTemplate;
    private previewWalletsTemplate;
    private connectorWalletsTemplate;
    private recentWalletTemplate;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-desktop-wallet-selection': W3mDesktopWalletSelection;
    }
}
