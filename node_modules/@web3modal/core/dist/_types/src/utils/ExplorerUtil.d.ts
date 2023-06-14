import type { ListingResponse, PageParams } from '../types/controllerTypes';
export declare const ExplorerUtil: {
    fetchWallets(projectId: string, params: PageParams): Promise<ListingResponse>;
    formatImageUrl(projectId: string, imageId: string): string;
};
