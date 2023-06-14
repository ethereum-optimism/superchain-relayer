import { LitElement } from 'lit';
export declare class W3mDesktopConnectorView extends LitElement {
    static styles: any[];
    private uri;
    constructor();
    private getRouterData;
    private onFormatAndRedirect;
    private createConnectionAndWait;
    private onConnectWithMobile;
    private onGoToWallet;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-desktop-connector-view': W3mDesktopConnectorView;
    }
}
