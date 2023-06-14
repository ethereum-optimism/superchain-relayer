import "../chunk-MQXBDTVK.js";

// src/providers/alchemy.ts
import { providers } from "ethers";
function alchemyProvider({
  apiKey,
  priority,
  stallTimeout,
  weight
}) {
  return function(chain) {
    if (!chain.rpcUrls.alchemy?.http[0])
      return null;
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: { http: [`${chain.rpcUrls.alchemy?.http[0]}/${apiKey}`] }
        }
      },
      provider: () => {
        const provider = new providers.AlchemyProvider(
          {
            chainId: chain.id,
            name: chain.network,
            ensAddress: chain.contracts?.ensRegistry?.address
          },
          apiKey
        );
        return Object.assign(provider, { priority, stallTimeout, weight });
      },
      webSocketProvider: () => new providers.AlchemyWebSocketProvider(
        {
          chainId: chain.id,
          name: chain.network,
          ensAddress: chain.contracts?.ensRegistry?.address
        },
        apiKey
      )
    };
  };
}
export {
  alchemyProvider
};
