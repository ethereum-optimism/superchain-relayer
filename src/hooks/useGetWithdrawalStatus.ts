import { SupportedChainPair } from '@/chain-pairs/supportedChainPairs'
import { useQuery } from '@tanstack/react-query'
import { TransactionReceipt } from 'viem'
import { usePublicClient } from 'wagmi'
import { publicActionsL1 } from 'viem/op-stack'

export const useGetWithdrawalStatus = ({
  transactionReceipt,
  chainPair,
}: {
  transactionReceipt?: TransactionReceipt
  chainPair: SupportedChainPair
}) => {
  const l1PublicClient = usePublicClient({ chainId: chainPair.l1Chain.id })

  return useQuery({
    enabled: !!transactionReceipt && l1PublicClient !== undefined,
    queryKey: [
      'get-withdrawal-status',
      chainPair.id,
      transactionReceipt?.transactionHash,
    ],
    queryFn: async () => {
      if (!transactionReceipt || !l1PublicClient) {
        return
      }

      const withdrawalStatus = await l1PublicClient
        .extend(publicActionsL1())
        .getWithdrawalStatus({
          receipt: transactionReceipt,
          targetChain: chainPair.l2Chain,
        })

      return withdrawalStatus
    },

    refetchInterval: 6 * 1000,
  })
}
