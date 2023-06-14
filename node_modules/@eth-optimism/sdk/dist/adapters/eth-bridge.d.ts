import { ethers, Overrides, BigNumber } from 'ethers';
import { TransactionRequest, BlockTag } from '@ethersproject/abstract-provider';
import { NumberLike, AddressLike, TokenBridgeMessage } from '../interfaces';
import { StandardBridgeAdapter } from './standard-bridge';
export declare class ETHBridgeAdapter extends StandardBridgeAdapter {
    approval(l1Token: AddressLike, l2Token: AddressLike, signer: ethers.Signer): Promise<BigNumber>;
    getDepositsByAddress(address: AddressLike, opts?: {
        fromBlock?: BlockTag;
        toBlock?: BlockTag;
    }): Promise<TokenBridgeMessage[]>;
    getWithdrawalsByAddress(address: AddressLike, opts?: {
        fromBlock?: BlockTag;
        toBlock?: BlockTag;
    }): Promise<TokenBridgeMessage[]>;
    supportsTokenPair(l1Token: AddressLike, l2Token: AddressLike): Promise<boolean>;
    populateTransaction: {
        approve: (l1Token: AddressLike, l2Token: AddressLike, amount: NumberLike, opts?: {
            overrides?: Overrides;
        }) => Promise<never>;
        deposit: (l1Token: AddressLike, l2Token: AddressLike, amount: NumberLike, opts?: {
            recipient?: AddressLike;
            l2GasLimit?: NumberLike;
            overrides?: Overrides;
        }) => Promise<TransactionRequest>;
        withdraw: (l1Token: AddressLike, l2Token: AddressLike, amount: NumberLike, opts?: {
            recipient?: AddressLike;
            overrides?: Overrides;
        }) => Promise<TransactionRequest>;
    };
}
