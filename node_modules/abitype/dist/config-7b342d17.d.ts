/**
 * Checks if {@link T} is `unknown`
 *
 * @param T - Type to check
 * @returns `true` if {@link T} is `unknown`, otherwise `false`
 *
 * @example
 * type Result = IsUnknown<unknown>
 */
type IsUnknown<T> = unknown extends T ? true : false;
/**
 * Merges two object types into new type
 *
 * @param Object1 - Object to merge into
 * @param Object2 - Object to merge and override keys from {@link Object1}
 * @returns New object type with keys from {@link Object1} and {@link Object2}. If a key exists in both {@link Object1} and {@link Object2}, the key from {@link Object2} will be used.
 *
 * @example
 * type Result = Merge<{ foo: string }, { foo: number; bar: string }>
 * { foo: number; bar: string }
 */
type Merge<Object1, Object2> = Omit<Object1, keyof Object2> & Object2;
/**
 * Creates range between two positive numbers using [tail recursion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#tail-recursion-elimination-on-conditional-types).
 *
 * @param Start - Number to start range
 * @param Stop - Number to end range
 * @returns Array with inclusive range from {@link Start} to {@link Stop}
 *
 * @example
 * type Result = Range<1, 3>
 * [1, 2, 3]
 */
type Range<Start extends number, Stop extends number, Result extends number[] = [], Padding extends 0[] = [], Current extends number = [...Padding, ...Result]['length'] & number> = Current extends Stop ? Current extends Start ? [Current] : Result extends [] ? [] : [...Result, Current] : Current extends Start ? Range<Start, Stop, [Current], Padding> : Result extends [] ? Range<Start, Stop, [], [...Padding, 0]> : Range<Start, Stop, [...Result, Current], Padding>;
/**
 * Create tuple of {@link Type} type with {@link Size} size
 *
 * @param Type - Type of tuple
 * @param Size - Size of tuple
 * @returns Tuple of {@link Type} type with {@link Size} size
 *
 * @example
 * type Result = Tuple<string, 2>
 * [string, string]
 */
type Tuple<Type, Size extends number> = Size extends Size ? number extends Size ? Type[] : _TupleOf<Type, Size, []> : never;
type _TupleOf<TNumber, TSize extends number, R extends readonly unknown[]> = R['length'] extends TSize ? R : _TupleOf<TNumber, TSize, readonly [TNumber, ...R]>;

/**
 * Override `Config` to customize type options
 *
 * @example
 * declare module 'abitype' {
 *   export interface Config {
 *     FixedArrayMaxLength: 6
 *   }
 * }
 */
interface Config {
    [key: string]: unknown;
}
/**
 * Default {@link Config} options
 */
interface DefaultConfig {
    /** Maximum depth for nested array types (e.g. string[][]) */
    ArrayMaxDepth: false;
    /** Lower bound for fixed array length */
    FixedArrayMinLength: 1;
    /** Upper bound for fixed array length */
    FixedArrayMaxLength: 99;
    /** TypeScript type to use for `address` values */
    AddressType: `0x${string}`;
    /** TypeScript type to use for `bytes` values */
    BytesType: `0x${string}`;
    /** TypeScript type to use for `int<M>` and `uint<M>` values, where `M > 48` */
    BigIntType: bigint;
    /** TypeScript type to use for `int<M>` and `uint<M>` values, where `M <= 48` */
    IntType: number;
    /** When set, validates {@link AbiParameter}'s `type` against {@link AbiType} */
    StrictAbiType: false;
}
/**
 * Resolved {@link Config} between user defined options and {@link DefaultConfig}
 *
 * @example
 * import { ResolvedConfig } from 'abitype'
 *
 * ResolvedConfig['BigIntType']
 */
interface ResolvedConfig {
    /**
     * Maximum depth for nested array types (e.g. string[][])
     *
     * Note: You probably only want to set this to a specific number if parsed types are returning as `unknown`
     * and you want to figure out why. If you set this, you should probably also reduce `FixedArrayMaxLength`.
     *
     * @default false
     */
    ArrayMaxDepth: Config['ArrayMaxDepth'] extends number | false ? Config['ArrayMaxDepth'] : DefaultConfig['ArrayMaxDepth'];
    /**
     * Lower bound for fixed array length
     * @default 1
     */
    FixedArrayMinLength: Config['FixedArrayMinLength'] extends number ? Config['FixedArrayMinLength'] : DefaultConfig['FixedArrayMinLength'];
    /**
     * Upper bound for fixed array length
     * @default 99
     */
    FixedArrayMaxLength: Config['FixedArrayMaxLength'] extends number ? Config['FixedArrayMaxLength'] : DefaultConfig['FixedArrayMaxLength'];
    /**
     * TypeScript type to use for `address` values
     * @default `0x${string}`
     */
    AddressType: IsUnknown<Config['AddressType']> extends true ? DefaultConfig['AddressType'] : Config['AddressType'];
    /**
     * TypeScript type to use for `bytes` values
     * @default `0x${string}`
     */
    BytesType: IsUnknown<Config['BytesType']> extends true ? DefaultConfig['BytesType'] : Config['BytesType'];
    /**
     * TypeScript type to use for `int<M>` and `uint<M>` values, where `M > 48`
     * @default bigint
     */
    BigIntType: IsUnknown<Config['BigIntType']> extends true ? DefaultConfig['BigIntType'] : Config['BigIntType'];
    /**
     * TypeScript type to use for `int<M>` and `uint<M>` values, where `M <= 48`
     * @default number
     */
    IntType: IsUnknown<Config['IntType']> extends true ? DefaultConfig['IntType'] : Config['IntType'];
    /**
     * When set, validates {@link AbiParameter}'s `type` against {@link AbiType}
     *
     * Note: You probably only want to set this to `true` if parsed types are returning as `unknown`
     * and you want to figure out why.
     *
     * @default false
     */
    StrictAbiType: Config['StrictAbiType'] extends true ? Config['StrictAbiType'] : DefaultConfig['StrictAbiType'];
}

export { Config as C, DefaultConfig as D, Merge as M, ResolvedConfig as R, Tuple as T, Range as a };
