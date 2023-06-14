import { ethers, BigNumber } from 'ethers';
export declare const makeMerkleTreeProof: (leaves: string[], index: number) => string[];
export declare const makeStateTrieProof: (provider: ethers.providers.JsonRpcProvider, blockNumber: number, address: string, slot: string) => Promise<{
    accountProof: string[];
    storageProof: string[];
    storageValue: BigNumber;
    storageRoot: string;
}>;
