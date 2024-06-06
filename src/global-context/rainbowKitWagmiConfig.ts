import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'
import {
  mainnet,
  optimism,
  zora,
  sepolia,
  fraxtal,
  base,
  baseSepolia,
  zoraSepolia,
  optimismSepolia,
} from 'wagmi/chains'
import { envVars } from '@/envVars'
import {
  ChainIdsToConfigure,
  chainsToConfigure,
} from '@/chain-pairs/supportedChainPairs'
import { Transport } from 'viem'
import { fraxtalSepolia } from '@/chain-pairs/chains/fraxtalSepolia'

const transports = {
  // Mainnet chains
  [mainnet.id]: http(),
  [base.id]: http(),
  [fraxtal.id]: http(),
  [optimism.id]: http(),
  [zora.id]: http(),

  // Sepolia chains
  [sepolia.id]: http(),
  [baseSepolia.id]: http(),
  [fraxtalSepolia.id]: http(),
  [optimismSepolia.id]: http(),
  [zoraSepolia.id]: http(),
} as const satisfies Record<ChainIdsToConfigure, Transport>

export const rainbowKitWagmiConfig = getDefaultConfig({
  appName: 'Superchain Relayer',
  projectId: envVars.VITE_WALLETCONNECT_PROJECT_ID,
  chains: chainsToConfigure,
  transports,
})
