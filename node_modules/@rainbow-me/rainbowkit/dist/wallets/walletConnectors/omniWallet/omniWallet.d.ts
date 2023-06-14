import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
export interface OmniWalletOptions {
    chains: Chain[];
}
export declare const omniWallet: ({ chains }: OmniWalletOptions) => Wallet;
