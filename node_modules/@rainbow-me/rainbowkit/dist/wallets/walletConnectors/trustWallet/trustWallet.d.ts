import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
export interface TrustWalletOptions {
    chains: Chain[];
    shimDisconnect?: boolean;
}
export declare const trustWallet: ({ chains, shimDisconnect, }: TrustWalletOptions) => Wallet;
