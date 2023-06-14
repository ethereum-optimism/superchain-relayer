import { CoinbaseWalletProvider } from '@coinbase/wallet-sdk';
import { CoinbaseWalletSDKOptions } from '@coinbase/wallet-sdk/dist/CoinbaseWalletSDK';
import { Chain } from '@wagmi/core/chains';
import { providers } from 'ethers';
import { C as Connector } from './base-84a689bb.js';
import '@wagmi/core';
import 'eventemitter3';

type Options = Omit<CoinbaseWalletSDKOptions, 'reloadOnDisconnect'> & {
    /**
     * Fallback Ethereum JSON RPC URL
     * @default ""
     */
    jsonRpcUrl?: string;
    /**
     * Fallback Ethereum Chain ID
     * @default 1
     */
    chainId?: number;
    /**
     * Whether or not to reload dapp automatically after disconnect.
     */
    reloadOnDisconnect?: boolean;
};
declare class CoinbaseWalletConnector extends Connector<CoinbaseWalletProvider, Options, providers.JsonRpcSigner> {
    #private;
    readonly id = "coinbaseWallet";
    readonly name = "Coinbase Wallet";
    readonly ready = true;
    constructor({ chains, options }: {
        chains?: Chain[];
        options: Options;
    });
    connect({ chainId }?: {
        chainId?: number;
    }): Promise<{
        account: `0x${string}`;
        chain: {
            id: number;
            unsupported: boolean;
        };
        provider: providers.Web3Provider;
    }>;
    disconnect(): Promise<void>;
    getAccount(): Promise<`0x${string}`>;
    getChainId(): Promise<number>;
    getProvider(): Promise<CoinbaseWalletProvider>;
    getSigner({ chainId }?: {
        chainId?: number;
    }): Promise<providers.JsonRpcSigner>;
    isAuthorized(): Promise<boolean>;
    switchChain(chainId: number): Promise<Chain>;
    watchAsset({ address, decimals, image, symbol, }: {
        address: string;
        decimals?: number;
        image?: string;
        symbol: string;
    }): Promise<boolean>;
    protected onAccountsChanged: (accounts: string[]) => void;
    protected onChainChanged: (chainId: number | string) => void;
    protected onDisconnect: () => void;
}

export { CoinbaseWalletConnector };
