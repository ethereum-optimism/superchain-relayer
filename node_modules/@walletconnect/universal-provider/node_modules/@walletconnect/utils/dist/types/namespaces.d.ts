import { ProposalTypes, SessionTypes } from "@walletconnect/types";
export declare function getAccountsChains(accounts: SessionTypes.Namespace["accounts"]): string[];
export declare function getNamespacesChains(namespaces: SessionTypes.Namespaces): string[];
export declare function getNamespacesMethodsForChainId(namespaces: SessionTypes.Namespaces, chainId: string): string[];
export declare function getNamespacesEventsForChainId(namespaces: SessionTypes.Namespaces, chainId: string): string[];
export declare function getRequiredNamespacesFromNamespaces(namespaces: SessionTypes.Namespaces, caller: string): ProposalTypes.RequiredNamespaces;
//# sourceMappingURL=namespaces.d.ts.map