import { ReactNode } from 'react';
import { ThemeVars } from '../../css/sprinkles.css';
import { DisclaimerComponent } from './AppContext';
import { AvatarComponent } from './AvatarContext';
import { ModalSizes } from './ModalSizeContext';
import { RainbowKitChain } from './RainbowKitChainContext';
export declare const useThemeRootProps: () => {
    "data-rk": string;
};
export type Theme = ThemeVars | {
    lightMode: ThemeVars;
    darkMode: ThemeVars;
};
export interface RainbowKitProviderProps {
    chains: RainbowKitChain[];
    initialChain?: RainbowKitChain | number;
    id?: string;
    children: ReactNode;
    theme?: Theme | null;
    showRecentTransactions?: boolean;
    appInfo?: {
        appName?: string;
        learnMoreUrl?: string;
        disclaimer?: DisclaimerComponent;
    };
    coolMode?: boolean;
    avatar?: AvatarComponent;
    modalSize?: ModalSizes;
}
export declare function RainbowKitProvider({ chains, initialChain, id, theme, children, appInfo, showRecentTransactions, coolMode, avatar, modalSize, }: RainbowKitProviderProps): JSX.Element;
