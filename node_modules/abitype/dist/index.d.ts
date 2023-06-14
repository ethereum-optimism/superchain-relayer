import { A as AbiType, S as SolidityAddress, a as SolidityBool, b as SolidityBytes, c as SolidityFunction, d as SolidityInt, e as SolidityString, f as SolidityTuple, g as SolidityArray, h as AbiParameter, i as SolidityFixedArrayRange, j as SolidityFixedArraySizeLookup, k as Abi, l as AbiStateMutability, T as TypedData, m as TypedDataType, n as TypedDataParameter, M as MBits } from './abi-78346466.js';
export { k as Abi, o as AbiError, p as AbiEvent, q as AbiFunction, r as AbiInternalType, h as AbiParameter, l as AbiStateMutability, A as AbiType, s as Address, S as SolidityAddress, g as SolidityArray, u as SolidityArrayWithTuple, t as SolidityArrayWithoutTuple, a as SolidityBool, b as SolidityBytes, i as SolidityFixedArrayRange, j as SolidityFixedArraySizeLookup, c as SolidityFunction, d as SolidityInt, e as SolidityString, f as SolidityTuple, T as TypedData, v as TypedDataDomain, n as TypedDataParameter, m as TypedDataType } from './abi-78346466.js';
import { R as ResolvedConfig, T as Tuple, M as Merge } from './config-7b342d17.js';
export { C as Config, D as DefaultConfig, R as ResolvedConfig } from './config-7b342d17.js';

/**
 * Infers embedded primitive type of any type
 *
 * @param T - Type to infer
 * @returns Embedded type of {@link TType}
 *
 * @example
 * type Result = Narrow<['foo', 'bar', 1]>
 */
type Narrow<TType> = (TType extends Function ? TType : never) | (TType extends string | number | boolean | bigint ? TType : never) | (TType extends [] ? [] : never) | {
    [K in keyof TType]: Narrow<TType[K]>;
};
/**
 * Infers embedded primitive type of any type
 * Same as `as const` but without setting the object as readonly and without needing the user to use it.
 *
 * @param value - Value to infer
 * @returns Value with embedded type inferred
 *
 * @example
 * const result = narrow(['foo', 'bar', 1])
 */
declare function narrow<TType>(value: Narrow<TType>): Narrow<TType>;

/**
 * Converts {@link AbiType} to corresponding TypeScript primitive type.
 *
 * Does not include full array or tuple conversion. Use {@link AbiParameterToPrimitiveType} to fully convert arrays and tuples.
 *
 * @param TAbiType - {@link AbiType} to convert to TypeScript representation
 * @returns TypeScript primitive type
 */
type AbiTypeToPrimitiveType<TAbiType extends AbiType> = PrimitiveTypeLookup<TAbiType>[TAbiType];
type PrimitiveTypeLookup<TAbiType extends AbiType> = {
    [_ in SolidityAddress]: ResolvedConfig['AddressType'];
} & {
    [_ in SolidityBool]: boolean;
} & {
    [_ in SolidityBytes]: ResolvedConfig['BytesType'];
} & {
    [_ in SolidityFunction]: `${ResolvedConfig['AddressType']}${string}`;
} & {
    [_ in SolidityInt]: TAbiType extends `${'u' | ''}int${infer TBits}` ? TBits extends keyof BitsTypeLookup ? BitsTypeLookup[TBits] : 'Error: Unknown bits value.' : `Error: Unknown 'SolidityInt' format.`;
} & {
    [_ in SolidityString]: string;
} & {
    [_ in SolidityTuple]: Record<string, unknown>;
} & {
    [_ in SolidityArray]: readonly unknown[];
};
type GreaterThan48Bits = Exclude<MBits, 8 | 16 | 24 | 32 | 40 | 48 | ''>;
type LessThanOrEqualTo48Bits = Exclude<MBits, GreaterThan48Bits | ''>;
type DynamicBits = Exclude<MBits, GreaterThan48Bits | LessThanOrEqualTo48Bits>;
type BitsTypeLookup = {
    [_ in `${LessThanOrEqualTo48Bits}`]: ResolvedConfig['IntType'];
} & {
    [_ in `${GreaterThan48Bits}`]: ResolvedConfig['BigIntType'];
} & {
    [_ in DynamicBits]: ResolvedConfig['IntType'] | ResolvedConfig['BigIntType'];
};
/**
 * Converts {@link AbiParameter} to corresponding TypeScript primitive type.
 *
 * @param TAbiParameter - {@link AbiParameter} to convert to TypeScript representation
 * @returns TypeScript primitive type
 */
type AbiParameterToPrimitiveType<TAbiParameter extends AbiParameter | {
    name: string;
    type: unknown;
}> = TAbiParameter['type'] extends Exclude<AbiType, SolidityTuple | SolidityArray> ? AbiTypeToPrimitiveType<TAbiParameter['type']> : TAbiParameter extends {
    type: SolidityTuple;
    components: infer TComponents extends readonly AbiParameter[];
} ? _HasUnnamedAbiParameter<TComponents> extends true ? readonly [
    ...{
        [K in keyof TComponents]: AbiParameterToPrimitiveType<TComponents[K]>;
    }
] : {
    [Component in TComponents[number] as Component extends {
        name: string;
    } ? Component['name'] : never]: AbiParameterToPrimitiveType<Component>;
} : 
/**
 * First, infer `Head` against a known size type (either fixed-length array value or `""`).
 *
 * | Input           | Head         |
 * | --------------- | ------------ |
 * | `string[]`      | `string`     |
 * | `string[][][3]` | `string[][]` |
 */
TAbiParameter['type'] extends `${infer Head}[${'' | `${SolidityFixedArrayRange}`}]` ? TAbiParameter['type'] extends `${Head}[${infer Size}]` ? Size extends keyof SolidityFixedArraySizeLookup ? Tuple<AbiParameterToPrimitiveType<Merge<TAbiParameter, {
    type: Head;
}>>, SolidityFixedArraySizeLookup[Size]> : readonly AbiParameterToPrimitiveType<Merge<TAbiParameter, {
    type: Head;
}>>[] : never : ResolvedConfig['StrictAbiType'] extends true ? TAbiParameter['type'] extends infer TAbiType extends string ? `Error: Unknown type '${TAbiType}'.` : never : unknown;
type _HasUnnamedAbiParameter<TAbiParameters extends readonly AbiParameter[]> = TAbiParameters extends readonly [
    infer Head extends AbiParameter,
    ...infer Tail extends readonly AbiParameter[]
] ? Head extends {
    name: string;
} ? Head['name'] extends '' ? true : _HasUnnamedAbiParameter<Tail> : false : false;
/**
 * Converts array of {@link AbiParameter} to corresponding TypeScript primitive types.
 *
 * @param TAbiParameters - Array of {@link AbiParameter} to convert to TypeScript representations
 * @returns Array of TypeScript primitive types
 */
type AbiParametersToPrimitiveTypes<TAbiParameters extends readonly AbiParameter[]> = {
    [K in keyof TAbiParameters]: AbiParameterToPrimitiveType<TAbiParameters[K]>;
};
/**
 * Checks if type is {@link Abi}.
 *
 * @param TAbi - {@link Abi} to check
 * @returns Boolean for whether {@link TAbi} is {@link Abi}
 */
type IsAbi<TAbi> = TAbi extends Abi ? true : false;
/**
 * Extracts all {@link AbiFunction} types from {@link Abi}.
 *
 * @param TAbi - {@link Abi} to extract functions from
 * @param TAbiStateMutibility - {@link AbiStateMutability} to filter by
 * @returns All {@link AbiFunction} types from {@link Abi}
 */
type ExtractAbiFunctions<TAbi extends Abi, TAbiStateMutibility extends AbiStateMutability = AbiStateMutability> = Extract<TAbi[number], {
    type: 'function';
    stateMutability: TAbiStateMutibility;
}>;
/**
 * Extracts all {@link AbiFunction} names from {@link Abi}.
 *
 * @param TAbi - {@link Abi} to extract function names from
 * @param TAbiStateMutibility - {@link AbiStateMutability} to filter by
 * @returns Union of function names
 */
type ExtractAbiFunctionNames<TAbi extends Abi, TAbiStateMutibility extends AbiStateMutability = AbiStateMutability> = ExtractAbiFunctions<TAbi, TAbiStateMutibility>['name'];
/**
 * Extracts {@link AbiFunction} with name from {@link Abi}.
 *
 * @param TAbi - {@link Abi} to extract {@link AbiFunction} from
 * @param TFunctionName - String name of function to extract from {@link Abi}
 * @returns Matching {@link AbiFunction}
 */
type ExtractAbiFunction<TAbi extends Abi, TFunctionName extends ExtractAbiFunctionNames<TAbi>> = Extract<ExtractAbiFunctions<TAbi>, {
    name: TFunctionName;
}>;
/**
 * Extracts all {@link AbiEvent} types from {@link Abi}.
 *
 * @param TAbi - {@link Abi} to extract events from
 * @returns All {@link AbiEvent} types from {@link Abi}
 */
type ExtractAbiEvents<TAbi extends Abi> = Extract<TAbi[number], {
    type: 'event';
}>;
/**
 * Extracts all {@link AbiEvent} names from {@link Abi}.
 *
 * @param TAbi - {@link Abi} to extract event names from
 * @returns Union of event names
 */
type ExtractAbiEventNames<TAbi extends Abi> = ExtractAbiEvents<TAbi>['name'];
/**
 * Extracts {@link AbiEvent} with name from {@link Abi}.
 *
 * @param TAbi - {@link Abi} to extract {@link AbiEvent} from
 * @param TEventName - String name of event to extract from {@link Abi}
 * @returns Matching {@link AbiEvent}
 */
type ExtractAbiEvent<TAbi extends Abi, TEventName extends ExtractAbiEventNames<TAbi>> = Extract<ExtractAbiEvents<TAbi>, {
    name: TEventName;
}>;
/**
 * Extracts all {@link AbiError} types from {@link Abi}.
 *
 * @param TAbi - {@link Abi} to extract errors from
 * @returns All {@link AbiError} types from {@link Abi}
 */
type ExtractAbiErrors<TAbi extends Abi> = Extract<TAbi[number], {
    type: 'error';
}>;
/**
 * Extracts all {@link AbiError} names from {@link Abi}.
 *
 * @param TAbi - {@link Abi} to extract error names from
 * @returns Union of error names
 */
type ExtractAbiErrorNames<TAbi extends Abi> = ExtractAbiErrors<TAbi>['name'];
/**
 * Extracts {@link AbiError} with name from {@link Abi}.
 *
 * @param TAbi - {@link Abi} to extract {@link AbiError} from
 * @param TErrorName - String name of error to extract from {@link Abi}
 * @returns Matching {@link AbiError}
 */
type ExtractAbiError<TAbi extends Abi, TErrorName extends ExtractAbiErrorNames<TAbi>> = Extract<ExtractAbiErrors<TAbi>, {
    name: TErrorName;
}>;
/**
 * Checks if type is {@link TypedData}.
 *
 * @param TTypedData - {@link TypedData} to check
 * @returns Boolean for whether {@link TTypedData} is {@link TypedData}
 */
type IsTypedData<TTypedData> = TTypedData extends TypedData ? {
    [K in keyof TTypedData]: {
        [K2 in TTypedData[K][number] as K2['type'] extends keyof TTypedData ? never : K2['type'] extends `${keyof TTypedData & string}[${string}]` ? never : K2['type'] extends TypedDataType ? never : K2['name']]: false;
    };
} extends {
    [K in keyof TTypedData]: Record<string, never>;
} ? true : false : false;
/**
 * Converts {@link TTypedData} to corresponding TypeScript primitive types.
 *
 * @param TTypedData - {@link TypedData} to convert
 * @returns Union of TypeScript primitive types
 */
type TypedDataToPrimitiveTypes<TTypedData extends TypedData> = {
    [K in keyof TTypedData]: {
        [K2 in TTypedData[K][number] as K2['name']]: K2['type'] extends K ? `Error: Cannot convert self-referencing struct '${K2['type']}' to primitive type.` : K2['type'] extends keyof TTypedData ? TypedDataToPrimitiveTypes<Exclude<TTypedData, K>>[K2['type']] : K2['type'] extends `${infer TType extends keyof TTypedData & string}[${infer Tail}]` ? AbiParameterToPrimitiveType<Merge<K2, {
            type: `tuple[${Tail}]`;
            components: _TypedDataParametersToAbiParameters<TTypedData[TType], TTypedData>;
        }>> : K2['type'] extends TypedDataType ? AbiParameterToPrimitiveType<K2> : `Error: Cannot convert unknown type '${K2['type']}' to primitive type.`;
    };
};
type _TypedDataParametersToAbiParameters<TTypedDataParameters extends readonly TypedDataParameter[], TTypedData extends TypedData> = {
    [K in keyof TTypedDataParameters]: TTypedDataParameters[K] extends infer TTypedDataParameter extends {
        name: string;
        type: unknown;
    } ? TTypedDataParameter['type'] extends keyof TTypedData ? Merge<TTypedDataParameter, {
        type: 'tuple';
        components: _TypedDataParametersToAbiParameters<TTypedData[TTypedDataParameter['type']], TTypedData>;
    }> : TTypedDataParameter['type'] extends `${infer TType extends keyof TTypedData & string}[${infer Tail}]` ? Merge<TTypedDataParameter, {
        type: `tuple[${Tail}]`;
        components: _TypedDataParametersToAbiParameters<TTypedData[TType], TTypedData>;
    }> : TTypedDataParameter : never;
};

export { AbiParameterToPrimitiveType, AbiParametersToPrimitiveTypes, AbiTypeToPrimitiveType, ExtractAbiError, ExtractAbiErrorNames, ExtractAbiErrors, ExtractAbiEvent, ExtractAbiEventNames, ExtractAbiEvents, ExtractAbiFunction, ExtractAbiFunctionNames, ExtractAbiFunctions, IsAbi, IsTypedData, Narrow, TypedDataToPrimitiveTypes, narrow };
