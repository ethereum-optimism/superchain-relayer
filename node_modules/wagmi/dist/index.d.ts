import * as _tanstack_react_query from '@tanstack/react-query';
import { QueryClient, QueryKey, UseInfiniteQueryOptions, QueryFunction, InfiniteQueryObserverResult, UseMutationOptions, UseMutationResult, MutationFunction, MutationKey, UseQueryOptions, QueryObserverResult } from '@tanstack/react-query';
import { Persister } from '@tanstack/react-query-persist-client';
import * as _wagmi_core from '@wagmi/core';
import { Provider, WebSocketProvider, ClientConfig, Client as Client$1, GetAccountResult, FetchBalanceResult, FetchBalanceArgs, ConnectArgs, ConnectResult, Signer, FetchSignerResult, FetchSignerArgs, SignMessageArgs, SignMessageResult, SignTypedDataArgs, SignTypedDataResult, SwitchNetworkArgs, SwitchNetworkResult, GetContractArgs, GetContractResult, WatchContractEventConfig, ReadContractsResult, ReadContractsConfig, ReadContractResult, ReadContractConfig, WriteContractMode, WriteContractResult, WriteContractUnpreparedArgs, WriteContractPreparedArgs, PrepareWriteContractConfig, PrepareWriteContractResult, FetchTokenResult, FetchTokenArgs, FetchEnsAddressArgs, FetchEnsAddressResult, FetchEnsAvatarArgs, FetchEnsAvatarResult, FetchEnsNameArgs, FetchEnsNameResult, FetchEnsResolverArgs, FetchEnsResolverResult, FetchBlockNumberArgs, FetchBlockNumberResult, FetchFeeDataResult, FetchFeeDataArgs, GetProviderArgs, GetWebSocketProviderArgs, PrepareSendTransactionResult, PrepareSendTransactionArgs, SendTransactionResult, SendTransactionArgs, SendTransactionPreparedRequest, SendTransactionUnpreparedRequest, FetchTransactionArgs, FetchTransactionResult, WaitForTransactionArgs, WaitForTransactionResult } from '@wagmi/core';
export { AddChainError, Chain, ChainDoesNotSupportMulticallError, ChainMismatchError, ChainNotConfiguredError, ChainProviderFn, Connector, ConnectorAlreadyConnectedError, ConnectorData, ConnectorEvents, ConnectorNotFoundError, ContractMethodDoesNotExistError, ContractMethodNoResultError, ContractMethodRevertedError, ContractResultDecodeError, ProviderChainsNotFound, ProviderRpcError, ResourceUnavailableError, RpcError, Storage, SwitchChainError, SwitchChainNotSupportedError, Unit, UserRejectedRequestError, configureChains, createStorage, deepEqual, deserialize, erc20ABI, erc4626ABI, erc721ABI, goerli, mainnet, readContracts, serialize } from '@wagmi/core';
import * as React from 'react';
import * as abitype from 'abitype';
import { Address, TypedData, TypedDataToPrimitiveTypes, TypedDataDomain, ResolvedConfig, Abi, AbiEvent, ExtractAbiEvent, AbiParametersToPrimitiveTypes } from 'abitype';
export { Address } from 'abitype';
import { BigNumber, Transaction } from 'ethers';
import { Contract, ContractsConfig } from '@wagmi/core/internal';
import * as _ethersproject_providers from '@ethersproject/providers';

type CreateClientConfig<TProvider extends Provider = Provider, TWebSocketProvider extends WebSocketProvider = WebSocketProvider> = ClientConfig<TProvider, TWebSocketProvider> & {
    queryClient?: QueryClient;
    persister?: Persister | null;
};
declare function createClient<TProvider extends Provider, TWebSocketProvider extends WebSocketProvider>({ queryClient, storage, persister, ...config }: CreateClientConfig<TProvider, TWebSocketProvider>): Client$1<TProvider, TWebSocketProvider> & {
    queryClient: QueryClient;
};
type Client<TProvider extends Provider = Provider, TWebSocketProvider extends WebSocketProvider = WebSocketProvider> = Client$1<TProvider, TWebSocketProvider> & {
    queryClient: QueryClient;
};

declare const Context: React.Context<Client<Provider, WebSocketProvider> | undefined>;
type WagmiConfigProps<TProvider extends Provider = Provider, TWebSocketProvider extends WebSocketProvider = WebSocketProvider> = {
    /** React-decorated Client instance */
    client: Client<TProvider, TWebSocketProvider>;
};
declare function WagmiConfig<TProvider extends Provider, TWebSocketProvider extends WebSocketProvider>({ children, client, }: React.PropsWithChildren<WagmiConfigProps<TProvider, TWebSocketProvider>>): React.FunctionComponentElement<React.ProviderProps<Client<Provider, WebSocketProvider> | undefined>>;
declare function useClient<TProvider extends Provider, TWebSocketProvider extends WebSocketProvider = WebSocketProvider>(): Client<TProvider, TWebSocketProvider>;

type UseAccountConfig = {
    /** Function to invoke when connected */
    onConnect?({ address, connector, isReconnected, }: {
        address?: GetAccountResult['address'];
        connector?: GetAccountResult['connector'];
        isReconnected: boolean;
    }): void;
    /** Function to invoke when disconnected */
    onDisconnect?(): void;
};
declare function useAccount({ onConnect, onDisconnect }?: UseAccountConfig): GetAccountResult<_wagmi_core.Provider>;

type UseInfiniteQueryResult<TData, TError> = Pick<InfiniteQueryObserverResult<TData, TError>, 'data' | 'error' | 'fetchNextPage' | 'fetchStatus' | 'hasNextPage' | 'isError' | 'isFetched' | 'isFetchedAfterMount' | 'isFetching' | 'isFetchingNextPage' | 'isLoading' | 'isRefetching' | 'isSuccess' | 'refetch'> & {
    isIdle: boolean;
    status: 'idle' | 'loading' | 'success' | 'error';
    internal: Pick<InfiniteQueryObserverResult, 'dataUpdatedAt' | 'errorUpdatedAt' | 'failureCount' | 'isLoadingError' | 'isPaused' | 'isPlaceholderData' | 'isPreviousData' | 'isRefetchError' | 'isStale' | 'remove'>;
};
declare function useInfiniteQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(options: UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>): UseInfiniteQueryResult<TData, TError>;
declare function useInfiniteQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, 'queryKey'>): UseInfiniteQueryResult<TData, TError>;
declare function useInfiniteQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, queryFn: QueryFunction<TQueryFnData, TQueryKey>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, 'queryKey' | 'queryFn'>): UseInfiniteQueryResult<TData, TError>;

declare function useMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(options: UseMutationOptions<TData, TError, TVariables, TContext>): UseMutationResult<TData, TError, TVariables, TContext>;
declare function useMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(mutationFn: MutationFunction<TData, TVariables>, options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>): UseMutationResult<TData, TError, TVariables, TContext>;
declare function useMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(mutationKey: MutationKey, options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationKey'>): UseMutationResult<TData, TError, TVariables, TContext>;
declare function useMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(mutationKey: MutationKey, mutationFn?: MutationFunction<TData, TVariables>, options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationKey' | 'mutationFn'>): UseMutationResult<TData, TError, TVariables, TContext>;

type UseQueryResult<TData, TError> = Pick<QueryObserverResult<TData, TError>, 'data' | 'error' | 'fetchStatus' | 'isError' | 'isFetched' | 'isFetchedAfterMount' | 'isFetching' | 'isLoading' | 'isRefetching' | 'isSuccess' | 'refetch'> & {
    isIdle: boolean;
    status: 'idle' | 'loading' | 'success' | 'error';
    internal: Pick<QueryObserverResult, 'dataUpdatedAt' | 'errorUpdatedAt' | 'failureCount' | 'isLoadingError' | 'isPaused' | 'isPlaceholderData' | 'isPreviousData' | 'isRefetchError' | 'isStale' | 'remove'>;
};
type DefinedUseQueryResult<TData = unknown, TError = unknown> = Omit<UseQueryResult<TData, TError>, 'data'> & {
    data: TData;
};
declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'initialData'> & {
    initialData?: () => undefined;
}): UseQueryResult<TData, TError>;
declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'initialData'> & {
    initialData: TQueryFnData | (() => TQueryFnData);
}): DefinedUseQueryResult<TData, TError>;
declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, queryFn: QueryFunction<TQueryFnData, TQueryKey>, options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn' | 'initialData'> & {
    initialData?: () => undefined;
}): UseQueryResult<TData, TError>;
declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, queryFn: QueryFunction<TQueryFnData, TQueryKey>, options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn' | 'initialData'> & {
    initialData: TQueryFnData | (() => TQueryFnData);
}): DefinedUseQueryResult<TData, TError>;

declare const useQueryClient: () => _tanstack_react_query.QueryClient;

type UseChainIdArgs = {
    chainId?: number;
};
declare function useChainId({ chainId }?: UseChainIdArgs): number;

declare module 'abitype' {
    interface Config {
        BigIntType: BigNumber;
        IntType: number;
    }
}
declare module 'ethers/lib/utils.js' {
    function getAddress(address: string): Address;
    function verifyTypedData<TTypedData extends TypedData, TSchema extends TypedDataToPrimitiveTypes<TTypedData>>(domain: TypedDataDomain, types: TTypedData, value: TSchema[keyof TSchema] extends infer TValue ? {
        [x: string]: any;
    } extends TValue ? Record<string, any> : TValue : never, signature: {
        r: string;
        s?: string;
        _vs?: string;
        recoveryParam?: number;
        v?: number;
    } | ResolvedConfig['BytesType'] | string): string;
}
/**
 * Makes {@link TKeys} optional in {@link TType} while preserving type inference.
 */
type PartialBy<TType, TKeys extends keyof TType> = Partial<Pick<TType, TKeys>> & Omit<TType, TKeys>;
type DeepPartial<T, MaxDepth extends number, Depth extends ReadonlyArray<number> = []> = Depth['length'] extends MaxDepth ? T : T extends object ? {
    [P in keyof T]?: DeepPartial<T[P], MaxDepth, [...Depth, 1]>;
} : T;
type QueryConfig<TData, TError, TSelectData = TData> = Pick<UseQueryOptions<TData, TError, TSelectData>, 'cacheTime' | 'enabled' | 'isDataEqual' | 'keepPreviousData' | 'select' | 'staleTime' | 'structuralSharing' | 'suspense' | 'onError' | 'onSettled' | 'onSuccess'> & {
    /** Scope the cache to a given context. */
    scopeKey?: string;
};
type InfiniteQueryConfig<TData, TError, TSelectData = TData> = Pick<UseInfiniteQueryOptions<TData, TError, TSelectData>, 'cacheTime' | 'enabled' | 'getNextPageParam' | 'isDataEqual' | 'keepPreviousData' | 'select' | 'staleTime' | 'structuralSharing' | 'suspense' | 'onError' | 'onSettled' | 'onSuccess'> & {
    /** Scope the cache to a given context. */
    scopeKey?: string;
};
type MutationConfig<Data, Error, Variables = void> = {
    /** Function fires if mutation encounters error */
    onError?: UseMutationOptions<Data, Error, Variables>['onError'];
    /**
     * Function fires before mutation function and is passed same variables mutation function would receive.
     * Value returned from this function will be passed to both onError and onSettled functions in event of a mutation failure.
     */
    onMutate?: UseMutationOptions<Data, Error, Variables>['onMutate'];
    /** Function fires when mutation is either successfully fetched or encounters error */
    onSettled?: UseMutationOptions<Data, Error, Variables>['onSettled'];
    /** Function fires when mutation is successful and will be passed the mutation's result */
    onSuccess?: UseMutationOptions<Data, Error, Variables>['onSuccess'];
};

type UseBalanceArgs = Partial<FetchBalanceArgs> & {
    /** Subscribe to changes */
    watch?: boolean;
};
type UseBalanceConfig = QueryConfig<FetchBalanceResult, Error>;
declare function useBalance({ address, cacheTime, chainId: chainId_, enabled, formatUnits, scopeKey, staleTime, suspense, token, watch, onError, onSettled, onSuccess, }?: UseBalanceArgs & UseBalanceConfig): UseQueryResult<FetchBalanceResult, Error>;

type UseConnectArgs = Partial<ConnectArgs>;
type UseConnectConfig = MutationConfig<ConnectResult, Error, ConnectArgs>;
declare function useConnect({ chainId, connector, onError, onMutate, onSettled, onSuccess, }?: UseConnectArgs & UseConnectConfig): {
    readonly connect: (args?: Partial<ConnectArgs>) => void;
    readonly connectAsync: (args?: Partial<ConnectArgs>) => Promise<ConnectResult<_wagmi_core.Provider>>;
    readonly connectors: _wagmi_core.Connector<any, any, any>[];
    readonly data: ConnectResult<_wagmi_core.Provider> | undefined;
    readonly error: Error | null;
    readonly isError: boolean;
    readonly isIdle: boolean;
    readonly isLoading: boolean;
    readonly isSuccess: boolean;
    readonly pendingConnector: _wagmi_core.Connector<any, any, any> | undefined;
    readonly reset: () => void;
    readonly status: "error" | "success" | "loading" | "idle";
    readonly variables: ConnectArgs | undefined;
};

type UseDisconnectConfig = {
    /** Function to invoke when an error is thrown while connecting. */
    onError?: (error: Error, context: unknown) => void | Promise<unknown>;
    /**
     * Function fires before mutation function and is passed same variables mutation function would receive.
     * Value returned from this function will be passed to both onError and onSettled functions in event of a mutation failure.
     */
    onMutate?: () => unknown;
    /** Function to invoke when connect is settled (either successfully connected, or an error has thrown). */
    onSettled?: (error: Error | null, context: unknown) => void | Promise<unknown>;
    /** Function fires when mutation is successful and will be passed the mutation's result */
    onSuccess?: (context: unknown) => void | Promise<unknown>;
};
declare function useDisconnect({ onError, onMutate, onSettled, onSuccess, }?: UseDisconnectConfig): {
    readonly disconnect: _tanstack_react_query.UseMutateFunction<void, Error, void, unknown>;
    readonly disconnectAsync: _tanstack_react_query.UseMutateAsyncFunction<void, Error, void, unknown>;
    readonly error: Error | null;
    readonly isError: boolean;
    readonly isIdle: boolean;
    readonly isLoading: boolean;
    readonly isSuccess: boolean;
    readonly reset: () => void;
    readonly status: "error" | "success" | "loading" | "idle";
};

declare function useNetwork(): _wagmi_core.GetNetworkResult;

type UseSignerConfig = Omit<QueryConfig<FetchSignerResult, Error>, 'cacheTime' | 'staleTime' | 'enabled'> & FetchSignerArgs;
declare function useSigner<TSigner extends Signer>({ chainId: chainId_, suspense, onError, onSettled, onSuccess, }?: UseSignerConfig): UseQueryResult<FetchSignerResult<TSigner>, Error>;

type UseSignMessageArgs = Partial<SignMessageArgs>;
type UseSignMessageConfig = MutationConfig<SignMessageResult, Error, SignMessageArgs>;
declare function useSignMessage({ message, onError, onMutate, onSettled, onSuccess, }?: UseSignMessageArgs & UseSignMessageConfig): {
    data: `0x${string}` | undefined;
    error: Error | null;
    isError: boolean;
    isIdle: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    reset: () => void;
    signMessage: (args?: SignMessageArgs) => void;
    signMessageAsync: (args?: SignMessageArgs) => Promise<`0x${string}`>;
    status: "error" | "success" | "loading" | "idle";
    variables: SignMessageArgs | undefined;
};

type UseSignTypedDataArgs<TTypedData extends TypedData | {
    [key: string]: unknown;
} = TypedData> = PartialBy<SignTypedDataArgs<TTypedData>, 'domain' | 'types' | 'value'>;
type UseSignTypedDataConfig<TTypedData extends TypedData | {
    [key: string]: unknown;
} = TypedData> = MutationConfig<SignTypedDataResult, Error, SignTypedDataArgs<TTypedData>> & UseSignTypedDataArgs<TTypedData>;
declare function useSignTypedData<TTypedData extends TypedData>({ domain, types, value, onError, onMutate, onSettled, onSuccess, }?: UseSignTypedDataConfig<TTypedData>): {
    data: string | undefined;
    error: Error | null;
    isError: boolean;
    isIdle: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    reset: () => void;
    signTypedData: <TTypedDataMutate extends TypedData = TTypedData>(args?: UseSignTypedDataArgs<TTypedDataMutate> | undefined) => void;
    signTypedDataAsync: <TTypedDataMutate_1 extends TypedData = TTypedData>(args?: UseSignTypedDataArgs<TTypedDataMutate_1> | undefined) => Promise<string>;
    status: "error" | "success" | "loading" | "idle";
    variables: SignTypedDataArgs<TTypedData, TTypedData extends TypedData ? abitype.TypedDataToPrimitiveTypes<TTypedData> : {
        [key: string]: any;
    }, (TTypedData extends TypedData ? abitype.TypedDataToPrimitiveTypes<TTypedData> : {
        [key: string]: any;
    })[keyof (TTypedData extends TypedData ? abitype.TypedDataToPrimitiveTypes<TTypedData> : {
        [key: string]: any;
    })]> | undefined;
};

type UseSwitchNetworkArgs = Partial<SwitchNetworkArgs>;
type UseSwitchNetworkConfig = MutationConfig<SwitchNetworkResult, Error, SwitchNetworkArgs> & {
    throwForSwitchChainNotSupported?: boolean;
};
declare function useSwitchNetwork({ chainId, throwForSwitchChainNotSupported, onError, onMutate, onSettled, onSuccess, }?: UseSwitchNetworkArgs & UseSwitchNetworkConfig): {
    readonly chains: _wagmi_core.Chain[];
    readonly data: _wagmi_core.Chain | undefined;
    readonly error: Error | null;
    readonly isError: boolean;
    readonly isIdle: boolean;
    readonly isLoading: boolean;
    readonly isSuccess: boolean;
    readonly pendingChainId: number | undefined;
    readonly reset: () => void;
    readonly status: "error" | "success" | "loading" | "idle";
    readonly switchNetwork: ((chainId_?: SwitchNetworkArgs['chainId']) => void) | undefined;
    readonly switchNetworkAsync: ((chainId_?: SwitchNetworkArgs['chainId']) => Promise<_wagmi_core.Chain>) | undefined;
    readonly variables: SwitchNetworkArgs | undefined;
};

type UseContractConfig<TAbi extends Abi | readonly unknown[] = Abi> = Partial<Pick<GetContractArgs<TAbi>, 'abi' | 'address'>> & {
    /** Signer or provider to attach to contract */
    signerOrProvider?: GetContractArgs['signerOrProvider'] | null;
};
declare function useContract<TAbi extends Abi | readonly unknown[]>({ address, abi, signerOrProvider, }?: UseContractConfig<TAbi>): GetContractResult<TAbi> | null;

type UseContractEventConfig<TAbi extends Abi | readonly unknown[] = Abi, TEventName extends string = string> = PartialBy<WatchContractEventConfig<TAbi, TEventName> & GetListener<TAbi, TEventName>, 'abi' | 'address' | 'eventName'>;
declare function useContractEvent<TAbi extends Abi | readonly unknown[], TEventName extends string>({ address, chainId, abi, listener, eventName, once, }?: UseContractEventConfig<TAbi, TEventName>): void;
type GetListener<TAbi extends Abi | readonly unknown[], TEventName extends string, TAbiEvent extends AbiEvent = TAbi extends Abi ? ExtractAbiEvent<TAbi, TEventName> : AbiEvent, TArgs = AbiParametersToPrimitiveTypes<TAbiEvent['inputs']>, FailedToParseArgs = ([TArgs] extends [never] ? true : false) | (readonly unknown[] extends TArgs ? true : false)> = true extends FailedToParseArgs ? {
    /**
     * Callback when event is emitted
     *
     * Use a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) on {@link abi} for type inference.
     */
    listener: (...args: unknown[]) => void;
} : {
    /** Callback when event is emitted */ listener: (...args: TArgs extends readonly unknown[] ? TArgs : unknown[]) => void;
};

type UseContractInfiniteReadsConfig<TContracts extends Contract[] = Contract[], TPageParam = unknown, TSelectData = ReadContractsResult<TContracts>> = Pick<ReadContractsConfig<TContracts>, 'allowFailure' | 'overrides'> & {
    cacheKey: string;
    contracts(pageParam: TPageParam): readonly [
        ...ContractsConfig<TContracts, {
            /** Chain id to use for provider */
            chainId?: number;
        }>
    ];
} & InfiniteQueryConfig<ReadContractsResult<TContracts>, Error, TSelectData>;
declare function useContractInfiniteReads<TAbi extends Abi | readonly unknown[], TFunctionName extends string, TContracts extends {
    abi: TAbi;
    functionName: TFunctionName;
}[], TPageParam = any, TSelectData = ReadContractsResult<TContracts>>({ allowFailure, cacheKey, cacheTime, contracts, enabled: enabled_, getNextPageParam, isDataEqual, keepPreviousData, onError, onSettled, onSuccess, overrides, scopeKey, select, staleTime, structuralSharing, suspense, }: UseContractInfiniteReadsConfig<TContracts, TPageParam, TSelectData>): UseInfiniteQueryResult<TSelectData, Error>;
declare function paginatedIndexesConfig<TAbi extends Abi | readonly unknown[], TFunctionName extends string, TContracts extends {
    abi: TAbi;
    functionName: TFunctionName;
}[], TSelectData = ReadContractsResult<TContracts>>(fn: UseContractInfiniteReadsConfig<TContracts>['contracts'], { perPage, start, direction, }: {
    perPage: number;
    start: number;
    direction: 'increment' | 'decrement';
}): {
    contracts: UseContractInfiniteReadsConfig<TContracts>['contracts'];
    getNextPageParam: InfiniteQueryConfig<unknown[], Error, TSelectData>['getNextPageParam'];
};

type UseContractReadConfig<TAbi extends Abi | readonly unknown[] = Abi, TFunctionName extends string = string, TSelectData = ReadContractResult<TAbi, TFunctionName>> = PartialBy<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address' | 'args' | 'functionName'> & QueryConfig<ReadContractResult<TAbi, TFunctionName>, Error, TSelectData> & {
    /** If set to `true`, the cache will depend on the block number */
    cacheOnBlock?: boolean;
    /** Subscribe to changes */
    watch?: boolean;
};
declare function useContractRead<TAbi extends Abi | readonly unknown[], TFunctionName extends string, TSelectData = ReadContractResult<TAbi, TFunctionName>>({ abi, address, args, cacheOnBlock, cacheTime, chainId: chainId_, enabled: enabled_, functionName, isDataEqual, onError, onSettled, onSuccess, overrides, scopeKey, select, staleTime, structuralSharing, suspense, watch, }?: UseContractReadConfig<TAbi, TFunctionName, TSelectData>): UseQueryResult<TSelectData, Error>;

type UseContractReadsConfig<TContracts extends Contract[], TSelectData = ReadContractsResult<TContracts>, Config = ReadContractsConfig<TContracts>> = {
    [K in keyof Config]?: K extends 'contracts' ? DeepPartial<Config[K], 2> : Config[K];
} & QueryConfig<ReadContractsResult<TContracts>, Error, TSelectData> & {
    /** If set to `true`, the cache will depend on the block number */
    cacheOnBlock?: boolean;
    /** Subscribe to changes */
    watch?: boolean;
};
declare function useContractReads<TAbi extends Abi | readonly unknown[], TFunctionName extends string, TContracts extends {
    abi: TAbi;
    functionName: TFunctionName;
}[], TSelectData = ReadContractsResult<TContracts>>({ allowFailure, cacheOnBlock, cacheTime, contracts, enabled: enabled_, isDataEqual, keepPreviousData, onError, onSettled, onSuccess, overrides, scopeKey, select, staleTime, structuralSharing, suspense, watch, }?: UseContractReadsConfig<TContracts, TSelectData>): UseQueryResult<TSelectData, Error>;

type UseContractWriteArgs<TMode extends WriteContractMode = WriteContractMode, TAbi extends Abi | readonly unknown[] = Abi, TFunctionName extends string = string> = {
    mode: TMode;
} & (PartialBy<WriteContractPreparedArgs<TAbi, TFunctionName>, 'abi' | 'address' | 'functionName' | 'request'> | PartialBy<WriteContractUnpreparedArgs<TAbi, TFunctionName>, 'abi' | 'address' | 'args' | 'functionName'>);
type UseContractWriteConfig<TMode extends WriteContractMode = WriteContractMode, TAbi extends Abi | readonly unknown[] = Abi, TFunctionName extends string = string> = MutationConfig<WriteContractResult, Error, UseContractWriteArgs<TMode, TAbi, TFunctionName>> & UseContractWriteArgs<TMode, TAbi, TFunctionName>;
/**
 * @description Hook for calling an ethers Contract [write](https://docs.ethers.io/v5/api/contract/contract/#Contract--write)
 * method.
 *
 * It is highly recommended to pair this with the [`usePrepareContractWrite` hook](/docs/prepare-hooks/usePrepareContractWrite)
 * to [avoid UX pitfalls](https://wagmi.sh/react/prepare-hooks#ux-pitfalls-without-prepare-hooks).
 *
 * @example
 * import { useContractWrite, usePrepareContractWrite } from 'wagmi'
 *
 * const { config } = usePrepareContractWrite({
 *  address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
 *  abi: wagmigotchiABI,
 *  functionName: 'feed',
 * })
 * const { data, isLoading, isSuccess, write } = useContractWrite(config)
 *
 */
declare function useContractWrite<TMode extends WriteContractMode, TAbi extends Abi | readonly unknown[], TFunctionName extends string>(config?: UseContractWriteConfig<TMode, TAbi, TFunctionName>): {
    data: _wagmi_core.SendTransactionResult | undefined;
    error: Error | null;
    isError: boolean;
    isIdle: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    reset: () => void;
    status: "error" | "success" | "loading" | "idle";
    variables: UseContractWriteArgs<WriteContractMode, Abi, string> | undefined;
    write: MutationFn<TMode & "prepared", TAbi, TFunctionName, void> | MutationFn<TMode & WriteContractUnpreparedArgs<TAbi, TFunctionName>["mode"], TAbi, TFunctionName, void>;
    writeAsync: MutationFn<TMode & "prepared", TAbi, TFunctionName, Promise<_wagmi_core.SendTransactionResult>> | MutationFn<TMode & WriteContractUnpreparedArgs<TAbi, TFunctionName>["mode"], TAbi, TFunctionName, Promise<_wagmi_core.SendTransactionResult>>;
};
type MutationFnArgs<TAbi extends Abi | readonly unknown[] = Abi, TFunctionName extends string = string> = {
    /**
     * Recklessly pass through unprepared config. Note: This has
     * [UX pitfalls](https://wagmi.sh/react/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks),
     * it is highly recommended to not use this and instead prepare the config upfront
     * using the `usePrepareContractWrite` function.
     */
    recklesslySetUnpreparedArgs?: WriteContractUnpreparedArgs<TAbi, TFunctionName>['args'];
    recklesslySetUnpreparedOverrides?: WriteContractUnpreparedArgs<TAbi, TFunctionName>['overrides'];
};
type MutationFn<TMode extends WriteContractMode, TAbi extends Abi | readonly unknown[], TFunctionName extends string, TReturnType> = TMode extends 'prepared' ? (() => TReturnType) | undefined : (config?: MutationFnArgs<TAbi, TFunctionName>) => TReturnType;

type UsePrepareContractWriteConfig<TAbi extends Abi | readonly unknown[] = Abi, TFunctionName extends string = string, TChainId extends number = number, TSigner extends Signer = Signer> = PartialBy<PrepareWriteContractConfig<TAbi, TFunctionName, TChainId, TSigner>, 'abi' | 'address' | 'args' | 'functionName'> & QueryConfig<PrepareWriteContractResult<TAbi, TFunctionName, TChainId>, Error>;
/**
 * @description Hook for preparing a contract write to be sent via [`useContractWrite`](/docs/hooks/useContractWrite).
 *
 * Eagerly fetches the parameters required for sending a contract write transaction such as the gas estimate.
 *
 * @example
 * import { useContractWrite, usePrepareContractWrite } from 'wagmi'
 *
 * const { config } = usePrepareContractWrite({
 *  address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
 *  abi: wagmigotchiABI,
 *  functionName: 'feed',
 * })
 * const { data, isLoading, isSuccess, write } = useContractWrite(config)
 *
 */
declare function usePrepareContractWrite<TAbi extends Abi | readonly unknown[], TFunctionName extends string, TChainId extends number>({ address, abi, functionName, chainId, args, overrides, cacheTime, enabled, scopeKey, staleTime, suspense, onError, onSettled, onSuccess, }?: UsePrepareContractWriteConfig<TAbi, TFunctionName, TChainId>): Pick<_tanstack_react_query.QueryObserverResult<PrepareWriteContractResult<TAbi, TFunctionName, TChainId>, Error>, "data" | "error" | "isError" | "isLoading" | "isSuccess" | "isFetched" | "isFetchedAfterMount" | "isFetching" | "isRefetching" | "refetch" | "fetchStatus"> & {
    isIdle: boolean;
    status: "error" | "success" | "loading" | "idle";
    internal: Pick<_tanstack_react_query.QueryObserverResult<unknown, unknown>, "isLoadingError" | "isRefetchError" | "dataUpdatedAt" | "errorUpdatedAt" | "failureCount" | "isPaused" | "isPlaceholderData" | "isPreviousData" | "isStale" | "remove">;
} & {
    config: PrepareWriteContractResult<TAbi, TFunctionName, TChainId>;
};

type UseTokenArgs = Partial<FetchTokenArgs>;
type UseTokenConfig = QueryConfig<FetchTokenResult, Error>;
declare function useToken({ address, chainId: chainId_, formatUnits, cacheTime, enabled, scopeKey, staleTime, // 24 hours
suspense, onError, onSettled, onSuccess, }?: UseTokenArgs & UseTokenConfig): UseQueryResult<FetchTokenResult, Error>;

type UseEnsAddressArgs = Partial<FetchEnsAddressArgs>;
type UseEnsAddressConfig = QueryConfig<FetchEnsAddressResult, Error>;
declare function useEnsAddress({ cacheTime, chainId: chainId_, enabled, name, scopeKey, staleTime, // 24 hours
suspense, onError, onSettled, onSuccess, }?: UseEnsAddressArgs & UseEnsAddressConfig): UseQueryResult<`0x${string}` | null, Error>;

type UseEnsAvatarArgs = Partial<FetchEnsAvatarArgs>;
type UseEnsLookupConfig = QueryConfig<FetchEnsAvatarResult, Error>;
declare function useEnsAvatar({ address, cacheTime, chainId: chainId_, enabled, scopeKey, staleTime, // 24 hours
suspense, onError, onSettled, onSuccess, }?: UseEnsAvatarArgs & UseEnsLookupConfig): UseQueryResult<string | null, Error>;

type UseEnsNameArgs = Partial<FetchEnsNameArgs>;
type UseEnsNameConfig = QueryConfig<FetchEnsNameResult, Error>;
declare function useEnsName({ address, cacheTime, chainId: chainId_, enabled, scopeKey, staleTime, // 24 hours
suspense, onError, onSettled, onSuccess, }?: UseEnsNameArgs & UseEnsNameConfig): UseQueryResult<string | null, Error>;

type UseEnsResolverArgs = Partial<FetchEnsResolverArgs>;
type UseEnsResolverConfig = QueryConfig<FetchEnsResolverResult, Error>;
declare function useEnsResolver({ chainId: chainId_, name, enabled, scopeKey, suspense, onError, onSettled, onSuccess, }?: UseEnsResolverArgs & UseEnsResolverConfig): UseQueryResult<_ethersproject_providers.Resolver | null, Error>;

type UseBlockNumberArgs = Partial<FetchBlockNumberArgs> & {
    /** Function fires when a new block is created */
    onBlock?: (blockNumber: number) => void;
    /** Subscribe to changes */
    watch?: boolean;
};
type UseBlockNumberConfig = QueryConfig<FetchBlockNumberResult, Error>;
declare function useBlockNumber({ cacheTime, chainId: chainId_, enabled, scopeKey, staleTime, suspense, watch, onBlock, onError, onSettled, onSuccess, }?: UseBlockNumberArgs & UseBlockNumberConfig): UseQueryResult<number, Error>;

type UseFeeDataArgs = Partial<FetchFeeDataArgs> & {
    /** Subscribe to changes */
    watch?: boolean;
};
type UseFeedDataConfig = QueryConfig<FetchFeeDataResult, Error>;
declare function useFeeData({ cacheTime, chainId: chainId_, enabled, formatUnits, scopeKey, staleTime, suspense, watch, onError, onSettled, onSuccess, }?: UseFeeDataArgs & UseFeedDataConfig): UseQueryResult<FetchFeeDataResult, Error>;

type UseProviderArgs = Partial<GetProviderArgs>;
declare function useProvider<TProvider extends Provider>({ chainId, }?: UseProviderArgs): TProvider;

type UseWebSocketProviderArgs = Partial<GetWebSocketProviderArgs>;
declare function useWebSocketProvider<TWebSocketProvider extends WebSocketProvider>({ chainId }?: UseWebSocketProviderArgs): _wagmi_core.GetWebSocketProviderResult<TWebSocketProvider>;

type UsePrepareSendTransactionConfig = Partial<PrepareSendTransactionArgs> & QueryConfig<PrepareSendTransactionResult, Error>;
/**
 * @description Hook for preparing a transaction to be sent via [`useSendTransaction`](/docs/hooks/useSendTransaction).
 *
 * Eagerly fetches the parameters required for sending a transaction such as the gas estimate and resolving an ENS address (if required).
 *
 * @example
 * import { useSendTransaction, usePrepareSendTransaction } from 'wagmi'
 *
 * const config = usePrepareSendTransaction({
 *   to: 'moxey.eth',
 *   value: parseEther('1'),
 * })
 * const result = useSendTransaction(config)
 */
declare function usePrepareSendTransaction({ chainId, request, cacheTime, enabled, scopeKey, staleTime, // 24 hours
suspense, onError, onSettled, onSuccess, }?: UsePrepareSendTransactionConfig): Pick<_tanstack_react_query.QueryObserverResult<PrepareSendTransactionResult, Error>, "data" | "error" | "isError" | "isLoading" | "isSuccess" | "isFetched" | "isFetchedAfterMount" | "isFetching" | "isRefetching" | "refetch" | "fetchStatus"> & {
    isIdle: boolean;
    status: "error" | "success" | "loading" | "idle";
    internal: Pick<_tanstack_react_query.QueryObserverResult<unknown, unknown>, "isLoadingError" | "isRefetchError" | "dataUpdatedAt" | "errorUpdatedAt" | "failureCount" | "isPaused" | "isPlaceholderData" | "isPreviousData" | "isStale" | "remove">;
} & {
    config: PrepareSendTransactionResult;
};

type UseSendTransactionArgs = Omit<SendTransactionArgs, 'request' | 'type'> & ({
    /**
     * `recklesslyUnprepared`: Allow to pass through an unprepared `request`. Note: This has
     * [UX pitfalls](https://wagmi.sh/react/prepare-hooks#ux-pitfalls-without-prepare-hooks), it
     * is highly recommended to not use this and instead prepare the request upfront
     * using the `usePrepareSendTransaction` hook.
     *
     * `prepared`: The request has been prepared with parameters required for sending a transaction
     * via the [`usePrepareSendTransaction` hook](https://wagmi.sh/react/prepare-hooks/usePrepareSendTransaction)
     * */
    mode: 'prepared';
    /** The prepared request to send the transaction. */
    request: SendTransactionPreparedRequest['request'] | undefined;
} | {
    mode: 'recklesslyUnprepared';
    /** The unprepared request to send the transaction. */
    request?: SendTransactionUnpreparedRequest['request'];
});
type UseSendTransactionMutationArgs = {
    /**
     * Recklessly pass through an unprepared `request`. Note: This has
     * [UX pitfalls](https://wagmi.sh/react/prepare-hooks#ux-pitfalls-without-prepare-hooks), it is
     * highly recommended to not use this and instead prepare the request upfront
     * using the `usePrepareSendTransaction` hook.
     */
    recklesslySetUnpreparedRequest: SendTransactionUnpreparedRequest['request'];
};
type UseSendTransactionConfig = MutationConfig<SendTransactionResult, Error, SendTransactionArgs>;
type SendTransactionFn = (overrideConfig?: UseSendTransactionMutationArgs) => void;
type SendTransactionAsyncFn = (overrideConfig?: UseSendTransactionMutationArgs) => Promise<SendTransactionResult>;
type MutateFnReturnValue<Args, Fn> = Args extends {
    mode: 'recklesslyUnprepared';
} ? Fn : Fn | undefined;
/**
 * @description Hook for sending a transaction.
 *
 * It is recommended to pair this with the [`usePrepareSendTransaction` hook](/docs/prepare-hooks/usePrepareSendTransaction)
 * to [avoid UX pitfalls](https://wagmi.sh/react/prepare-hooks#ux-pitfalls-without-prepare-hooks).
 *
 * @example
 * import { useSendTransaction, usePrepareSendTransaction } from 'wagmi'
 *
 * const config = usePrepareSendTransaction({
 *   request: {
 *     to: 'moxey.eth',
 *     value: parseEther('1'),
 *   }
 * })
 * const result = useSendTransaction(config)
 */
declare function useSendTransaction<Args extends UseSendTransactionArgs = UseSendTransactionArgs>({ chainId, mode, request, onError, onMutate, onSettled, onSuccess, }: Args & UseSendTransactionConfig): {
    data: SendTransactionResult | undefined;
    error: Error | null;
    isError: boolean;
    isIdle: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    reset: () => void;
    sendTransaction: MutateFnReturnValue<Args, SendTransactionFn>;
    sendTransactionAsync: MutateFnReturnValue<Args, SendTransactionAsyncFn>;
    status: "error" | "success" | "loading" | "idle";
    variables: SendTransactionArgs | undefined;
};

type UseTransactionArgs = Partial<FetchTransactionArgs>;
type UseTransactionConfig = QueryConfig<FetchTransactionResult, Error>;
/**
 * @description Fetches transaction for hash
 *
 * @example
 * import { useTransaction } from 'wagmi'
 *
 * const result = useTransaction({
 *  chainId: 1,
 *  hash: '0x...',
 * })
 */
declare function useTransaction({ cacheTime, chainId: chainId_, enabled, hash, scopeKey, staleTime, suspense, onError, onSettled, onSuccess, }?: UseTransactionArgs & UseTransactionConfig): UseQueryResult<_ethersproject_providers.TransactionResponse, Error>;

type UseWaitForTransactionArgs = Partial<WaitForTransactionArgs>;
type UseWaitForTransactionConfig = QueryConfig<WaitForTransactionResult, Error>;
declare function useWaitForTransaction({ chainId: chainId_, confirmations, hash, timeout, cacheTime, enabled, scopeKey, staleTime, suspense, onError, onSpeedUp, onSettled, onSuccess, }?: UseWaitForTransactionArgs & UseWaitForTransactionConfig): UseQueryResult<_ethersproject_providers.TransactionReceipt, Error>;

type UseWatchPendingTransactionsConfig = {
    /** The chain ID to listen on. */
    chainId?: number;
    /** Subscribe to changes */
    enabled?: boolean;
    /** Function fires when a pending transaction enters the mempool. */
    listener: (transaction: Transaction) => void;
};
declare function useWatchPendingTransactions({ chainId: chainId_, enabled, listener, }: UseWatchPendingTransactionsConfig): void;

export { Client, Context, CreateClientConfig, UseContractConfig, UseContractEventConfig, UseContractInfiniteReadsConfig, UseContractReadConfig, UseContractReadsConfig, UseContractWriteConfig, UsePrepareContractWriteConfig, WagmiConfig, WagmiConfigProps, createClient, paginatedIndexesConfig, useAccount, useBalance, useBlockNumber, useChainId, useClient, useConnect, useContract, useContractEvent, useContractInfiniteReads, useContractRead, useContractReads, useContractWrite, useDisconnect, useEnsAddress, useEnsAvatar, useEnsName, useEnsResolver, useFeeData, useInfiniteQuery, useMutation, useNetwork, usePrepareContractWrite, usePrepareSendTransaction, useProvider, useQuery, useQueryClient, useSendTransaction, useSignMessage, useSignTypedData, useSigner, useSwitchNetwork, useToken, useTransaction, useWaitForTransaction, useWatchPendingTransactions, useWebSocketProvider };
