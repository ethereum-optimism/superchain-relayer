import {
  SupportedChainPair,
  SupportedL2Chain,
} from '@/chain-pairs/supportedChainPairs'
import { rainbowKitWagmiConfig } from '@/global-context/rainbowKitWagmiConfig'
import { useBuildProveWithdrawal } from '@/hooks/useBuildProveWithdrawal'
import { useGetL2Output } from '@/hooks/useGetL2Output'
import { useWithdrawalMessage } from '@/hooks/useWithdrawalMessage'
import { useMutation } from '@tanstack/react-query'
import { getWalletClient, switchChain } from '@wagmi/core'
import { Hash } from 'viem'
import { BuildProveWithdrawalReturnType, walletActionsL1 } from 'viem/op-stack'
import { useTransactionReceipt } from 'wagmi'

const useProveWithdrawalParams = ({
  transactionHash,
  chainPair,
}: {
  transactionHash?: Hash
  chainPair: SupportedChainPair
}) => {
  const { data: receipt } = useTransactionReceipt({
    hash: transactionHash,
    chainId: chainPair.l2Chain.id,
  })

  const { data: l2Output } = useGetL2Output({
    l2BlockNumber: receipt?.blockNumber,
    chainPair,
  })

  const withdrawal = useWithdrawalMessage(receipt)

  return useBuildProveWithdrawal({
    withdrawal,
    output: l2Output,
    chainPair,
  })
}

const useWriteProveWithdrawal = () => {
  return useMutation({
    mutationFn: async ({
      chainPair,
      proveWithdrawalParams,
    }: {
      chainPair: SupportedChainPair
      proveWithdrawalParams: BuildProveWithdrawalReturnType<
        undefined,
        undefined,
        SupportedL2Chain
      >
    }) => {
      if (!proveWithdrawalParams) {
        return
      }

      await switchChain(rainbowKitWagmiConfig, {
        chainId: chainPair.l1Chain.id,
      })

      const walletClient = await getWalletClient(rainbowKitWagmiConfig, {
        chainId: chainPair.l1Chain.id,
      })

      return await walletClient
        .extend(walletActionsL1())
        .proveWithdrawal(proveWithdrawalParams)
    },
  })
}

export const ReadyToProve = ({
  transactionHash,
  chainPair,
}: {
  transactionHash: Hash
  chainPair: SupportedChainPair
}) => {
  const { data: proveWithdrawalParams, isLoading } = useProveWithdrawalParams({
    transactionHash,
    chainPair,
  })

  const { mutate, isPending, error } = useWriteProveWithdrawal()

  const isButtonDisabled = !proveWithdrawalParams || isLoading || isPending

  return (
    <div>
      <button
        disabled={isButtonDisabled}
        onClick={() => {
          if (!proveWithdrawalParams) {
            return
          }
          mutate({ chainPair, proveWithdrawalParams })
        }}
      >
        Prove
      </button>
    </div>
  )
}
