import { SupportedChainPair } from '@/chain-pairs/supportedChainPairs'
import { useWithdrawalMessage } from '@/hooks/useWithdrawalMessage'
import { Address, Hash } from 'viem'
import { useTransactionReceipt } from 'wagmi'

import { useWriteFinalizeWithdrawal } from '@/hooks/useWriteFinalizeWithdrawal'

export const ReadyToFinalize = ({
  transactionHash,
  chainPair,
  proofSubmitter,
}: {
  transactionHash: Hash
  chainPair: SupportedChainPair
  proofSubmitter: Address | undefined
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
          mutate({ chainPair, withdrawal, proofSubmitter })
        }}
      >
        Finalize
      </button>
    </div>
  )
}
