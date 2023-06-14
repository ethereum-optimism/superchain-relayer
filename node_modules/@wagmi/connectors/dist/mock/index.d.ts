import * as ethers from 'ethers';
import { providers } from 'ethers';
import { Chain } from '@wagmi/core/chains';
import { C as Connector, a as ConnectorData } from '../base-84a689bb.js';
import { Signer } from '@wagmi/core';
import EventEmitter from 'eventemitter3';

type MockProviderOptions = {
    chainId: number;
    flags?: {
        isAuthorized?: boolean;
        failConnect?: boolean;
        failSwitchChain?: boolean;
        noSwitchChain?: boolean;
    };
    signer: Signer;
};
type Events = {
    accountsChanged(accounts: string[]): void;
    chainChanged(chainId: number | string): void;
    disconnect(): void;
};
type Event = keyof Events;
declare class MockProvider extends providers.BaseProvider {
    #private;
    events: EventEmitter<Events, any>;
    constructor(options: MockProviderOptions);
    enable(): Promise<string[]>;
    disconnect(): Promise<void>;
    getAccounts(): Promise<`0x${string}`[]>;
    getSigner(): ethers.Signer;
    switchChain(chainId: number): Promise<void>;
    switchSigner(signer: Signer): Promise<void>;
    watchAsset(_asset: {
        address: string;
        decimals?: number;
        image?: string;
        symbol: string;
    }): Promise<boolean>;
    on(event: Event, listener: providers.Listener): this;
    once(event: Event, listener: providers.Listener): this;
    removeListener(event: Event, listener: providers.Listener): this;
    off(event: Event, listener: providers.Listener): this;
    toJSON(): string;
}

type MockConnectorOptions = Omit<MockProviderOptions, 'chainId'> & {
    chainId?: number;
};
declare class MockConnector extends Connector<MockProvider, MockConnectorOptions> {
    #private;
    readonly id = "mock";
    readonly name = "Mock";
    readonly ready = true;
    constructor({ chains, options, }: {
        chains?: Chain[];
        options: MockConnectorOptions;
    });
    connect({ chainId }?: {
        chainId?: number;
    }): Promise<Required<ConnectorData<any>>>;
    disconnect(): Promise<void>;
    getAccount(): Promise<`0x${string}`>;
    getChainId(): Promise<number>;
    getProvider({ chainId }?: {
        chainId?: number;
    }): Promise<MockProvider>;
    getSigner(): Promise<ethers.Signer>;
    isAuthorized(): Promise<boolean>;
    watchAsset(asset: {
        address: string;
        decimals?: number;
        image?: string;
        symbol: string;
    }): Promise<boolean>;
    protected onAccountsChanged: (accounts: string[]) => void;
    protected onChainChanged: (chainId: number | string) => void;
    protected onDisconnect: () => void;
    toJSON(): string;
}

export { MockConnector, MockProvider, MockProviderOptions };
