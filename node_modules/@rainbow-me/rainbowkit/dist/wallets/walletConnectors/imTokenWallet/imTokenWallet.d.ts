import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
export interface ImTokenWalletOptions {
    chains: Chain[];
}
export declare const imTokenWallet: ({ chains }: ImTokenWalletOptions) => Wallet;
