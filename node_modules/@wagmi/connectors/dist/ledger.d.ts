import { EthereumProvider } from '@ledgerhq/connect-kit-loader';
import { Chain } from '@wagmi/core';
import { providers } from 'ethers';
import { C as Connector, a as ConnectorData } from './base-84a689bb.js';
import '@wagmi/core/chains';
import 'eventemitter3';

type LedgerConnectorOptions = {
    bridge?: string;
    chainId?: number;
    enableDebugLogs?: boolean;
    rpc?: {
        [chainId: number]: string;
    };
};
type LedgerSigner = providers.JsonRpcSigner;
declare class LedgerConnector extends Connector<EthereumProvider, LedgerConnectorOptions, LedgerSigner> {
    #private;
    readonly id = "ledger";
    readonly name = "Ledger";
    readonly ready = true;
    constructor({ chains, options, }?: {
        chains?: Chain[];
        options?: LedgerConnectorOptions;
    });
    connect(): Promise<Required<ConnectorData>>;
    disconnect(): Promise<void>;
    getAccount(): Promise<`0x${string}`>;
    getChainId(): Promise<number>;
    getProvider({ chainId, create }?: {
        chainId?: number;
        create?: boolean;
    }): Promise<EthereumProvider>;
    getSigner({ chainId }?: {
        chainId?: number;
    }): Promise<providers.JsonRpcSigner>;
    isAuthorized(): Promise<boolean>;
    protected onAccountsChanged: (accounts: string[]) => void;
    protected onChainChanged: (chainId: number | string) => void;
    protected onDisconnect: () => void;
}

export { LedgerConnector };
