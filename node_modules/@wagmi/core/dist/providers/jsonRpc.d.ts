import { providers } from 'ethers';
import { Chain } from '@wagmi/chains';
import { F as FallbackProviderConfig, C as ChainProviderFn } from '../index-35b6525c.js';
import '@wagmi/connectors';
import 'abitype';

type JsonRpcProviderConfig = FallbackProviderConfig & {
    rpc: (chain: Chain) => {
        http: string;
        webSocket?: string;
    } | null;
    static?: boolean;
};
declare function jsonRpcProvider<TChain extends Chain = Chain>({ priority, rpc, stallTimeout, static: static_, weight, }: JsonRpcProviderConfig): ChainProviderFn<TChain, providers.JsonRpcProvider, providers.WebSocketProvider>;

export { JsonRpcProviderConfig, jsonRpcProvider };
