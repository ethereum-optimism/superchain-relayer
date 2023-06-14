import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
export interface MetaMaskWalletOptions {
    chains: Chain[];
    shimDisconnect?: boolean;
}
export declare const metaMaskWallet: ({ chains, shimDisconnect, }: MetaMaskWalletOptions) => Wallet;
