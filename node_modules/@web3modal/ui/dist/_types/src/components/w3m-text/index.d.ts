import { LitElement } from 'lit';
type Variant = 'large-bold' | 'medium-bold' | 'medium-normal' | 'medium-thin' | 'small-normal' | 'small-thin' | 'xsmall-normal' | 'xxsmall-bold';
type Color = 'accent' | 'error' | 'inverse' | 'primary' | 'secondary' | 'tertiary';
export declare class W3mText extends LitElement {
    static styles: any[];
    variant?: Variant;
    color?: Color;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-text': W3mText;
    }
}
export {};
