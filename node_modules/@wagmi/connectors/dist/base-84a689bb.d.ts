import { Address } from '@wagmi/core';
import { Chain } from '@wagmi/core/chains';
import EventEmitter from 'eventemitter3';

type ConnectorData<Provider = any> = {
    account?: Address;
    chain?: {
        id: number;
        unsupported: boolean;
    };
    provider?: Provider;
};
interface ConnectorEvents<Provider = any> {
    change(data: ConnectorData<Provider>): void;
    connect(data: ConnectorData<Provider>): void;
    message({ type, data }: {
        type: string;
        data?: unknown;
    }): void;
    disconnect(): void;
    error(error: Error): void;
}
declare abstract class Connector<Provider = any, Options = any, Signer = any> extends EventEmitter<ConnectorEvents<Provider>> {
    /** Unique connector id */
    abstract readonly id: string;
    /** Connector name */
    abstract readonly name: string;
    /** Chains connector supports */
    readonly chains: Chain[];
    /** Options to use with connector */
    readonly options: Options;
    /** Whether connector is usable */
    abstract readonly ready: boolean;
    constructor({ chains, options, }: {
        chains?: Chain[];
        options: Options;
    });
    abstract connect(config?: {
        chainId?: number;
    }): Promise<Required<ConnectorData>>;
    abstract disconnect(): Promise<void>;
    abstract getAccount(): Promise<Address>;
    abstract getChainId(): Promise<number>;
    abstract getProvider(config?: {
        chainId?: number;
    }): Promise<Provider>;
    abstract getSigner(config?: {
        chainId?: number;
    }): Promise<Signer>;
    abstract isAuthorized(): Promise<boolean>;
    switchChain?(chainId: number): Promise<Chain>;
    watchAsset?(asset: {
        address: string;
        decimals?: number;
        image?: string;
        symbol: string;
    }): Promise<boolean>;
    protected abstract onAccountsChanged(accounts: Address[]): void;
    protected abstract onChainChanged(chain: number | string): void;
    protected abstract onDisconnect(error: Error): void;
    protected getBlockExplorerUrls(chain: Chain): string[] | undefined;
    protected isChainUnsupported(chainId: number): boolean;
}

export { Connector as C, ConnectorData as a, ConnectorEvents as b };
