import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
export interface RainbowWalletOptions {
    chains: Chain[];
    shimDisconnect?: boolean;
}
export declare const rainbowWallet: ({ chains, shimDisconnect, }: RainbowWalletOptions) => Wallet;
