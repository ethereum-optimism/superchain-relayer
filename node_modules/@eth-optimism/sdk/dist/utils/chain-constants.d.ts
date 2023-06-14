import { L1ChainID, L2ChainID, OEContractsLike, OEL2ContractsLike, BridgeAdapterData } from '../interfaces';
export declare const DEPOSIT_CONFIRMATION_BLOCKS: {
    [ChainID in L2ChainID]: number;
};
export declare const CHAIN_BLOCK_TIMES: {
    [ChainID in L1ChainID]: number;
};
export declare const DEFAULT_L2_CONTRACT_ADDRESSES: OEL2ContractsLike;
export declare const CONTRACT_ADDRESSES: {
    [ChainID in L2ChainID]: OEContractsLike;
};
export declare const BRIDGE_ADAPTER_DATA: {
    [ChainID in L2ChainID]?: BridgeAdapterData;
};
