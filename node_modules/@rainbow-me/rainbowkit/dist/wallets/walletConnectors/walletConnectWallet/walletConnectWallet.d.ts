import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
export interface WalletConnectWalletOptions {
    chains: Chain[];
}
export declare const walletConnectWallet: ({ chains, }: WalletConnectWalletOptions) => Wallet;
