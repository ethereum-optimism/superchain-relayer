import { SafeAppProvider } from '@safe-global/safe-apps-provider';
import { Opts } from '@safe-global/safe-apps-sdk';
import { Chain } from '@wagmi/core';
import { providers } from 'ethers';
import { C as Connector } from './base-84a689bb.js';
import '@wagmi/core/chains';
import 'eventemitter3';

type SafeConnectorProvider = SafeAppProvider;
type SafeConnectorOptions = Opts & {
    /**
     * Connector automatically connects when used as Safe App.
     *
     * This flag simulates the disconnect behavior by keeping track of connection status in storage
     * and only autoconnecting when previously connected by user action (e.g. explicitly choosing to connect).
     *
     * @default false
     */
    shimDisconnect?: boolean;
};
/**
 * Connector for [Safe Wallet](https://safe.global)
 */
declare class SafeConnector extends Connector<SafeConnectorProvider, SafeConnectorOptions> {
    #private;
    readonly id = "safe";
    readonly name = "Safe";
    ready: boolean;
    protected shimDisconnectKey: string;
    constructor({ chains, options: options_, }: {
        chains?: Chain[];
        options?: SafeConnectorOptions;
    });
    connect(): Promise<{
        account: `0x${string}`;
        provider: SafeAppProvider;
        chain: {
            id: number;
            unsupported: boolean;
        };
    }>;
    disconnect(): Promise<void>;
    getAccount(): Promise<`0x${string}`>;
    getChainId(): Promise<number>;
    getProvider(): Promise<SafeAppProvider>;
    getSigner(): Promise<providers.JsonRpcSigner>;
    isAuthorized(): Promise<boolean>;
    protected onAccountsChanged(_accounts: string[]): void;
    protected onChainChanged(_chainId: string | number): void;
    protected onDisconnect(): void;
}

export { SafeConnector, SafeConnectorOptions, SafeConnectorProvider };
