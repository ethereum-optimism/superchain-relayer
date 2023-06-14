import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
export interface CoinbaseWalletOptions {
    appName: string;
    chains: Chain[];
}
export declare const coinbaseWallet: ({ appName, chains, }: CoinbaseWalletOptions) => Wallet;
