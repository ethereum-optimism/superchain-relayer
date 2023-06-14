import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
export interface InjectedWalletOptions {
    chains: Chain[];
    shimDisconnect?: boolean;
}
export declare const injectedWallet: ({ chains, shimDisconnect, }: InjectedWalletOptions) => Wallet;
