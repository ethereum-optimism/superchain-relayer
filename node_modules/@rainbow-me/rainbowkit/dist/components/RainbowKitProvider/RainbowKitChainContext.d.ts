import { ReactNode } from 'react';
import { Chain as WagmiChain } from 'wagmi';
export interface RainbowKitChain {
    id: number;
    iconUrl?: string | (() => Promise<string>) | null;
    iconBackground?: string;
}
export type Chain = WagmiChain & RainbowKitChain;
interface RainbowKitChainProviderProps {
    chains: RainbowKitChain[];
    initialChain?: RainbowKitChain | number;
    children: ReactNode;
}
export declare function RainbowKitChainProvider({ chains, children, initialChain, }: RainbowKitChainProviderProps): JSX.Element;
export declare const useRainbowKitChains: () => RainbowKitChain[];
export declare const useInitialChainId: () => number | undefined;
export declare const useRainbowKitChainsById: () => Record<number, RainbowKitChain>;
export {};
