/// <reference types="react" />
import { WalletConnector } from '../../wallets/useWalletConnectors';
import { WalletStep } from './DesktopOptions';
export declare function GetDetail({ getWalletDownload, }: {
    getWalletDownload: (walletId: string) => void;
}): JSX.Element;
export declare function ConnectDetail({ changeWalletStep, compactModeEnabled, connectionError, qrCodeUri, reconnect, wallet, }: {
    changeWalletStep: (newWalletStep: WalletStep) => void;
    compactModeEnabled: boolean;
    connectionError: boolean;
    qrCodeUri?: string;
    reconnect: (wallet: WalletConnector) => void;
    wallet: WalletConnector;
}): JSX.Element;
export declare function DownloadOptionsDetail({ changeWalletStep, wallet, }: {
    changeWalletStep: (newWalletStep: WalletStep) => void;
    wallet: WalletConnector;
}): JSX.Element;
export declare function DownloadDetail({ changeWalletStep, wallet, }: {
    changeWalletStep: (newWalletStep: WalletStep) => void;
    wallet: WalletConnector;
}): JSX.Element;
export declare function InstructionMobileDetail({ connectWallet, wallet, }: {
    connectWallet: (wallet: WalletConnector) => void;
    wallet: WalletConnector;
}): JSX.Element;
export declare function InstructionExtensionDetail({ wallet, }: {
    wallet: WalletConnector;
}): JSX.Element;
