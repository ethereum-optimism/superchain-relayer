import "../chunk-MQXBDTVK.js";

// src/providers/infura.ts
import { providers } from "ethers";
function infuraProvider({
  apiKey,
  priority,
  stallTimeout,
  weight
}) {
  return function(chain) {
    if (!chain.rpcUrls.infura?.http[0])
      return null;
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: { http: [`${chain.rpcUrls.infura?.http[0]}/${apiKey}`] }
        }
      },
      provider: () => {
        const provider = new providers.InfuraProvider(
          {
            chainId: chain.id,
            name: chain.network,
            ensAddress: chain.contracts?.ensRegistry?.address
          },
          apiKey
        );
        return Object.assign(provider, { priority, stallTimeout, weight });
      },
      webSocketProvider: () => new providers.InfuraWebSocketProvider(
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
  infuraProvider
};
