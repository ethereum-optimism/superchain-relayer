import { providers } from 'ethers';
import { Chain } from '@wagmi/chains';
import { F as FallbackProviderConfig, C as ChainProviderFn } from '../index-35b6525c.js';
import '@wagmi/connectors';
import 'abitype';

type AlchemyProviderConfig = FallbackProviderConfig & {
    /** Your Alchemy API key from the [Alchemy Dashboard](https://dashboard.alchemyapi.io/). */
    apiKey: string;
};
declare function alchemyProvider<TChain extends Chain = Chain>({ apiKey, priority, stallTimeout, weight, }: AlchemyProviderConfig): ChainProviderFn<TChain, providers.AlchemyProvider, providers.AlchemyWebSocketProvider>;

export { AlchemyProviderConfig, alchemyProvider };
