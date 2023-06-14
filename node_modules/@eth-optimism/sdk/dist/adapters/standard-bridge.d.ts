import { ethers, Contract, Overrides, Signer, BigNumber, CallOverrides } from 'ethers';
import { TransactionRequest, TransactionResponse, BlockTag } from '@ethersproject/abstract-provider';
import { CrossChainMessenger } from '../cross-chain-messenger';
import { IBridgeAdapter, NumberLike, AddressLike, TokenBridgeMessage } from '../interfaces';
export declare class StandardBridgeAdapter implements IBridgeAdapter {
    messenger: CrossChainMessenger;
    l1Bridge: Contract;
    l2Bridge: Contract;
    constructor(opts: {
        messenger: CrossChainMessenger;
        l1Bridge: AddressLike;
        l2Bridge: AddressLike;
    });
    getDepositsByAddress(address: AddressLike, opts?: {
        fromBlock?: BlockTag;
        toBlock?: BlockTag;
    }): Promise<TokenBridgeMessage[]>;
    getWithdrawalsByAddress(address: AddressLike, opts?: {
        fromBlock?: BlockTag;
        toBlock?: BlockTag;
    }): Promise<TokenBridgeMessage[]>;
    supportsTokenPair(l1Token: AddressLike, l2Token: AddressLike): Promise<boolean>;
    approval(l1Token: AddressLike, l2Token: AddressLike, signer: ethers.Signer): Promise<BigNumber>;
    approve(l1Token: AddressLike, l2Token: AddressLike, amount: NumberLike, signer: Signer, opts?: {
        overrides?: Overrides;
    }): Promise<TransactionResponse>;
    deposit(l1Token: AddressLike, l2Token: AddressLike, amount: NumberLike, signer: Signer, opts?: {
        recipient?: AddressLike;
        l2GasLimit?: NumberLike;
        overrides?: Overrides;
    }): Promise<TransactionResponse>;
    withdraw(l1Token: AddressLike, l2Token: AddressLike, amount: NumberLike, signer: Signer, opts?: {
        recipient?: AddressLike;
        overrides?: Overrides;
    }): Promise<TransactionResponse>;
    populateTransaction: {
        approve: (l1Token: AddressLike, l2Token: AddressLike, amount: NumberLike, opts?: {
            overrides?: Overrides;
        }) => Promise<TransactionRequest>;
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
    estimateGas: {
        approve: (l1Token: AddressLike, l2Token: AddressLike, amount: NumberLike, opts?: {
            overrides?: CallOverrides;
        }) => Promise<BigNumber>;
        deposit: (l1Token: AddressLike, l2Token: AddressLike, amount: NumberLike, opts?: {
            recipient?: AddressLike;
            l2GasLimit?: NumberLike;
            overrides?: CallOverrides;
        }) => Promise<BigNumber>;
        withdraw: (l1Token: AddressLike, l2Token: AddressLike, amount: NumberLike, opts?: {
            recipient?: AddressLike;
            overrides?: CallOverrides;
        }) => Promise<BigNumber>;
    };
}
