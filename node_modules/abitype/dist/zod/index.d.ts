import { z } from 'zod';
import { h as AbiParameter$1 } from '../abi-78346466.js';
import '../config-7b342d17.js';

declare const SolidityAddress: z.ZodLiteral<"address">;
declare const SolidityBool: z.ZodLiteral<"bool">;
declare const SolidityBytes: z.ZodString;
declare const SolidityFunction: z.ZodLiteral<"function">;
declare const SolidityString: z.ZodLiteral<"string">;
declare const SolidityTuple: z.ZodLiteral<"tuple">;
declare const SolidityInt: z.ZodString;
declare const SolidityArrayWithoutTuple: z.ZodString;
declare const SolidityArrayWithTuple: z.ZodString;
declare const SolidityArray: z.ZodUnion<[z.ZodString, z.ZodString]>;
declare const AbiParameter: z.ZodType<AbiParameter$1>;
declare const AbiStateMutability: z.ZodUnion<[z.ZodLiteral<"pure">, z.ZodLiteral<"view">, z.ZodLiteral<"nonpayable">, z.ZodLiteral<"payable">]>;
declare const AbiFunction: z.ZodEffects<z.ZodIntersection<z.ZodObject<{
    /**
     * @deprecated use `pure` or `view` from {@link AbiStateMutability} instead
     * https://github.com/ethereum/solidity/issues/992
     */
    constant: z.ZodOptional<z.ZodBoolean>;
    /**
     * @deprecated Vyper used to provide gas estimates
     * https://github.com/vyperlang/vyper/issues/2151
     */
    gas: z.ZodOptional<z.ZodNumber>;
    /**
     * @deprecated use `payable` or `nonpayable` from {@link AbiStateMutability} instead
     * https://github.com/ethereum/solidity/issues/992
     */
    payable: z.ZodOptional<z.ZodBoolean>;
    stateMutability: z.ZodUnion<[z.ZodLiteral<"pure">, z.ZodLiteral<"view">, z.ZodLiteral<"nonpayable">, z.ZodLiteral<"payable">]>;
}, "strip", z.ZodTypeAny, {
    payable?: boolean | undefined;
    constant?: boolean | undefined;
    gas?: number | undefined;
    stateMutability: "pure" | "view" | "nonpayable" | "payable";
}, {
    payable?: boolean | undefined;
    constant?: boolean | undefined;
    gas?: number | undefined;
    stateMutability: "pure" | "view" | "nonpayable" | "payable";
}>, z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"function">;
    inputs: z.ZodArray<z.ZodType<AbiParameter$1, z.ZodTypeDef, AbiParameter$1>, "many">;
    name: z.ZodString;
    outputs: z.ZodArray<z.ZodType<AbiParameter$1, z.ZodTypeDef, AbiParameter$1>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "function";
    name: string;
    inputs: AbiParameter$1[];
    outputs: AbiParameter$1[];
}, {
    type: "function";
    name: string;
    inputs: AbiParameter$1[];
    outputs: AbiParameter$1[];
}>, z.ZodObject<{
    type: z.ZodLiteral<"constructor">;
    inputs: z.ZodArray<z.ZodType<AbiParameter$1, z.ZodTypeDef, AbiParameter$1>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "constructor";
    inputs: AbiParameter$1[];
}, {
    type: "constructor";
    inputs: AbiParameter$1[];
}>, z.ZodObject<{
    type: z.ZodLiteral<"fallback">;
    inputs: z.ZodOptional<z.ZodTuple<[], null>>;
}, "strip", z.ZodTypeAny, {
    inputs?: [] | undefined;
    type: "fallback";
}, {
    inputs?: [] | undefined;
    type: "fallback";
}>, z.ZodObject<{
    type: z.ZodLiteral<"receive">;
    stateMutability: z.ZodLiteral<"payable">;
}, "strip", z.ZodTypeAny, {
    type: "receive";
    stateMutability: "payable";
}, {
    type: "receive";
    stateMutability: "payable";
}>]>>, {
    payable?: boolean | undefined;
    constant?: boolean | undefined;
    gas?: number | undefined;
    stateMutability: "pure" | "view" | "nonpayable" | "payable";
} & ({
    type: "function";
    name: string;
    inputs: AbiParameter$1[];
    outputs: AbiParameter$1[];
} | {
    type: "constructor";
    inputs: AbiParameter$1[];
} | {
    inputs?: [] | undefined;
    type: "fallback";
} | {
    type: "receive";
    stateMutability: "payable";
}), unknown>;
declare const AbiEvent: z.ZodObject<{
    type: z.ZodLiteral<"event">;
    anonymous: z.ZodOptional<z.ZodBoolean>;
    inputs: z.ZodArray<z.ZodIntersection<z.ZodType<AbiParameter$1, z.ZodTypeDef, AbiParameter$1>, z.ZodObject<{
        indexed: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        indexed?: boolean | undefined;
    }, {
        indexed?: boolean | undefined;
    }>>, "many">;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    anonymous?: boolean | undefined;
    type: "event";
    name: string;
    inputs: (AbiParameter$1 & {
        indexed?: boolean | undefined;
    })[];
}, {
    anonymous?: boolean | undefined;
    type: "event";
    name: string;
    inputs: (AbiParameter$1 & {
        indexed?: boolean | undefined;
    })[];
}>;
declare const AbiError: z.ZodObject<{
    type: z.ZodLiteral<"error">;
    inputs: z.ZodArray<z.ZodType<AbiParameter$1, z.ZodTypeDef, AbiParameter$1>, "many">;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "error";
    name: string;
    inputs: AbiParameter$1[];
}, {
    type: "error";
    name: string;
    inputs: AbiParameter$1[];
}>;
/**
 * Zod Schema for Contract [ABI Specification](https://docs.soliditylang.org/en/latest/abi-spec.html#json)
 *
 * @example
 * const parsedAbi = Abi.parse([…])
 */
declare const Abi: z.ZodArray<z.ZodUnion<[z.ZodEffects<z.ZodIntersection<z.ZodObject<{
    /**
     * @deprecated use `pure` or `view` from {@link AbiStateMutability} instead
     * https://github.com/ethereum/solidity/issues/992
     */
    constant: z.ZodOptional<z.ZodBoolean>;
    /**
     * @deprecated Vyper used to provide gas estimates
     * https://github.com/vyperlang/vyper/issues/2151
     */
    gas: z.ZodOptional<z.ZodNumber>;
    /**
     * @deprecated use `payable` or `nonpayable` from {@link AbiStateMutability} instead
     * https://github.com/ethereum/solidity/issues/992
     */
    payable: z.ZodOptional<z.ZodBoolean>;
    stateMutability: z.ZodUnion<[z.ZodLiteral<"pure">, z.ZodLiteral<"view">, z.ZodLiteral<"nonpayable">, z.ZodLiteral<"payable">]>;
}, "strip", z.ZodTypeAny, {
    payable?: boolean | undefined;
    constant?: boolean | undefined;
    gas?: number | undefined;
    stateMutability: "pure" | "view" | "nonpayable" | "payable";
}, {
    payable?: boolean | undefined;
    constant?: boolean | undefined;
    gas?: number | undefined;
    stateMutability: "pure" | "view" | "nonpayable" | "payable";
}>, z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"function">;
    inputs: z.ZodArray<z.ZodType<AbiParameter$1, z.ZodTypeDef, AbiParameter$1>, "many">;
    name: z.ZodString;
    outputs: z.ZodArray<z.ZodType<AbiParameter$1, z.ZodTypeDef, AbiParameter$1>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "function";
    name: string;
    inputs: AbiParameter$1[];
    outputs: AbiParameter$1[];
}, {
    type: "function";
    name: string;
    inputs: AbiParameter$1[];
    outputs: AbiParameter$1[];
}>, z.ZodObject<{
    type: z.ZodLiteral<"constructor">;
    inputs: z.ZodArray<z.ZodType<AbiParameter$1, z.ZodTypeDef, AbiParameter$1>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "constructor";
    inputs: AbiParameter$1[];
}, {
    type: "constructor";
    inputs: AbiParameter$1[];
}>, z.ZodObject<{
    type: z.ZodLiteral<"fallback">;
    inputs: z.ZodOptional<z.ZodTuple<[], null>>;
}, "strip", z.ZodTypeAny, {
    inputs?: [] | undefined;
    type: "fallback";
}, {
    inputs?: [] | undefined;
    type: "fallback";
}>, z.ZodObject<{
    type: z.ZodLiteral<"receive">;
    stateMutability: z.ZodLiteral<"payable">;
}, "strip", z.ZodTypeAny, {
    type: "receive";
    stateMutability: "payable";
}, {
    type: "receive";
    stateMutability: "payable";
}>]>>, {
    payable?: boolean | undefined;
    constant?: boolean | undefined;
    gas?: number | undefined;
    stateMutability: "pure" | "view" | "nonpayable" | "payable";
} & ({
    type: "function";
    name: string;
    inputs: AbiParameter$1[];
    outputs: AbiParameter$1[];
} | {
    type: "constructor";
    inputs: AbiParameter$1[];
} | {
    inputs?: [] | undefined;
    type: "fallback";
} | {
    type: "receive";
    stateMutability: "payable";
}), unknown>, z.ZodObject<{
    type: z.ZodLiteral<"event">;
    anonymous: z.ZodOptional<z.ZodBoolean>;
    inputs: z.ZodArray<z.ZodIntersection<z.ZodType<AbiParameter$1, z.ZodTypeDef, AbiParameter$1>, z.ZodObject<{
        indexed: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        indexed?: boolean | undefined;
    }, {
        indexed?: boolean | undefined;
    }>>, "many">;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    anonymous?: boolean | undefined;
    type: "event";
    name: string;
    inputs: (AbiParameter$1 & {
        indexed?: boolean | undefined;
    })[];
}, {
    anonymous?: boolean | undefined;
    type: "event";
    name: string;
    inputs: (AbiParameter$1 & {
        indexed?: boolean | undefined;
    })[];
}>, z.ZodObject<{
    type: z.ZodLiteral<"error">;
    inputs: z.ZodArray<z.ZodType<AbiParameter$1, z.ZodTypeDef, AbiParameter$1>, "many">;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "error";
    name: string;
    inputs: AbiParameter$1[];
}, {
    type: "error";
    name: string;
    inputs: AbiParameter$1[];
}>]>, "many">;

export { Abi, AbiError, AbiEvent, AbiFunction, AbiParameter, AbiStateMutability, SolidityAddress, SolidityArray, SolidityArrayWithTuple, SolidityArrayWithoutTuple, SolidityBool, SolidityBytes, SolidityFunction, SolidityInt, SolidityString, SolidityTuple };
