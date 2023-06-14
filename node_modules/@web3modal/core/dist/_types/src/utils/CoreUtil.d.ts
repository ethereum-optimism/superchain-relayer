export declare const CoreUtil: {
    WALLETCONNECT_DEEPLINK_CHOICE: string;
    isMobile(): boolean;
    isAndroid(): boolean;
    isEmptyObject(value: unknown): boolean;
    isHttpUrl(url: string): boolean;
    formatNativeUrl(appUrl: string, wcUri: string, name: string): string;
    formatUniversalUrl(appUrl: string, wcUri: string, name: string): string;
    wait(miliseconds: number): Promise<unknown>;
    openHref(href: string, target?: string): void;
    setWalletConnectDeepLink(href: string, name: string): void;
    setWalletConnectAndroidDeepLink(wcUri: string): void;
    removeWalletConnectDeepLink(): void;
    isNull<T>(value: T | null): value is null;
};
