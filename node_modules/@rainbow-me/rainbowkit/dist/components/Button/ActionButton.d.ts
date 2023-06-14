/// <reference types="react" />
type Size = 'small' | 'medium' | 'large';
export declare function ActionButton({ disabled, href, label, onClick, rel, size, target, testId, type, }: {
    href?: string;
    label: string;
    onClick?: () => void;
    rel?: string;
    size?: Size;
    target?: string;
    type?: 'primary' | 'secondary';
    disabled?: boolean;
    testId?: string;
}): JSX.Element;
export {};
