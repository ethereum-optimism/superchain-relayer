import { configureChains, createConfig } from 'wagmi'
import {
  mainnet,
  goerli,
  optimism,
  optimismGoerli,
  zora,
  zoraTestnet,
  baseGoerli,
} from 'wagmi/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'

/**
 * Tell wagmi which chains you want to support
 * To add a new chain simply import it and add it here
 * @see https://wagmi.sh/react/providers/configuring-chains
 */
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli, optimism, optimismGoerli, zora, zoraTestnet, baseGoerli],
  [
    /**
     * Uncomment this line to use Alchemy as your provider
     * @see https://wagmi.sh/react/providers/alchemy
     */
    // alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY! }),
    /**
     * Tells wagmi to use the default RPC URL for each chain
     * for some dapps the higher rate limits of Alchemy may be required
     */
    jsonRpcProvider({
      rpc: (chain) => {
        return { http: chain.rpcUrls.default.http[0] }
      },
    }),
  ],
)

/**
 * Export chains to be used by rainbowkit
 * @see https://wagmi.sh/react/providers/configuring-chains
 */
export { chains }

/**
 * Configures wagmi connectors for rainbowkit
 * @see https://www.rainbowkit.com/docs/custom-wallet-list
 * @see https://wagmi.sh/react/connectors
 */
const { connectors } = getDefaultWallets({
  appName: 'Superchain Relayer',
  projectId: '400e116ec5bf693fc9dfb5529f379332',
  chains,
})

/**
 * Creates a singleton wagmi client for the app
 * @see https://wagmi.sh/react/client
 */
export const config = createConfig({
  autoConnect: true,
  connectors: connectors,
  publicClient,
  webSocketPublicClient,
})
