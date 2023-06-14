import { ReactNode } from 'react';
interface ModalProviderProps {
    children: ReactNode;
}
export declare function ModalProvider({ children }: ModalProviderProps): JSX.Element;
export declare function useModalState(): {
    accountModalOpen: boolean;
    chainModalOpen: boolean;
    connectModalOpen: boolean;
};
export declare function useAccountModal(): {
    openAccountModal: (() => void) | undefined;
};
export declare function useChainModal(): {
    openChainModal: (() => void) | undefined;
};
export declare function useConnectModal(): {
    openConnectModal: (() => void) | undefined;
};
export {};
