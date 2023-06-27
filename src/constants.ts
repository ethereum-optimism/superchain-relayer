import { Chain } from 'viem'
import {
  baseGoerli,
  goerli,
  mainnet,
  optimism,
  optimismGoerli,
  zora,
  zoraTestnet,
} from 'viem/chains'

type L1L2Pair = {
  l1Chain: Chain
  l2Chain: Chain
  l1ChainId: number
  l2ChainId: number
}

const defineL1L2Pair = (l1Chain: Chain, l2Chain: Chain): L1L2Pair => {
  return {
    l1Chain,
    l2Chain,
    l1ChainId: l1Chain.id,
    l2ChainId: l2Chain.id,
  }
}

const l1L2Pairs: L1L2Pair[] = [
  defineL1L2Pair(mainnet, optimism),
  defineL1L2Pair(mainnet, zora),
  defineL1L2Pair(goerli, optimismGoerli),
  defineL1L2Pair(goerli, baseGoerli),
  defineL1L2Pair(goerli, zoraTestnet),
]

export const L1ChainIdByL2ChainId: Record<number, number> = l1L2Pairs.reduce<
  Record<number, number>
>((acc, { l1ChainId, l2ChainId }) => {
  acc[l2ChainId] = l1ChainId
  return acc
}, {})

export const L2ChainIdByL1ChainId: Record<number, number> = l1L2Pairs.reduce<
  Record<number, number>
>((acc, { l1ChainId, l2ChainId }) => {
  acc[l1ChainId] = l2ChainId
  return acc
}, {})
