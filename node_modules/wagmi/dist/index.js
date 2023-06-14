// src/client.ts
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import {
  createClient as createCoreClient,
  createStorage,
  noopStorage
} from "@wagmi/core";
function createClient({
  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1e3 * 60 * 60 * 24,
        networkMode: "offlineFirst",
        refetchOnWindowFocus: false,
        retry: 0
      },
      mutations: {
        networkMode: "offlineFirst"
      }
    }
  }),
  storage = createStorage({
    storage: typeof window !== "undefined" && window.localStorage ? window.localStorage : noopStorage
  }),
  persister = typeof window !== "undefined" ? createSyncStoragePersister({
    key: "cache",
    storage,
    serialize: (x) => x,
    deserialize: (x) => x
  }) : void 0,
  ...config
}) {
  const client = createCoreClient({
    ...config,
    storage
  });
  if (persister)
    persistQueryClient({
      queryClient,
      persister,
      dehydrateOptions: {
        shouldDehydrateQuery: (query) => query.cacheTime !== 0 && query.queryKey[0].persist !== false
      }
    });
  return Object.assign(client, { queryClient });
}

// src/context.ts
import { QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
var Context = React.createContext(void 0);
var queryClientContext = React.createContext(
  void 0
);
function WagmiConfig({
  children,
  client
}) {
  return React.createElement(Context.Provider, {
    children: React.createElement(QueryClientProvider, {
      children,
      client: client.queryClient,
      context: queryClientContext
    }),
    value: client
  });
}
function useClient() {
  const client = React.useContext(Context);
  if (!client)
    throw new Error(
      [
        "`useClient` must be used within `WagmiConfig`.\n",
        "Read more: https://wagmi.sh/react/WagmiConfig"
      ].join("\n")
    );
  return client;
}

// src/hooks/accounts/useAccount.ts
import { getAccount, getClient } from "@wagmi/core";
import * as React7 from "react";

// src/hooks/utils/query/useBaseQuery.ts
import {
  notifyManager,
  useIsRestoring,
  useQueryClient,
  useQueryErrorResetBoundary
} from "@tanstack/react-query";
import * as React2 from "react";

// src/hooks/utils/useSyncExternalStore.ts
import * as pkg from "use-sync-external-store/shim/index.js";
var useSyncExternalStore2 = pkg.useSyncExternalStore;

// src/hooks/utils/query/utils.ts
function isQueryKey(value) {
  return Array.isArray(value);
}
function parseQueryArgs(arg1, arg2, arg3) {
  if (!isQueryKey(arg1)) {
    return arg1;
  }
  if (typeof arg2 === "function") {
    return { ...arg3, queryKey: arg1, queryFn: arg2 };
  }
  return { ...arg2, queryKey: arg1 };
}
function shouldThrowError(_useErrorBoundary, params) {
  if (typeof _useErrorBoundary === "function") {
    return _useErrorBoundary(...params);
  }
  return !!_useErrorBoundary;
}
function trackResult(result, observer) {
  const trackedResult = {};
  Object.keys(result).forEach((key) => {
    Object.defineProperty(trackedResult, key, {
      configurable: false,
      enumerable: true,
      get: () => {
        observer.trackedProps.add(key);
        return result[key];
      }
    });
  });
  return trackedResult;
}

// src/hooks/utils/query/useBaseQuery.ts
function useBaseQuery(options, Observer) {
  const queryClient = useQueryClient({ context: options.context });
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const defaultedOptions = queryClient.defaultQueryOptions(options);
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  if (defaultedOptions.onError) {
    defaultedOptions.onError = notifyManager.batchCalls(
      defaultedOptions.onError
    );
  }
  if (defaultedOptions.onSuccess) {
    defaultedOptions.onSuccess = notifyManager.batchCalls(
      defaultedOptions.onSuccess
    );
  }
  if (defaultedOptions.onSettled) {
    defaultedOptions.onSettled = notifyManager.batchCalls(
      defaultedOptions.onSettled
    );
  }
  if (defaultedOptions.suspense) {
    if (typeof defaultedOptions.staleTime !== "number") {
      defaultedOptions.staleTime = 1e3;
    }
  }
  if (defaultedOptions.suspense || defaultedOptions.useErrorBoundary) {
    if (!errorResetBoundary.isReset()) {
      defaultedOptions.retryOnMount = false;
    }
  }
  const [observer] = React2.useState(
    () => new Observer(
      queryClient,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  useSyncExternalStore2(
    React2.useCallback(
      (onStoreChange) => isRestoring ? () => void 0 : observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer, isRestoring]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  React2.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
  React2.useEffect(() => {
    observer.setOptions(defaultedOptions, { listeners: false });
  }, [defaultedOptions, observer]);
  if (defaultedOptions.suspense && result.isLoading && result.isFetching && !isRestoring) {
    throw observer.fetchOptimistic(defaultedOptions).then(({ data }) => {
      defaultedOptions.onSuccess?.(data);
      defaultedOptions.onSettled?.(data, null);
    }).catch((error) => {
      errorResetBoundary.clearReset();
      defaultedOptions.onError?.(error);
      defaultedOptions.onSettled?.(void 0, error);
    });
  }
  if (result.isError && !errorResetBoundary.isReset() && !result.isFetching && shouldThrowError(defaultedOptions.useErrorBoundary, [
    result.error,
    observer.getCurrentQuery()
  ])) {
    throw result.error;
  }
  const status = result.status === "loading" && result.fetchStatus === "idle" ? "idle" : result.status;
  const isIdle = status === "idle";
  const isLoading = status === "loading" && result.fetchStatus === "fetching";
  return {
    ...result,
    defaultedOptions,
    isIdle,
    isLoading,
    observer,
    status
  };
}

// src/hooks/utils/query/useInfiniteQuery.ts
import { InfiniteQueryObserver } from "@tanstack/react-query";
function useInfiniteQuery(arg1, arg2, arg3) {
  const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
  const baseQuery = useBaseQuery(
    { context: queryClientContext, ...parsedOptions },
    InfiniteQueryObserver
  );
  const result = {
    data: baseQuery.data,
    error: baseQuery.error,
    fetchNextPage: baseQuery.fetchNextPage,
    fetchStatus: baseQuery.fetchStatus,
    hasNextPage: baseQuery.hasNextPage,
    isError: baseQuery.isError,
    isFetched: baseQuery.isFetched,
    isFetchedAfterMount: baseQuery.isFetchedAfterMount,
    isFetching: baseQuery.isFetching,
    isFetchingNextPage: baseQuery.isFetchingNextPage,
    isIdle: baseQuery.isIdle,
    isLoading: baseQuery.isLoading,
    isRefetching: baseQuery.isRefetching,
    isSuccess: baseQuery.isSuccess,
    refetch: baseQuery.refetch,
    status: baseQuery.status,
    internal: {
      dataUpdatedAt: baseQuery.dataUpdatedAt,
      errorUpdatedAt: baseQuery.errorUpdatedAt,
      failureCount: baseQuery.failureCount,
      isFetchedAfterMount: baseQuery.isFetchedAfterMount,
      isLoadingError: baseQuery.isLoadingError,
      isPaused: baseQuery.isPaused,
      isPlaceholderData: baseQuery.isPlaceholderData,
      isPreviousData: baseQuery.isPreviousData,
      isRefetchError: baseQuery.isRefetchError,
      isStale: baseQuery.isStale,
      remove: baseQuery.remove
    }
  };
  return !baseQuery.defaultedOptions.notifyOnChangeProps ? trackResult(result, baseQuery.observer) : result;
}

// src/hooks/utils/query/useMutation.ts
import {
  parseMutationArgs,
  useMutation as useMutation_
} from "@tanstack/react-query";
function useMutation(arg1, arg2, arg3) {
  const options = parseMutationArgs(arg1, arg2, arg3);
  return useMutation_({ context: queryClientContext, ...options });
}

// src/hooks/utils/query/useQuery.ts
import { QueryObserver } from "@tanstack/react-query";
function useQuery(arg1, arg2, arg3) {
  const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
  const baseQuery = useBaseQuery({ context: queryClientContext, ...parsedOptions }, QueryObserver);
  const result = {
    data: baseQuery.data,
    error: baseQuery.error,
    fetchStatus: baseQuery.fetchStatus,
    isError: baseQuery.isError,
    isFetched: baseQuery.isFetched,
    isFetchedAfterMount: baseQuery.isFetchedAfterMount,
    isFetching: baseQuery.isFetching,
    isIdle: baseQuery.isIdle,
    isLoading: baseQuery.isLoading,
    isRefetching: baseQuery.isRefetching,
    isSuccess: baseQuery.isSuccess,
    refetch: baseQuery.refetch,
    status: baseQuery.status,
    internal: {
      dataUpdatedAt: baseQuery.dataUpdatedAt,
      errorUpdatedAt: baseQuery.errorUpdatedAt,
      failureCount: baseQuery.failureCount,
      isFetchedAfterMount: baseQuery.isFetchedAfterMount,
      isLoadingError: baseQuery.isLoadingError,
      isPaused: baseQuery.isPaused,
      isPlaceholderData: baseQuery.isPlaceholderData,
      isPreviousData: baseQuery.isPreviousData,
      isRefetchError: baseQuery.isRefetchError,
      isStale: baseQuery.isStale,
      remove: baseQuery.remove
    }
  };
  return !baseQuery.defaultedOptions.notifyOnChangeProps ? trackResult(result, baseQuery.observer) : result;
}

// src/hooks/utils/query/useQueryClient.ts
import { useQueryClient as useQueryClient_ } from "@tanstack/react-query";
var useQueryClient2 = () => useQueryClient_({ context: queryClientContext });

// src/hooks/providers/useProvider.ts
import { getProvider, watchProvider } from "@wagmi/core";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/shim/with-selector.js";
function useProvider({
  chainId
} = {}) {
  return useSyncExternalStoreWithSelector(
    (cb) => watchProvider({ chainId }, cb),
    () => getProvider({ chainId }),
    () => getProvider({ chainId }),
    (x) => x,
    (a, b) => a.network.chainId === b.network.chainId
  );
}

// src/hooks/providers/useWebSocketProvider.ts
import { getWebSocketProvider, watchWebSocketProvider } from "@wagmi/core";
import { useSyncExternalStoreWithSelector as useSyncExternalStoreWithSelector2 } from "use-sync-external-store/shim/with-selector.js";
function useWebSocketProvider({ chainId } = {}) {
  return useSyncExternalStoreWithSelector2(
    (cb) => watchWebSocketProvider({ chainId }, cb),
    () => getWebSocketProvider({ chainId }),
    () => getWebSocketProvider({ chainId }),
    (x) => x,
    (a, b) => a?.network.chainId === b?.network.chainId
  );
}

// src/hooks/utils/useChainId.ts
function useChainId({ chainId } = {}) {
  const provider = useProvider({ chainId });
  return provider.network.chainId;
}

// src/hooks/utils/useForceUpdate.ts
import * as React3 from "react";
function useForceUpdate() {
  const [, forceUpdate] = React3.useReducer((x) => x + 1, 0);
  return forceUpdate;
}

// src/hooks/network-status/useBlockNumber.ts
import { fetchBlockNumber } from "@wagmi/core";
import { debounce } from "@wagmi/core/internal";
import * as React4 from "react";
function queryKey({ chainId, scopeKey }) {
  return [{ entity: "blockNumber", chainId, scopeKey }];
}
function queryFn({
  queryKey: [{ chainId }]
}) {
  return fetchBlockNumber({ chainId });
}
function useBlockNumber({
  cacheTime = 0,
  chainId: chainId_,
  enabled = true,
  scopeKey,
  staleTime,
  suspense,
  watch = false,
  onBlock,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const chainId = useChainId({ chainId: chainId_ });
  const provider = useProvider({ chainId });
  const webSocketProvider = useWebSocketProvider({ chainId });
  const queryClient = useQueryClient2();
  React4.useEffect(() => {
    if (!enabled)
      return;
    if (!watch && !onBlock)
      return;
    const listener = debounce((blockNumber) => {
      if (watch)
        queryClient.setQueryData(queryKey({ chainId, scopeKey }), blockNumber);
      if (onBlock)
        onBlock(blockNumber);
    }, 1);
    const provider_ = webSocketProvider ?? provider;
    provider_.on("block", listener);
    return () => {
      provider_.off("block", listener);
    };
  }, [
    chainId,
    scopeKey,
    onBlock,
    provider,
    queryClient,
    watch,
    webSocketProvider,
    enabled
  ]);
  return useQuery(queryKey({ scopeKey, chainId }), queryFn, {
    cacheTime,
    enabled,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess
  });
}

// src/hooks/network-status/useFeeData.ts
import { fetchFeeData } from "@wagmi/core";
import * as React5 from "react";
function queryKey2({
  chainId,
  formatUnits,
  scopeKey
}) {
  return [{ entity: "feeData", chainId, formatUnits, scopeKey }];
}
function queryFn2({
  queryKey: [{ chainId, formatUnits }]
}) {
  return fetchFeeData({ chainId, formatUnits });
}
function useFeeData({
  cacheTime,
  chainId: chainId_,
  enabled = true,
  formatUnits = "wei",
  scopeKey,
  staleTime,
  suspense,
  watch,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const chainId = useChainId({ chainId: chainId_ });
  const queryKey_ = React5.useMemo(
    () => queryKey2({
      chainId,
      formatUnits,
      scopeKey
    }),
    [chainId, formatUnits, scopeKey]
  );
  const feeDataQuery = useQuery(queryKey_, queryFn2, {
    cacheTime,
    enabled,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess
  });
  useInvalidateOnBlock({
    chainId,
    enabled: Boolean(enabled && watch),
    queryKey: queryKey_
  });
  return feeDataQuery;
}

// src/hooks/utils/useInvalidateOnBlock.ts
function useInvalidateOnBlock({
  chainId,
  enabled,
  queryKey: queryKey17
}) {
  const queryClient = useQueryClient2();
  useBlockNumber({
    chainId,
    enabled,
    onBlock: enabled ? () => queryClient.invalidateQueries(queryKey17) : void 0,
    scopeKey: enabled ? void 0 : "idle"
  });
}

// src/hooks/utils/useSyncExternalStoreWithTracked.ts
import { deepEqual } from "@wagmi/core";
import * as React6 from "react";
import { useSyncExternalStoreWithSelector as useSyncExternalStoreWithSelector3 } from "use-sync-external-store/shim/with-selector.js";
var isPlainObject = (obj) => typeof obj === "object" && !Array.isArray(obj);
function useSyncExternalStoreWithTracked(subscribe, getSnapshot, getServerSnapshot = getSnapshot, isEqual = deepEqual) {
  const trackedKeys = React6.useRef([]);
  const result = useSyncExternalStoreWithSelector3(
    subscribe,
    getSnapshot,
    getServerSnapshot,
    (x) => x,
    (a, b) => {
      if (isPlainObject(a) && isPlainObject(b) && trackedKeys.current.length) {
        for (const key of trackedKeys.current) {
          const equal = isEqual(
            a[key],
            b[key]
          );
          if (!equal)
            return false;
        }
        return true;
      }
      return isEqual(a, b);
    }
  );
  if (isPlainObject(result)) {
    const trackedResult = { ...result };
    Object.defineProperties(
      trackedResult,
      Object.entries(trackedResult).reduce(
        (res, [key, value]) => {
          return {
            ...res,
            [key]: {
              configurable: false,
              enumerable: true,
              get: () => {
                if (!trackedKeys.current.includes(key)) {
                  trackedKeys.current.push(key);
                }
                return value;
              }
            }
          };
        },
        {}
      )
    );
    return trackedResult;
  }
  return result;
}

// src/hooks/accounts/useAccount.ts
function useAccount({ onConnect, onDisconnect } = {}) {
  const watchAccount = React7.useCallback(
    (callback) => {
      const client = getClient();
      const unsubscribe = client.subscribe(
        (state) => ({
          address: state.data?.account,
          connector: state.connector,
          status: state.status
        }),
        (curr, prev) => {
          if (!!onConnect && prev.status !== "connected" && curr.status === "connected")
            onConnect({
              address: curr.address,
              connector: curr.connector,
              isReconnected: prev.status === "reconnecting"
            });
          if (!!onDisconnect && prev.status === "connected" && curr.status === "disconnected")
            onDisconnect();
          return callback(getAccount());
        }
      );
      return unsubscribe;
    },
    [onConnect, onDisconnect]
  );
  const account = useSyncExternalStoreWithTracked(watchAccount, getAccount);
  const previousStatusRef = React7.useRef();
  const { address, connector, status } = account;
  React7.useEffect(() => {
    if (!!onConnect && previousStatusRef.current === void 0 && status === "connected")
      onConnect({ address, connector, isReconnected: true });
    previousStatusRef.current = status;
  }, []);
  return account;
}

// src/hooks/accounts/useBalance.ts
import { fetchBalance } from "@wagmi/core";
import * as React8 from "react";
function queryKey3({
  address,
  chainId,
  formatUnits,
  scopeKey,
  token
}) {
  return [
    {
      entity: "balance",
      address,
      chainId,
      formatUnits,
      scopeKey,
      token
    }
  ];
}
function queryFn3({
  queryKey: [{ address, chainId, formatUnits, token }]
}) {
  if (!address)
    throw new Error("address is required");
  return fetchBalance({ address, chainId, formatUnits, token });
}
function useBalance({
  address,
  cacheTime,
  chainId: chainId_,
  enabled = true,
  formatUnits,
  scopeKey,
  staleTime,
  suspense,
  token,
  watch,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const chainId = useChainId({ chainId: chainId_ });
  const queryKey_ = React8.useMemo(
    () => queryKey3({ address, chainId, formatUnits, scopeKey, token }),
    [address, chainId, formatUnits, scopeKey, token]
  );
  const balanceQuery = useQuery(queryKey_, queryFn3, {
    cacheTime,
    enabled: Boolean(enabled && address),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess
  });
  useInvalidateOnBlock({
    chainId,
    enabled: Boolean(enabled && watch && address),
    queryKey: queryKey_
  });
  return balanceQuery;
}

// src/hooks/accounts/useConnect.ts
import { connect } from "@wagmi/core";
import * as React9 from "react";
var mutationKey = (args) => [{ entity: "connect", ...args }];
var mutationFn = (args) => {
  const { connector, chainId } = args;
  if (!connector)
    throw new Error("connector is required");
  return connect({ connector, chainId });
};
function useConnect({
  chainId,
  connector,
  onError,
  onMutate,
  onSettled,
  onSuccess
} = {}) {
  const client = useClient();
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables
  } = useMutation(mutationKey({ connector, chainId }), mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess
  });
  const connect2 = React9.useCallback(
    (args) => {
      return mutate({
        chainId: args?.chainId ?? chainId,
        connector: args?.connector ?? connector
      });
    },
    [chainId, connector, mutate]
  );
  const connectAsync = React9.useCallback(
    (args) => {
      return mutateAsync({
        chainId: args?.chainId ?? chainId,
        connector: args?.connector ?? connector
      });
    },
    [chainId, connector, mutateAsync]
  );
  return {
    connect: connect2,
    connectAsync,
    connectors: client.connectors,
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    pendingConnector: variables?.connector,
    reset,
    status,
    variables
  };
}

// src/hooks/accounts/useDisconnect.ts
import { disconnect } from "@wagmi/core";
var mutationKey2 = [{ entity: "disconnect" }];
var mutationFn2 = () => disconnect();
function useDisconnect({
  onError,
  onMutate,
  onSettled,
  onSuccess
} = {}) {
  const {
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate: disconnect2,
    mutateAsync: disconnectAsync,
    reset,
    status
  } = useMutation(mutationKey2, mutationFn2, {
    ...onError ? {
      onError(error2, _variables, context) {
        onError(error2, context);
      }
    } : {},
    onMutate,
    ...onSettled ? {
      onSettled(_data, error2, _variables, context) {
        onSettled(error2, context);
      }
    } : {},
    ...onSuccess ? {
      onSuccess(_data, _variables, context) {
        onSuccess(context);
      }
    } : {}
  });
  return {
    disconnect: disconnect2,
    disconnectAsync,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    status
  };
}

// src/hooks/accounts/useNetwork.ts
import { getNetwork, watchNetwork } from "@wagmi/core";
function useNetwork() {
  return useSyncExternalStoreWithTracked(watchNetwork, getNetwork);
}

// src/hooks/accounts/useSigner.ts
import { fetchSigner, watchSigner } from "@wagmi/core";
import * as React10 from "react";
function queryKey4({ chainId }) {
  return [{ entity: "signer", chainId, persist: false }];
}
function queryFn4({
  queryKey: [{ chainId }]
}) {
  return fetchSigner({ chainId });
}
function useSigner({
  chainId: chainId_,
  suspense,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const { connector } = useAccount();
  const chainId = useChainId({ chainId: chainId_ });
  const signerQuery = useQuery(queryKey4({ chainId }), queryFn4, {
    cacheTime: 0,
    enabled: Boolean(connector),
    staleTime: Infinity,
    suspense,
    onError,
    onSettled,
    onSuccess
  });
  const queryClient = useQueryClient2();
  React10.useEffect(() => {
    const unwatch = watchSigner({ chainId }, (signer) => {
      if (signer)
        queryClient.invalidateQueries(queryKey4({ chainId }));
      else
        queryClient.removeQueries(queryKey4({ chainId }));
    });
    return unwatch;
  }, [queryClient, chainId]);
  return signerQuery;
}

// src/hooks/accounts/useSignMessage.ts
import { signMessage } from "@wagmi/core";
import * as React11 from "react";
var mutationKey3 = (args) => [{ entity: "signMessage", ...args }];
var mutationFn3 = (args) => {
  const { message } = args;
  if (!message)
    throw new Error("message is required");
  return signMessage({ message });
};
function useSignMessage({
  message,
  onError,
  onMutate,
  onSettled,
  onSuccess
} = {}) {
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables
  } = useMutation(mutationKey3({ message }), mutationFn3, {
    onError,
    onMutate,
    onSettled,
    onSuccess
  });
  const signMessage2 = React11.useCallback(
    (args) => mutate(args || { message }),
    [message, mutate]
  );
  const signMessageAsync = React11.useCallback(
    (args) => mutateAsync(args || { message }),
    [message, mutateAsync]
  );
  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    signMessage: signMessage2,
    signMessageAsync,
    status,
    variables
  };
}

// src/hooks/accounts/useSignTypedData.ts
import { signTypedData } from "@wagmi/core";
import * as React12 from "react";
function mutationKey4({ domain, types, value }) {
  return [{ entity: "signTypedData", domain, types, value }];
}
function mutationFn4(args) {
  const { domain, types, value } = args;
  if (!domain)
    throw new Error("domain is required");
  if (!types)
    throw new Error("types is required");
  if (!value)
    throw new Error("value is required");
  return signTypedData({
    domain,
    types,
    value
  });
}
function useSignTypedData({
  domain,
  types,
  value,
  onError,
  onMutate,
  onSettled,
  onSuccess
} = {}) {
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables
  } = useMutation(
    mutationKey4({
      domain,
      types,
      value
    }),
    mutationFn4,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess
    }
  );
  const signTypedData2 = React12.useCallback(
    (args) => mutate({
      domain: args?.domain ?? domain,
      types: args?.types ?? types,
      value: args?.value ?? value
    }),
    [domain, types, value, mutate]
  );
  const signTypedDataAsync = React12.useCallback(
    (args) => mutateAsync({
      domain: args?.domain ?? domain,
      types: args?.types ?? types,
      value: args?.value ?? value
    }),
    [domain, types, value, mutateAsync]
  );
  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    signTypedData: signTypedData2,
    signTypedDataAsync,
    status,
    variables
  };
}

// src/hooks/accounts/useSwitchNetwork.ts
import { switchNetwork } from "@wagmi/core";
import * as React13 from "react";
var mutationKey5 = (args) => [{ entity: "switchNetwork", ...args }];
var mutationFn5 = (args) => {
  const { chainId } = args;
  if (!chainId)
    throw new Error("chainId is required");
  return switchNetwork({ chainId });
};
function useSwitchNetwork({
  chainId,
  throwForSwitchChainNotSupported,
  onError,
  onMutate,
  onSettled,
  onSuccess
} = {}) {
  const client = useClient();
  const forceUpdate = useForceUpdate();
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables
  } = useMutation(mutationKey5({ chainId }), mutationFn5, {
    onError,
    onMutate,
    onSettled,
    onSuccess
  });
  const switchNetwork_ = React13.useCallback(
    (chainId_) => mutate({ chainId: chainId_ ?? chainId }),
    [chainId, mutate]
  );
  const switchNetworkAsync_ = React13.useCallback(
    (chainId_) => mutateAsync({ chainId: chainId_ ?? chainId }),
    [chainId, mutateAsync]
  );
  React13.useEffect(() => {
    const unwatch = client.subscribe(
      ({ chains, connector }) => ({
        chains,
        connector
      }),
      forceUpdate
    );
    return unwatch;
  }, [client, forceUpdate]);
  let switchNetwork2;
  let switchNetworkAsync;
  const supportsSwitchChain = !!client.connector?.switchChain;
  if (throwForSwitchChainNotSupported || supportsSwitchChain) {
    switchNetwork2 = switchNetwork_;
    switchNetworkAsync = switchNetworkAsync_;
  }
  return {
    chains: client.chains ?? [],
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    pendingChainId: variables?.chainId,
    reset,
    status,
    switchNetwork: switchNetwork2,
    switchNetworkAsync,
    variables
  };
}

// src/hooks/contracts/useContract.ts
import { getContract } from "@wagmi/core";
import * as React14 from "react";
function useContract({
  address,
  abi,
  signerOrProvider
} = {}) {
  return React14.useMemo(() => {
    if (!address || !abi)
      return null;
    return getContract({
      address,
      abi,
      signerOrProvider: signerOrProvider === null ? void 0 : signerOrProvider
    });
  }, [address, abi, signerOrProvider]);
}

// src/hooks/contracts/useContractEvent.ts
import * as React15 from "react";
function useContractEvent({
  address,
  chainId,
  abi,
  listener,
  eventName,
  once
} = {}) {
  const provider = useProvider({ chainId });
  const webSocketProvider = useWebSocketProvider({ chainId });
  const contract = useContract({
    address,
    abi,
    signerOrProvider: webSocketProvider ?? provider
  });
  const callbackRef = React15.useRef(listener);
  callbackRef.current = listener;
  React15.useEffect(() => {
    if (!contract || !eventName)
      return;
    const handler = (...event) => callbackRef.current(...event);
    if (once)
      contract.once(eventName, handler);
    else
      contract.on(eventName, handler);
    return () => {
      contract.off(eventName, handler);
    };
  }, [contract, eventName]);
}

// src/hooks/contracts/useContractInfiniteReads.ts
import { replaceEqualDeep } from "@tanstack/react-query";
import { deepEqual as deepEqual2, readContracts } from "@wagmi/core";
import * as React16 from "react";
function queryKey5({
  allowFailure,
  cacheKey,
  overrides,
  scopeKey
}) {
  return [
    {
      entity: "readContractsInfinite",
      allowFailure,
      cacheKey,
      overrides,
      scopeKey
    }
  ];
}
function queryFn5({
  contracts
}) {
  return ({
    queryKey: [{ allowFailure, overrides }],
    pageParam
  }) => {
    return readContracts({
      allowFailure,
      contracts: contracts(pageParam || void 0),
      overrides
    });
  };
}
function useContractInfiniteReads({
  allowFailure,
  cacheKey,
  cacheTime,
  contracts,
  enabled: enabled_ = true,
  getNextPageParam,
  isDataEqual,
  keepPreviousData,
  onError,
  onSettled,
  onSuccess,
  overrides,
  scopeKey,
  select,
  staleTime,
  structuralSharing = (oldData, newData) => deepEqual2(oldData, newData) ? oldData : replaceEqualDeep(oldData, newData),
  suspense
}) {
  const queryKey_ = React16.useMemo(
    () => queryKey5({ allowFailure, cacheKey, overrides, scopeKey }),
    [allowFailure, cacheKey, overrides, scopeKey]
  );
  const enabled = React16.useMemo(() => {
    const enabled2 = Boolean(enabled_ && contracts);
    return enabled2;
  }, [contracts, enabled_]);
  return useInfiniteQuery(queryKey_, queryFn5({ contracts }), {
    cacheTime,
    enabled,
    getNextPageParam,
    isDataEqual,
    keepPreviousData,
    select,
    staleTime,
    structuralSharing,
    suspense,
    onError,
    onSettled,
    onSuccess
  });
}
function paginatedIndexesConfig(fn, {
  perPage,
  start,
  direction
}) {
  const contracts = (page = 0) => [...Array(perPage).keys()].map((index) => {
    return direction === "increment" ? start + index + page * perPage : start - index - page * perPage;
  }).filter((index) => index >= 0).map(fn).flat();
  return {
    contracts,
    getNextPageParam(lastPage, pages) {
      return lastPage?.length === perPage ? pages.length : void 0;
    }
  };
}

// src/hooks/contracts/useContractRead.ts
import { replaceEqualDeep as replaceEqualDeep2 } from "@tanstack/react-query";
import { deepEqual as deepEqual3, parseContractResult, readContract } from "@wagmi/core";
import * as React17 from "react";
function queryKey6({
  address,
  args,
  blockNumber,
  chainId,
  functionName,
  overrides,
  scopeKey
}) {
  return [
    {
      entity: "readContract",
      address,
      args,
      blockNumber,
      chainId,
      functionName,
      overrides,
      scopeKey
    }
  ];
}
function queryFn6({ abi }) {
  return async ({
    queryKey: [{ address, args, chainId, functionName, overrides }]
  }) => {
    if (!abi)
      throw new Error("abi is required");
    if (!address)
      throw new Error("address is required");
    return await readContract({
      address,
      args,
      chainId,
      abi,
      functionName,
      overrides
    }) ?? null;
  };
}
function useContractRead({
  abi,
  address,
  args,
  cacheOnBlock = false,
  cacheTime,
  chainId: chainId_,
  enabled: enabled_ = true,
  functionName,
  isDataEqual,
  onError,
  onSettled,
  onSuccess,
  overrides,
  scopeKey,
  select,
  staleTime,
  structuralSharing = (oldData, newData) => deepEqual3(oldData, newData) ? oldData : replaceEqualDeep2(oldData, newData),
  suspense,
  watch
} = {}) {
  const chainId = useChainId({ chainId: chainId_ });
  const { data: blockNumber } = useBlockNumber({
    chainId,
    enabled: watch || cacheOnBlock,
    scopeKey: watch || cacheOnBlock ? void 0 : "idle",
    watch
  });
  const queryKey_ = React17.useMemo(
    () => queryKey6({
      address,
      args,
      blockNumber: cacheOnBlock ? blockNumber : void 0,
      chainId,
      functionName,
      overrides,
      scopeKey
    }),
    [
      address,
      args,
      blockNumber,
      cacheOnBlock,
      chainId,
      functionName,
      overrides,
      scopeKey
    ]
  );
  const enabled = React17.useMemo(() => {
    let enabled2 = Boolean(enabled_ && abi && address && functionName);
    if (cacheOnBlock)
      enabled2 = Boolean(enabled2 && blockNumber);
    return enabled2;
  }, [abi, address, blockNumber, cacheOnBlock, enabled_, functionName]);
  useInvalidateOnBlock({
    chainId,
    enabled: Boolean(enabled && watch && !cacheOnBlock),
    queryKey: queryKey_
  });
  return useQuery(
    queryKey_,
    queryFn6({
      abi
    }),
    {
      cacheTime,
      enabled,
      isDataEqual,
      select(data) {
        const result = abi && functionName ? parseContractResult({
          abi,
          data,
          functionName
        }) : data;
        return select ? select(result) : result;
      },
      staleTime,
      structuralSharing,
      suspense,
      onError,
      onSettled,
      onSuccess
    }
  );
}

// src/hooks/contracts/useContractReads.ts
import { replaceEqualDeep as replaceEqualDeep3 } from "@tanstack/react-query";
import { deepEqual as deepEqual4, parseContractResult as parseContractResult2, readContracts as readContracts2 } from "@wagmi/core";
import * as React18 from "react";
function queryKey7({
  allowFailure,
  blockNumber,
  chainId,
  contracts,
  overrides,
  scopeKey
}) {
  return [
    {
      entity: "readContracts",
      allowFailure,
      blockNumber,
      chainId,
      scopeKey,
      contracts: (contracts ?? []).map(
        ({ address, args, chainId: chainId2, functionName }) => ({
          address,
          args,
          chainId: chainId2,
          functionName
        })
      ),
      overrides
    }
  ];
}
function queryFn7({ abis }) {
  return ({
    queryKey: [{ allowFailure, contracts: contracts_, overrides }]
  }) => {
    const contracts = contracts_.map(
      (contract, i) => ({
        ...contract,
        abi: abis[i]
      })
    );
    return readContracts2({
      allowFailure,
      contracts,
      overrides
    });
  };
}
function useContractReads({
  allowFailure = true,
  cacheOnBlock = false,
  cacheTime,
  contracts,
  enabled: enabled_ = true,
  isDataEqual,
  keepPreviousData,
  onError,
  onSettled,
  onSuccess,
  overrides,
  scopeKey,
  select,
  staleTime,
  structuralSharing = (oldData, newData) => deepEqual4(oldData, newData) ? oldData : replaceEqualDeep3(oldData, newData),
  suspense,
  watch
} = {}) {
  const { data: blockNumber } = useBlockNumber({
    enabled: watch || cacheOnBlock,
    watch
  });
  const chainId = useChainId();
  const queryKey_ = React18.useMemo(
    () => queryKey7({
      allowFailure,
      blockNumber: cacheOnBlock ? blockNumber : void 0,
      chainId,
      contracts,
      overrides,
      scopeKey
    }),
    [
      allowFailure,
      blockNumber,
      cacheOnBlock,
      chainId,
      scopeKey,
      contracts,
      overrides
    ]
  );
  const enabled = React18.useMemo(() => {
    let enabled2 = Boolean(
      enabled_ && contracts?.every(
        (x) => x.abi && x.address && x.functionName
      )
    );
    if (cacheOnBlock)
      enabled2 = Boolean(enabled2 && blockNumber);
    return enabled2;
  }, [blockNumber, cacheOnBlock, contracts, enabled_]);
  useInvalidateOnBlock({
    enabled: Boolean(enabled && watch && !cacheOnBlock),
    queryKey: queryKey_
  });
  const abis = (contracts ?? []).map(
    ({ abi }) => abi
  );
  return useQuery(queryKey_, queryFn7({ abis }), {
    cacheTime,
    enabled,
    isDataEqual,
    keepPreviousData,
    staleTime,
    select(data) {
      const result = data.map((data2, i) => {
        const { abi, functionName } = contracts?.[i] ?? {};
        return abi && functionName ? parseContractResult2({ abi, functionName, data: data2 }) : data2;
      });
      return select ? select(result) : result;
    },
    structuralSharing,
    suspense,
    onError,
    onSettled,
    onSuccess
  });
}

// src/hooks/contracts/useContractWrite.ts
import { writeContract } from "@wagmi/core";
import * as React19 from "react";
function mutationKey6({
  address,
  chainId,
  abi,
  functionName,
  ...config
}) {
  const { request } = config;
  const { args, overrides } = config;
  return [
    {
      entity: "writeContract",
      address,
      args,
      chainId,
      abi,
      functionName,
      overrides,
      request
    }
  ];
}
function mutationFn6(config) {
  if (!config.address)
    throw new Error("address is required");
  if (!config.abi)
    throw new Error("abi is required");
  if (!config.functionName)
    throw new Error("functionName is required");
  switch (config.mode) {
    case "prepared": {
      if (!config.request)
        throw new Error("request is required");
      return writeContract({
        mode: "prepared",
        address: config.address,
        chainId: config.chainId,
        abi: config.abi,
        functionName: config.functionName,
        request: config.request
      });
    }
    case "recklesslyUnprepared":
      return writeContract({
        address: config.address,
        args: config.args,
        chainId: config.chainId,
        abi: config.abi,
        functionName: config.functionName,
        mode: "recklesslyUnprepared",
        overrides: config.overrides
      });
  }
}
function useContractWrite(config = {}) {
  const { address, abi, functionName, chainId, mode } = config;
  const { request } = config;
  const { args, overrides } = config;
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables
  } = useMutation(
    mutationKey6({
      address,
      abi,
      functionName,
      chainId,
      mode,
      args,
      overrides,
      request
    }),
    mutationFn6,
    {
      onError: config.onError,
      onMutate: config.onMutate,
      onSettled: config.onSettled,
      onSuccess: config.onSuccess
    }
  );
  const write = React19.useMemo(() => {
    if (mode === "prepared") {
      if (!request)
        return void 0;
      return () => mutate({
        address,
        chainId,
        abi,
        functionName,
        mode: "prepared",
        request
      });
    }
    return (overrideConfig) => mutate({
      address,
      args: overrideConfig?.recklesslySetUnpreparedArgs ?? args,
      chainId,
      abi,
      functionName,
      mode: "recklesslyUnprepared",
      overrides: overrideConfig?.recklesslySetUnpreparedOverrides ?? overrides
    });
  }, [
    address,
    chainId,
    abi,
    functionName,
    mode,
    mutate,
    args,
    overrides,
    request
  ]);
  const writeAsync = React19.useMemo(() => {
    if (mode === "prepared") {
      if (!request)
        return void 0;
      return () => mutateAsync({
        address,
        chainId,
        abi,
        functionName,
        mode: "prepared",
        request
      });
    }
    return (overrideConfig) => mutateAsync({
      address,
      args: overrideConfig?.recklesslySetUnpreparedArgs ?? args,
      chainId,
      abi,
      functionName,
      mode: "recklesslyUnprepared",
      overrides: overrideConfig?.recklesslySetUnpreparedOverrides ?? overrides
    });
  }, [
    address,
    chainId,
    abi,
    functionName,
    mode,
    mutateAsync,
    args,
    overrides,
    request
  ]);
  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    status,
    variables,
    write,
    writeAsync
  };
}

// src/hooks/contracts/usePrepareContractWrite.ts
import { prepareWriteContract } from "@wagmi/core";
function queryKey8({
  activeChainId,
  args,
  address,
  chainId,
  functionName,
  overrides,
  signerAddress
}) {
  return [
    {
      entity: "prepareContractTransaction",
      activeChainId,
      address,
      args,
      chainId,
      functionName,
      overrides,
      signerAddress
    }
  ];
}
function queryFn8({
  abi,
  signer
}) {
  return ({
    queryKey: [{ args, address, chainId, functionName, overrides }]
  }) => {
    if (!abi)
      throw new Error("abi is required");
    return prepareWriteContract({
      abi,
      args,
      address,
      chainId,
      functionName,
      overrides,
      signer
    });
  };
}
function usePrepareContractWrite({
  address,
  abi,
  functionName,
  chainId,
  args,
  overrides,
  cacheTime,
  enabled = true,
  scopeKey,
  staleTime,
  suspense,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const { chain: activeChain } = useNetwork();
  const { data: signer } = useSigner({ chainId });
  const prepareContractWriteQuery = useQuery(
    queryKey8({
      activeChainId: activeChain?.id,
      address,
      args,
      chainId,
      functionName,
      scopeKey,
      signerAddress: signer?._address,
      overrides
    }),
    queryFn8({
      abi,
      signer
    }),
    {
      cacheTime,
      enabled: Boolean(enabled && abi && address && functionName && signer),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess
    }
  );
  return Object.assign(prepareContractWriteQuery, {
    config: {
      abi,
      address,
      args,
      chainId,
      functionName,
      mode: "prepared",
      overrides,
      request: void 0,
      ...prepareContractWriteQuery.data
    }
  });
}

// src/hooks/contracts/useToken.ts
import { fetchToken } from "@wagmi/core";
function queryKey9({
  address,
  chainId,
  formatUnits,
  scopeKey
}) {
  return [{ entity: "token", address, chainId, formatUnits, scopeKey }];
}
function queryFn9({
  queryKey: [{ address, chainId, formatUnits }]
}) {
  if (!address)
    throw new Error("address is required");
  return fetchToken({ address, chainId, formatUnits });
}
function useToken({
  address,
  chainId: chainId_,
  formatUnits = "ether",
  cacheTime,
  enabled = true,
  scopeKey,
  staleTime = 1e3 * 60 * 60 * 24,
  suspense,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const chainId = useChainId({ chainId: chainId_ });
  return useQuery(
    queryKey9({ address, chainId, formatUnits, scopeKey }),
    queryFn9,
    {
      cacheTime,
      enabled: Boolean(enabled && address),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess
    }
  );
}

// src/hooks/ens/useEnsAddress.ts
import { fetchEnsAddress } from "@wagmi/core";
function queryKey10({ chainId, name, scopeKey }) {
  return [{ entity: "ensAddress", chainId, name, scopeKey }];
}
function queryFn10({
  queryKey: [{ chainId, name }]
}) {
  if (!name)
    throw new Error("name is required");
  return fetchEnsAddress({ chainId, name });
}
function useEnsAddress({
  cacheTime,
  chainId: chainId_,
  enabled = true,
  name,
  scopeKey,
  staleTime = 1e3 * 60 * 60 * 24,
  suspense,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const chainId = useChainId({ chainId: chainId_ });
  return useQuery(queryKey10({ chainId, name, scopeKey }), queryFn10, {
    cacheTime,
    enabled: Boolean(enabled && chainId && name),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess
  });
}

// src/hooks/ens/useEnsAvatar.ts
import { fetchEnsAvatar } from "@wagmi/core";
function queryKey11({
  address,
  chainId,
  scopeKey
}) {
  return [{ entity: "ensAvatar", address, chainId, scopeKey }];
}
function queryFn11({
  queryKey: [{ address, chainId }]
}) {
  if (!address)
    throw new Error("address is required");
  return fetchEnsAvatar({ address, chainId });
}
function useEnsAvatar({
  address,
  cacheTime,
  chainId: chainId_,
  enabled = true,
  scopeKey,
  staleTime = 1e3 * 60 * 60 * 24,
  suspense,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const chainId = useChainId({ chainId: chainId_ });
  return useQuery(queryKey11({ address, chainId, scopeKey }), queryFn11, {
    cacheTime,
    enabled: Boolean(enabled && address && chainId),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess
  });
}

// src/hooks/ens/useEnsName.ts
import { fetchEnsName } from "@wagmi/core";
function queryKey12({
  address,
  chainId,
  scopeKey
}) {
  return [{ entity: "ensName", address, chainId, scopeKey }];
}
function queryFn12({
  queryKey: [{ address, chainId }]
}) {
  if (!address)
    throw new Error("address is required");
  return fetchEnsName({ address, chainId });
}
function useEnsName({
  address,
  cacheTime,
  chainId: chainId_,
  enabled = true,
  scopeKey,
  staleTime = 1e3 * 60 * 60 * 24,
  suspense,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const chainId = useChainId({ chainId: chainId_ });
  return useQuery(queryKey12({ address, chainId, scopeKey }), queryFn12, {
    cacheTime,
    enabled: Boolean(enabled && address && chainId),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess
  });
}

// src/hooks/ens/useEnsResolver.ts
import { fetchEnsResolver } from "@wagmi/core";
function queryKey13({ chainId, name, scopeKey }) {
  return [
    { entity: "ensResolver", chainId, name, scopeKey, persist: false }
  ];
}
function queryFn13({
  queryKey: [{ chainId, name }]
}) {
  if (!name)
    throw new Error("name is required");
  return fetchEnsResolver({ chainId, name });
}
function useEnsResolver({
  chainId: chainId_,
  name,
  enabled = true,
  scopeKey,
  suspense,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const chainId = useChainId({ chainId: chainId_ });
  return useQuery(queryKey13({ chainId, name, scopeKey }), queryFn13, {
    cacheTime: 0,
    enabled: Boolean(enabled && chainId && name),
    suspense,
    onError,
    onSettled,
    onSuccess
  });
}

// src/hooks/transactions/usePrepareSendTransaction.ts
import { prepareSendTransaction } from "@wagmi/core";
function queryKey14({
  activeChainId,
  chainId,
  request,
  scopeKey,
  signerAddress
}) {
  return [
    {
      entity: "prepareSendTransaction",
      activeChainId,
      chainId,
      request,
      scopeKey,
      signerAddress
    }
  ];
}
function queryFn14({ signer }) {
  return ({
    queryKey: [{ chainId, request }]
  }) => {
    if (!request?.to)
      throw new Error("request.to is required");
    return prepareSendTransaction({
      chainId,
      request: { ...request, to: request.to },
      signer
    });
  };
}
function usePrepareSendTransaction({
  chainId,
  request,
  cacheTime,
  enabled = true,
  scopeKey,
  staleTime = 1e3 * 60 * 60 * 24,
  suspense,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const { chain: activeChain } = useNetwork();
  const { data: signer } = useSigner({ chainId });
  const prepareSendTransactionQuery = useQuery(
    queryKey14({
      activeChainId: activeChain?.id,
      chainId,
      request,
      scopeKey,
      signerAddress: signer?._address
    }),
    queryFn14({ signer }),
    {
      cacheTime,
      enabled: Boolean(enabled && signer && request && request.to),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess
    }
  );
  return Object.assign(prepareSendTransactionQuery, {
    config: {
      request: void 0,
      mode: "prepared",
      ...prepareSendTransactionQuery.data
    }
  });
}

// src/hooks/transactions/useSendTransaction.ts
import { sendTransaction } from "@wagmi/core";
import * as React20 from "react";
var mutationKey7 = (args) => [{ entity: "sendTransaction", ...args }];
var mutationFn7 = ({ chainId, mode, request }) => {
  return sendTransaction({
    chainId,
    mode,
    request
  });
};
function useSendTransaction({
  chainId,
  mode,
  request,
  onError,
  onMutate,
  onSettled,
  onSuccess
}) {
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables
  } = useMutation(
    mutationKey7({
      chainId,
      mode,
      request
    }),
    mutationFn7,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess
    }
  );
  const sendTransaction2 = React20.useCallback(
    (args) => mutate({
      chainId,
      mode,
      request: args?.recklesslySetUnpreparedRequest ?? request
    }),
    [chainId, mode, mutate, request]
  );
  const sendTransactionAsync = React20.useCallback(
    (args) => mutateAsync({
      chainId,
      mode,
      request: args?.recklesslySetUnpreparedRequest ?? request
    }),
    [chainId, mode, mutateAsync, request]
  );
  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    sendTransaction: mode === "prepared" && !request ? void 0 : sendTransaction2,
    sendTransactionAsync: mode === "prepared" && !request ? void 0 : sendTransactionAsync,
    status,
    variables
  };
}

// src/hooks/transactions/useTransaction.ts
import { fetchTransaction } from "@wagmi/core";
function queryKey15({ chainId, hash, scopeKey }) {
  return [{ entity: "transaction", chainId, hash, scopeKey }];
}
function queryFn15({
  queryKey: [{ chainId, hash }]
}) {
  if (!hash)
    throw new Error("hash is required");
  return fetchTransaction({ chainId, hash });
}
function useTransaction({
  cacheTime = 0,
  chainId: chainId_,
  enabled = true,
  hash,
  scopeKey,
  staleTime,
  suspense,
  onError,
  onSettled,
  onSuccess
} = {}) {
  const chainId = useChainId({ chainId: chainId_ });
  return useQuery(queryKey15({ chainId, hash, scopeKey }), queryFn15, {
    cacheTime,
    enabled: Boolean(enabled && hash),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess
  });
}

// src/hooks/transactions/useWaitForTransaction.ts
import { waitForTransaction } from "@wagmi/core";
function queryKey16({
  confirmations,
  chainId,
  hash,
  scopeKey,
  timeout
}) {
  return [
    {
      entity: "waitForTransaction",
      confirmations,
      chainId,
      hash,
      scopeKey,
      timeout
    }
  ];
}
function queryFn16({
  onSpeedUp
}) {
  return ({
    queryKey: [{ chainId, confirmations, hash, timeout }]
  }) => {
    if (!hash)
      throw new Error("hash is required");
    return waitForTransaction({
      chainId,
      confirmations,
      hash,
      onSpeedUp,
      timeout
    });
  };
}
function useWaitForTransaction({
  chainId: chainId_,
  confirmations,
  hash,
  timeout,
  cacheTime,
  enabled = true,
  scopeKey,
  staleTime,
  suspense,
  onError,
  onSpeedUp,
  onSettled,
  onSuccess
} = {}) {
  const chainId = useChainId({ chainId: chainId_ });
  return useQuery(
    queryKey16({ chainId, confirmations, hash, scopeKey, timeout }),
    queryFn16({ onSpeedUp }),
    {
      cacheTime,
      enabled: Boolean(enabled && hash),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess
    }
  );
}

// src/hooks/transactions/useWatchPendingTransactions.ts
import * as React21 from "react";
function useWatchPendingTransactions({
  chainId: chainId_,
  enabled = true,
  listener
}) {
  const chainId = useChainId({ chainId: chainId_ });
  const provider = useProvider({ chainId });
  const webSocketProvider = useWebSocketProvider({ chainId });
  React21.useEffect(() => {
    if (!enabled)
      return;
    const provider_ = webSocketProvider ?? provider;
    provider_.on("pending", listener);
    return () => {
      provider_.off("pending", listener);
    };
  }, [enabled, listener, provider, webSocketProvider]);
}

// src/index.ts
import {
  AddChainError,
  ChainDoesNotSupportMulticallError,
  ChainMismatchError,
  ChainNotConfiguredError,
  Connector,
  ConnectorAlreadyConnectedError,
  ConnectorNotFoundError,
  ContractMethodDoesNotExistError,
  ContractMethodNoResultError,
  ContractMethodRevertedError,
  ContractResultDecodeError,
  ProviderChainsNotFound,
  ProviderRpcError,
  ResourceUnavailableError,
  RpcError,
  SwitchChainError,
  SwitchChainNotSupportedError,
  UserRejectedRequestError,
  configureChains,
  createStorage as createStorage2,
  deepEqual as deepEqual5,
  deserialize,
  erc20ABI,
  erc721ABI,
  erc4626ABI,
  goerli,
  mainnet,
  readContracts as readContracts3,
  serialize
} from "@wagmi/core";
export {
  AddChainError,
  ChainDoesNotSupportMulticallError,
  ChainMismatchError,
  ChainNotConfiguredError,
  Connector,
  ConnectorAlreadyConnectedError,
  ConnectorNotFoundError,
  Context,
  ContractMethodDoesNotExistError,
  ContractMethodNoResultError,
  ContractMethodRevertedError,
  ContractResultDecodeError,
  ProviderChainsNotFound,
  ProviderRpcError,
  ResourceUnavailableError,
  RpcError,
  SwitchChainError,
  SwitchChainNotSupportedError,
  UserRejectedRequestError,
  WagmiConfig,
  configureChains,
  createClient,
  createStorage2 as createStorage,
  deepEqual5 as deepEqual,
  deserialize,
  erc20ABI,
  erc4626ABI,
  erc721ABI,
  goerli,
  mainnet,
  paginatedIndexesConfig,
  readContracts3 as readContracts,
  serialize,
  useAccount,
  useBalance,
  useBlockNumber,
  useChainId,
  useClient,
  useConnect,
  useContract,
  useContractEvent,
  useContractInfiniteReads,
  useContractRead,
  useContractReads,
  useContractWrite,
  useDisconnect,
  useEnsAddress,
  useEnsAvatar,
  useEnsName,
  useEnsResolver,
  useFeeData,
  useInfiniteQuery,
  useMutation,
  useNetwork,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useProvider,
  useQuery,
  useQueryClient2 as useQueryClient,
  useSendTransaction,
  useSignMessage,
  useSignTypedData,
  useSigner,
  useSwitchNetwork,
  useToken,
  useTransaction,
  useWaitForTransaction,
  useWatchPendingTransactions,
  useWebSocketProvider
};
