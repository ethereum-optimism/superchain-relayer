import type { ExplorerCtrlState, PageParams } from '../types/controllerTypes';
export declare const ExplorerCtrl: {
    state: ExplorerCtrlState;
    getPreviewWallets(params: PageParams): Promise<import("../types/controllerTypes").Listing[]>;
    getRecomendedWallets(): Promise<void>;
    getPaginatedWallets(params: PageParams): Promise<{
        listings: import("../types/controllerTypes").Listing[];
        total: number;
    }>;
    getImageUrl(imageId: string): string;
    resetSearch(): void;
};
