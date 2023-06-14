/// <reference types="react" />
export interface ChainModalProps {
    open: boolean;
    onClose: () => void;
}
export declare function ChainModal({ onClose, open }: ChainModalProps): JSX.Element | null;
