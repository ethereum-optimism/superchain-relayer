export interface EvmWindow {
    ethereum?: any;
    spotEthWallet?: any;
    coinbaseWalletExtension?: any;
}
export interface InjectedPreset {
    name: string;
    icon: string;
    url: string;
    isMobile?: boolean;
    isDesktop?: boolean;
    isInjected?: boolean;
}
export declare const enum InjectedId {
    metaMask = "metaMask",
    trust = "trust",
    phantom = "phantom",
    brave = "brave",
    spotEthWallet = "spotEthWallet",
    exodus = "exodus",
    tokenPocket = "tokenPocket",
    frame = "frame",
    tally = "tally",
    coinbaseWallet = "coinbaseWallet",
    core = "core",
    bitkeep = "bitkeep",
    mathWallet = "mathWallet",
    opera = "opera",
    tokenary = "tokenary",
    '1inch' = "1inch",
    kuCoinWallet = "kuCoinWallet",
    ledger = "ledger"
}
export declare const EthereumPresets: {
    injectedPreset: Record<string, InjectedPreset | undefined>;
    getInjectedId(id: string): string;
    getInjectedName(name: string): string;
};
