import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
export interface ArgentWalletOptions {
    chains: Chain[];
}
export declare const argentWallet: ({ chains }: ArgentWalletOptions) => Wallet;
