import { SupportedChainPair } from '@/chain-pairs/supportedChainPairs'
import { rainbowKitWagmiConfig } from '@/global-context/rainbowKitWagmiConfig'
import { useMutation } from '@tanstack/react-query'
import { getWalletClient, switchChain } from '@wagmi/core'
import { Address, parseAbiItem } from 'viem'
import { walletActionsL1, GetWithdrawalsReturnType } from 'viem/op-stack'

export const useWriteFinalizeWithdrawal = () => {
    return useMutation({
      mutationFn: async ({
        chainPair,
        withdrawal,
        proofSubmitter,
      }: {
        chainPair: SupportedChainPair
        withdrawal: GetWithdrawalsReturnType[number]
        proofSubmitter: Address | undefined
      }) => {
        if (!withdrawal) {
          return
        }
  
        await switchChain(rainbowKitWagmiConfig, { chainId: chainPair.l1Chain.id, })
        const walletClient = await getWalletClient(rainbowKitWagmiConfig, { chainId: chainPair.l1Chain.id, })

        // Legacy OptimismPortal
        if (!proofSubmitter) {
            // @ts-ignore TODO fix types for expected chains
            return await walletClient.extend(walletActionsL1()).finalizeWithdrawal({
                withdrawal,
                targetChain: chainPair.l2Chain,
            })
        }

        // Use the external proof entrypoint
        const portalAddress = chainPair.l2Chain.contracts.portal[chainPair.l1Chain.id].address
        await walletClient.writeContract({
            abi: [parseAbiItem('function finalizeWithdrawalTransactionExternalProof((uint256,address,address,uint256,uint256,bytes),address) external')],
            address: portalAddress,
            functionName: 'finalizeWithdrawalTransactionExternalProof',
            args: [[withdrawal.nonce, withdrawal.sender, withdrawal.target, withdrawal.value, withdrawal.gasLimit, withdrawal.data], proofSubmitter],
        })
      },
    })
  }