import { Provider, TransactionRequest, TransactionResponse, Block, BlockWithTransactions } from '@ethersproject/abstract-provider';
import { BigNumber } from 'ethers';
export interface L2Transaction extends TransactionResponse {
    l1BlockNumber: number;
    l1TxOrigin: string;
    queueOrigin: string;
    rawTransaction: string;
}
export interface L2Block extends Block {
    stateRoot: string;
}
export interface L2BlockWithTransactions extends BlockWithTransactions {
    stateRoot: string;
    transactions: [L2Transaction];
}
export type L2Provider<TProvider extends Provider> = TProvider & {
    getL1GasPrice(): Promise<BigNumber>;
    estimateL1Gas(tx: TransactionRequest): Promise<BigNumber>;
    estimateL1GasCost(tx: TransactionRequest): Promise<BigNumber>;
    estimateL2GasCost(tx: TransactionRequest): Promise<BigNumber>;
    estimateTotalGasCost(tx: TransactionRequest): Promise<BigNumber>;
    _isL2Provider: true;
};
