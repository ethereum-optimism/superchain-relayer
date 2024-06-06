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
  optimism,
  optimismSepolia,
  sepolia,
  zora,
  zoraSepolia,
} from 'viem/chains'

export const baseChainPair = defineMainnetChainPair(base)
export const fraxtalChainPair = defineMainnetChainPair(fraxtal)
export const optimismChainPair = defineMainnetChainPair(optimism)
export const zoraChainPair = defineMainnetChainPair(zora)

export const baseSepoliaChainPair = defineSepoliaChainPair(baseSepolia)
export const fraxtalSepoliaChainPair = defineSepoliaChainPair(fraxtalSepolia)
export const optimismSepoliaChainPair = defineSepoliaChainPair(optimismSepolia)
export const zoraSepoliaChainPair = defineSepoliaChainPair(zoraSepolia)

export const supportedMainnetChainPairs = [
  baseChainPair,
  fraxtalChainPair,
  optimismChainPair,
  zoraChainPair,
] as const

export const supportedSepoliaChainPairs = [
  baseSepoliaChainPair,
  fraxtalSepoliaChainPair,
  optimismSepoliaChainPair,
  zoraSepoliaChainPair,
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

export const supportedChainPairByL2ChainId = supportedChainPairs.reduce<
  Record<number, SupportedChainPair>
>((acc, chainPair) => {
  acc[chainPair.l2Chain.id] = chainPair
  return acc
}, {})
