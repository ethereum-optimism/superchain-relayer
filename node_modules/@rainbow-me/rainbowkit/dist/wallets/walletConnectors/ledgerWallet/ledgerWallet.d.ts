import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
export interface LedgerWalletOptions {
    chains: Chain[];
}
export declare const ledgerWallet: ({ chains }: LedgerWalletOptions) => Wallet;
