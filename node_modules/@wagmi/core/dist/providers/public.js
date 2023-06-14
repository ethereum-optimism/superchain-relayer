import "../chunk-MQXBDTVK.js";

// src/providers/public.ts
import { providers } from "ethers";
function publicProvider({
  priority,
  stallTimeout,
  weight
} = {}) {
  return function(chain) {
    if (!chain.rpcUrls.default.http[0])
      return null;
    return {
      chain,
      provider: () => {
        const provider = new providers.StaticJsonRpcProvider(
          chain.rpcUrls.default.http[0],
          {
            chainId: chain.id,
            name: chain.network,
            ensAddress: chain.contracts?.ensRegistry?.address
          }
        );
        return Object.assign(provider, { priority, stallTimeout, weight });
      }
    };
  };
}
export {
  publicProvider
};
