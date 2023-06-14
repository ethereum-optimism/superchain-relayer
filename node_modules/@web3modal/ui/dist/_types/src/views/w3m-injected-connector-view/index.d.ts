import { LitElement } from 'lit';
export declare class W3mInjectedConnectorView extends LitElement {
    static styles: any[];
    private connecting;
    private error;
    constructor();
    private readonly connector;
    private onConnect;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-injected-connector-view': W3mInjectedConnectorView;
    }
}
