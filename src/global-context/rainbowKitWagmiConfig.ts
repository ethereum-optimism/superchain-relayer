import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'
import {
  mainnet,
  goerli,
  optimism,
  optimismGoerli,
  zora,
  zoraTestnet,
  baseGoerli,
} from 'wagmi/chains'
import { envVars } from '@/envVars'

export const rainbowKitWagmiConfig = getDefaultConfig({
  appName: 'Superchain Relayer',
  projectId: envVars.VITE_WALLETCONNECT_PROJECT_ID,
  chains: [
    mainnet,
    goerli,
    optimism,
    optimismGoerli,
    zora,
    zoraTestnet,
    baseGoerli,
  ],
  transports: {
    [mainnet.id]: http(),
    [goerli.id]: http(),
    [optimism.id]: http(),
    [optimismGoerli.id]: http(),
    [zora.id]: http(),
    [zoraTestnet.id]: http(),
    [baseGoerli.id]: http(),
  },
})
