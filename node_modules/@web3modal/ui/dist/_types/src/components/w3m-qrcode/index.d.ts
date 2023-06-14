import { LitElement } from 'lit';
export default class W3mQrCode extends LitElement {
    static styles: any[];
    uri: string;
    size: number;
    logoSrc?: string | undefined;
    walletId?: string | undefined;
    private svgTemplate;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-qrcode': W3mQrCode;
    }
}
