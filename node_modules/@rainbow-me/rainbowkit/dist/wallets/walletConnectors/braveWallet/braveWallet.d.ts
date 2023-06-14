import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
export interface BraveWalletOptions {
    chains: Chain[];
    shimDisconnect?: boolean;
}
export declare const braveWallet: ({ chains, shimDisconnect, }: BraveWalletOptions) => Wallet;
