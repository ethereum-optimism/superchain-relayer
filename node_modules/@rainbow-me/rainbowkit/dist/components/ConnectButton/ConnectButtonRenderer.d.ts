import { ReactNode } from 'react';
import { AuthenticationStatus } from '../RainbowKitProvider/AuthenticationContext';
export interface ConnectButtonRendererProps {
    children: (renderProps: {
        account?: {
            address: string;
            balanceDecimals?: number;
            balanceFormatted?: string;
            balanceSymbol?: string;
            displayBalance?: string;
            displayName: string;
            ensAvatar?: string;
            ensName?: string;
            hasPendingTransactions: boolean;
        };
        chain?: {
            hasIcon: boolean;
            iconUrl?: string;
            iconBackground?: string;
            id: number;
            name?: string;
            unsupported?: boolean;
        };
        mounted: boolean;
        authenticationStatus?: AuthenticationStatus;
        openAccountModal: () => void;
        openChainModal: () => void;
        openConnectModal: () => void;
        accountModalOpen: boolean;
        chainModalOpen: boolean;
        connectModalOpen: boolean;
    }) => ReactNode;
}
export declare function ConnectButtonRenderer({ children, }: ConnectButtonRendererProps): JSX.Element;
export declare namespace ConnectButtonRenderer {
    var displayName: string;
}
