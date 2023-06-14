import { ethers, Contract } from 'ethers';
import { DeepPartial } from './type-utils';
import { CrossChainMessenger } from '../cross-chain-messenger';
import { OEContracts, OEL1Contracts, OEL2Contracts, OEContractsLike, AddressLike, BridgeAdapters, BridgeAdapterData } from '../interfaces';
export declare const getOEContract: (contractName: keyof OEL1Contracts | keyof OEL2Contracts, l2ChainId: number, opts?: {
    address?: AddressLike;
    signerOrProvider?: ethers.Signer | ethers.providers.Provider;
}) => Contract;
export declare const getAllOEContracts: (l2ChainId: number, opts?: {
    l1SignerOrProvider?: ethers.Signer | ethers.providers.Provider;
    l2SignerOrProvider?: ethers.Signer | ethers.providers.Provider;
    overrides?: DeepPartial<OEContractsLike>;
}) => OEContracts;
export declare const getBridgeAdapters: (l2ChainId: number, messenger: CrossChainMessenger, opts?: {
    overrides?: BridgeAdapterData;
    contracts?: DeepPartial<OEContractsLike>;
}) => BridgeAdapters;
