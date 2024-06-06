import { SupportedChainPair } from '@/chain-pairs/supportedChainPairs'
import { useQuery } from '@tanstack/react-query'
import { publicActionsL1 } from 'viem/op-stack'
import { usePublicClient } from 'wagmi'

export const useGetL2Output = ({
  l2BlockNumber,
  chainPair,
}: {
  l2BlockNumber?: bigint
  chainPair: SupportedChainPair
}) => {
  const publicClientL1 = usePublicClient({ chainId: chainPair.l1Chain.id })
  return useQuery({
    enabled: !!publicClientL1 && !!l2BlockNumber,
    queryKey: ['get-l2-output', chainPair.id, l2BlockNumber?.toString()],
    queryFn: async () => {
      if (!publicClientL1 || l2BlockNumber === undefined) {
        return
      }
      return await publicClientL1.extend(publicActionsL1()).getL2Output({
        l2BlockNumber,
        targetChain: chainPair.l2Chain,
      })
    },
  })
}
