import {
  defineMainnetChainPair,
  defineSepoliaChainPair,
} from '@/chain-pairs/chainPairs'
import { fraxtalSepolia } from '@/chain-pairs/chains/fraxtalSepolia'
import {
  base,
  baseSepolia,
  fraxtal,
  mainnet,
  mode,
  modeTestnet,
  optimism,
  optimismSepolia,
  sepolia,
  zora,
  zoraSepolia,
} from 'viem/chains'

export const supportedMainnetChainPairs = [
  defineMainnetChainPair(base),
  defineMainnetChainPair(fraxtal),
  defineMainnetChainPair(mode),
  defineMainnetChainPair(optimism),
  defineMainnetChainPair(zora),
] as const

export const supportedSepoliaChainPairs = [
  defineSepoliaChainPair(baseSepolia),
  defineSepoliaChainPair(fraxtalSepolia),
  defineSepoliaChainPair(modeTestnet),
  defineSepoliaChainPair(optimismSepolia),
  defineSepoliaChainPair(zoraSepolia),
] as const

export const supportedChainPairs = [
  ...supportedMainnetChainPairs,
  ...supportedSepoliaChainPairs,
] as const

export const chainsToConfigure = [
  mainnet,
  sepolia,
  ...supportedChainPairs.map(({ l2Chain }) => l2Chain),
] as const

export type ChainToConfigure = (typeof chainsToConfigure)[number]
export type ChainIdsToConfigure = ChainToConfigure['id']

export type SupportedChainPair = (typeof supportedChainPairs)[number]
export type SupportedL2Chain = SupportedChainPair['l2Chain']
export type SupportedL2ChainId = SupportedL2Chain['id']
