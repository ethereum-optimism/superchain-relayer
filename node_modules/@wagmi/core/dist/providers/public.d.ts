import { providers } from 'ethers';
import { Chain } from '@wagmi/chains';
import { F as FallbackProviderConfig, C as ChainProviderFn } from '../index-35b6525c.js';
import '@wagmi/connectors';
import 'abitype';

type PublicProviderConfig = FallbackProviderConfig;
declare function publicProvider<TChain extends Chain = Chain>({ priority, stallTimeout, weight, }?: PublicProviderConfig): ChainProviderFn<TChain, providers.StaticJsonRpcProvider>;

export { PublicProviderConfig, publicProvider };
