import { BigNumber } from 'ethers';
import { LowLevelMessage } from '../interfaces';
export declare const hashLowLevelMessage: (message: LowLevelMessage) => string;
export declare const hashMessageHash: (messageHash: string) => string;
export declare const migratedWithdrawalGasLimit: (data: string, chainID: number) => BigNumber;
