import type { ClientCtrlState } from '../types/controllerTypes';
export declare const ClientCtrl: {
    setEthereumClient(ethereumClient: ClientCtrlState['ethereumClient']): void;
    client(): import("@web3modal/ethereum").EthereumClient;
};
