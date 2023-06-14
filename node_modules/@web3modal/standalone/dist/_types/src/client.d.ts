import type { ConfigCtrlState } from '@web3modal/core';
/**
 * Types
 */
type Web3ModalConfig = Omit<ConfigCtrlState, 'enableStandaloneMode'> & {
    walletConnectVersion: 1 | 2;
};
/**
 * Client
 */
export declare class Web3Modal {
    constructor(config: Web3ModalConfig);
    private initUi;
    openModal: (options?: import("@web3modal/core/dist/_types/src/controllers/ModalCtrl").OpenOptions | undefined) => Promise<void>;
    closeModal: () => void;
    subscribeModal: (callback: (newState: import("@web3modal/core/dist/_types/src/types/controllerTypes").ModalCtrlState) => void) => () => void;
    setTheme: (theme: Pick<ConfigCtrlState, "themeMode" | "themeColor" | "themeBackground">) => void;
}
export {};
