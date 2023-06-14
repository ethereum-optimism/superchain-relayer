import type { Listing, MobileWallet } from '@web3modal/core';
import type { TemplateResult } from 'lit';
export declare const DataFilterUtil: {
    allowedExplorerListings(listings: Listing[]): Listing[];
    walletsWithInjected<T extends MobileWallet | Listing>(wallets?: T[] | undefined): T[];
    connectorWallets(): import("@wagmi/connectors/dist/base-84a689bb").C<any, any, any>[];
    walletTemplatesWithRecent(walletsTemplate: TemplateResult<1>[], recentTemplate?: TemplateResult<1>): TemplateResult<1>[];
    deduplicateExplorerListingsFromConnectors(listings: Listing[]): Listing[];
};
