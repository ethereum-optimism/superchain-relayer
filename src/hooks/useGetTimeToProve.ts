import { SupportedChainPair } from '@/chain-pairs/supportedChainPairs'
import { useQuery } from '@tanstack/react-query'
import { Hash } from 'viem'
import { publicActionsL1 } from 'viem/op-stack'
import { useTransactionReceipt } from 'wagmi'
import { usePublicClient } from 'wagmi'

export const useGetTimeToProve = ({
  transactionHash,
  chainPair,
}: {
  transactionHash: Hash
  chainPair: SupportedChainPair
}) => {
  const { data: receipt } = useTransactionReceipt({
    hash: transactionHash,
    chainId: chainPair.l2Chain.id,
  })

  const l1PublicClient = usePublicClient({ chainId: chainPair.l1Chain.id })

  return useQuery({
    enabled: !!receipt && !!l1PublicClient,
    queryKey: ['get-time-to-prove', chainPair.id, transactionHash],
    queryFn: async () => {
      if (!receipt || !l1PublicClient) return

      return await l1PublicClient.extend(publicActionsL1()).getTimeToProve({
        receipt,
        targetChain: chainPair.l2Chain,
      })
    },
    refetchInterval: 6 * 1000,
  })
}
