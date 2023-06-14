import { Ethereum } from '@wagmi/connectors';
import { Address, TypedData, TypedDataToPrimitiveTypes, TypedDataDomain, ResolvedConfig } from 'abitype';
import { BigNumber, providers, Signer as Signer$1 } from 'ethers';
import { Chain } from '@wagmi/chains';

declare const units: readonly ["wei", "kwei", "mwei", "gwei", "szabo", "finney", "ether"];

declare module 'abitype' {
    interface Config {
        BigIntType: BigNumber;
        IntType: number;
    }
}
declare module 'ethers/lib/utils.js' {
    function getAddress(address: string): Address;
    function isAddress(address: string): address is Address;
    function verifyTypedData<TTypedData extends TypedData, TSchema extends TypedDataToPrimitiveTypes<TTypedData>>(domain: TypedDataDomain, types: TTypedData, value: TSchema[keyof TSchema] extends infer TValue ? {
        [x: string]: any;
    } extends TValue ? Record<string, any> : TValue : never, signature: {
        r: string;
        s?: string;
        _vs?: string;
        recoveryParam?: number;
        v?: number;
    } | ResolvedConfig['BytesType'] | string): string;
}
type Hash = `0x${string}`;
type ChainProviderFn<TChain extends Chain = Chain, TProvider extends Provider = providers.BaseProvider, TWebSocketProvider extends WebSocketProvider = providers.WebSocketProvider> = (chain: TChain) => {
    chain: TChain;
    provider: () => ProviderWithFallbackConfig<TProvider>;
    webSocketProvider?: () => TWebSocketProvider;
} | null;
type FallbackProviderConfig = Omit<providers.FallbackProviderConfig, 'provider'>;
type ProviderWithFallbackConfig<TProvider extends Provider = Provider> = TProvider & FallbackProviderConfig;
type Provider = providers.BaseProvider & {
    chains?: Chain[];
};
type WebSocketProvider = providers.WebSocketProvider & {
    chains?: Chain[];
};
type Signer = Signer$1;
type Unit = (typeof units)[number];
declare global {
    interface Window {
        ethereum?: Ethereum;
    }
}

export { ChainProviderFn as C, FallbackProviderConfig as F, Hash as H, Provider as P, Signer as S, Unit as U, WebSocketProvider as W, ProviderWithFallbackConfig as a, units as u };
