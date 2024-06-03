import { Chain } from 'viem'
import { mainnet, sepolia } from 'viem/chains'

export type ChainPair<TL1Chain extends Chain, TL2Chain extends Chain> = {
  id: `chainPair-${TL1Chain['id']}-${TL2Chain['id']}`
  l1Chain: TL1Chain
  l2Chain: TL2Chain
}

export const defineChainPair = <TL1Chain extends Chain, TL2Chain extends Chain>(
  l1Chain: TL1Chain,
  l2Chain: TL2Chain,
): ChainPair<TL1Chain, TL2Chain> => {
  return {
    id: `chainPair-${l1Chain.id}-${l2Chain.id}`,
    l1Chain,
    l2Chain,
  } as const
}

export const defineMainnetChainPair = <TL2Chain extends Chain>(
  l2Chain: TL2Chain,
) => {
  return defineChainPair(mainnet, l2Chain)
}

export const defineSepoliaChainPair = <TL2Chain extends Chain>(
  l2Chain: TL2Chain,
) => {
  return defineChainPair(sepolia, l2Chain)
}
