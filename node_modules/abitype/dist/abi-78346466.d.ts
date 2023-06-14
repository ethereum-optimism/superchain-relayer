import { R as ResolvedConfig, a as Range } from './config-7b342d17.js';

type Address = ResolvedConfig['AddressType'];
type MBytes = '' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32;
type MBits = '' | 8 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80 | 88 | 96 | 104 | 112 | 120 | 128 | 136 | 144 | 152 | 160 | 168 | 176 | 184 | 192 | 200 | 208 | 216 | 224 | 232 | 240 | 248 | 256;
type SolidityAddress = 'address';
type SolidityBool = 'bool';
type SolidityBytes = `bytes${MBytes}`;
type SolidityFunction = 'function';
type SolidityString = 'string';
type SolidityTuple = 'tuple';
type SolidityInt = `${'u' | ''}int${MBits}`;
type SolidityFixedArrayRange = Range<ResolvedConfig['FixedArrayMinLength'], ResolvedConfig['FixedArrayMaxLength']>[number];
type SolidityFixedArraySizeLookup = {
    [Prop in SolidityFixedArrayRange as `${Prop}`]: Prop;
};
/**
 * Recursively build arrays up to maximum depth
 * or use a more broad type when maximum depth is switch "off"
 */
type _BuildArrayTypes<T extends string, Depth extends ReadonlyArray<number> = []> = ResolvedConfig['ArrayMaxDepth'] extends false ? `${T}[${string}]` : Depth['length'] extends ResolvedConfig['ArrayMaxDepth'] ? T : T extends `${any}[${SolidityFixedArrayRange | ''}]` ? _BuildArrayTypes<T | `${T}[${SolidityFixedArrayRange | ''}]`, [...Depth, 1]> : _BuildArrayTypes<`${T}[${SolidityFixedArrayRange | ''}]`, [...Depth, 1]>;
type SolidityArrayWithoutTuple = _BuildArrayTypes<SolidityAddress | SolidityBool | SolidityBytes | SolidityFunction | SolidityInt | SolidityString>;
type SolidityArrayWithTuple = _BuildArrayTypes<SolidityTuple>;
type SolidityArray = SolidityArrayWithoutTuple | SolidityArrayWithTuple;
type AbiType = SolidityArray | SolidityAddress | SolidityBool | SolidityBytes | SolidityFunction | SolidityInt | SolidityString | SolidityTuple;
type ResolvedAbiType = ResolvedConfig['StrictAbiType'] extends true ? AbiType : string;
type AbiInternalType = ResolvedAbiType | `address ${string}` | `contract ${string}` | `enum ${string}` | `struct ${string}`;
type AbiParameter = {
    type: ResolvedAbiType;
    name?: string;
    /** Representation used by Solidity compiler */
    internalType?: AbiInternalType;
} & ({
    type: Exclude<ResolvedAbiType, SolidityTuple | SolidityArrayWithTuple>;
} | {
    type: SolidityTuple | SolidityArrayWithTuple;
    components: readonly AbiParameter[];
});
type AbiStateMutability = 'pure' | 'view' | 'nonpayable' | 'payable';
type AbiFunction = {
    /**
     * @deprecated use `pure` or `view` from {@link AbiStateMutability} instead
     * https://github.com/ethereum/solidity/issues/992
     */
    constant?: boolean;
    /**
     * @deprecated Vyper used to provide gas estimates
     * https://github.com/vyperlang/vyper/issues/2151
     */
    gas?: number;
    /**
     * @deprecated use `payable` or `nonpayable` from {@link AbiStateMutability} instead
     * https://github.com/ethereum/solidity/issues/992
     */
    payable?: boolean;
    stateMutability: AbiStateMutability;
} & ({
    type: 'function';
    inputs: readonly AbiParameter[];
    name: string;
    outputs: readonly AbiParameter[];
} | {
    type: 'constructor';
    inputs: readonly AbiParameter[];
} | {
    type: 'fallback';
    inputs?: [];
} | {
    type: 'receive';
    stateMutability: 'payable';
});
type AbiEvent = {
    type: 'event';
    anonymous?: boolean;
    inputs: readonly (AbiParameter & {
        indexed?: boolean;
    })[];
    name: string;
};
type AbiError = {
    type: 'error';
    inputs: readonly AbiParameter[];
    name: string;
};
/**
 * Contract [ABI Specification](https://docs.soliditylang.org/en/latest/abi-spec.html#json)
 */
type Abi = readonly (AbiFunction | AbiEvent | AbiError)[];
type TypedDataDomain = {
    chainId?: string | number | bigint;
    name?: string;
    salt?: ResolvedConfig['BytesType'];
    verifyingContract?: Address;
    version?: string;
};
type TypedDataType = Exclude<AbiType, SolidityFunction | SolidityTuple | SolidityArrayWithTuple>;
type TypedDataParameter = {
    name: string;
    type: TypedDataType | keyof TypedData | `${keyof TypedData}[${string | ''}]`;
};
/**
 * [EIP-712](https://eips.ethereum.org/EIPS/eip-712#definition-of-typed-structured-data-%F0%9D%95%8A) Typed Data Specification
 */
type TypedData = {
    [key: string]: readonly TypedDataParameter[];
} & {
    [_ in TypedDataType]?: never;
};

export { AbiType as A, MBits as M, SolidityAddress as S, TypedData as T, SolidityBool as a, SolidityBytes as b, SolidityFunction as c, SolidityInt as d, SolidityString as e, SolidityTuple as f, SolidityArray as g, AbiParameter as h, SolidityFixedArrayRange as i, SolidityFixedArraySizeLookup as j, Abi as k, AbiStateMutability as l, TypedDataType as m, TypedDataParameter as n, AbiError as o, AbiEvent as p, AbiFunction as q, AbiInternalType as r, Address as s, SolidityArrayWithoutTuple as t, SolidityArrayWithTuple as u, TypedDataDomain as v };
