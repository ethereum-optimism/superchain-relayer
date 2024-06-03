import { SupportedChainPair } from '@/chain-pairs/supportedChainPairs'
import { rainbowKitWagmiConfig } from '@/global-context/rainbowKitWagmiConfig'
import { useWithdrawalMessage } from '@/hooks/useWithdrawalMessage'
import { useMutation } from '@tanstack/react-query'
import { getWalletClient, switchChain } from '@wagmi/core'
import { Hash } from 'viem'
import { walletActionsL1, GetWithdrawalsReturnType } from 'viem/op-stack'
import { useTransactionReceipt } from 'wagmi'

const useWriteFinalizeWithdrawal = () => {
  return useMutation({
    mutationFn: async ({
      chainPair,
      withdrawal,
    }: {
      chainPair: SupportedChainPair
      withdrawal: GetWithdrawalsReturnType[number]
    }) => {
      if (!withdrawal) {
        return
      }

      await switchChain(rainbowKitWagmiConfig, {
        chainId: chainPair.l1Chain.id,
      })

      const walletClient = await getWalletClient(rainbowKitWagmiConfig, {
        chainId: chainPair.l1Chain.id,
      })

      // @ts-ignore TODO fix types for expected chains
      return await walletClient.extend(walletActionsL1()).finalizeWithdrawal({
        withdrawal,
        targetChain: chainPair.l2Chain,
      })
    },
  })
}

export const ReadyToFinalize = ({
  transactionHash,
  chainPair,
}: {
  transactionHash: Hash
  chainPair: SupportedChainPair
}) => {
  const { data: receipt, isLoading } = useTransactionReceipt({
    hash: transactionHash,
    chainId: chainPair.l2Chain.id,
  })

  const withdrawal = useWithdrawalMessage(receipt)

  const { mutate, isPending, error } = useWriteFinalizeWithdrawal()

  const isButtonDisabled = !withdrawal || isLoading || isPending

  return (
    <div>
      <button
        disabled={isButtonDisabled}
        onClick={() => {
          if (!withdrawal) {
            return
          }
          mutate({ chainPair, withdrawal })
        }}
      >
        Finalize
      </button>
    </div>
  )
}
