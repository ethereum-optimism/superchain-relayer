import { providers } from 'ethers';
import { Chain } from '@wagmi/chains';
import { F as FallbackProviderConfig, C as ChainProviderFn } from '../index-35b6525c.js';
import '@wagmi/connectors';
import 'abitype';

type InfuraProviderConfig = FallbackProviderConfig & {
    /** Your Infura API key from the [Infura Dashboard](https://infura.io/login). */
    apiKey: string;
};
declare function infuraProvider<TChain extends Chain = Chain>({ apiKey, priority, stallTimeout, weight, }: InfuraProviderConfig): ChainProviderFn<TChain, providers.InfuraProvider, providers.InfuraWebSocketProvider>;

export { InfuraProviderConfig, infuraProvider };
