/// <reference types="react" />
export interface AccountModalProps {
    open: boolean;
    onClose: () => void;
}
export declare function AccountModal({ onClose, open }: AccountModalProps): JSX.Element | null;
