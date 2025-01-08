import { SupportedChainPair } from '@/chain-pairs/supportedChainPairs'
import { useQuery } from '@tanstack/react-query'
import { usePublicClient } from 'wagmi'
import { Address, parseAbiItem, TransactionReceipt } from 'viem'
import { readContract } from 'viem/actions'
import { getPortalVersion, getWithdrawals, publicActionsL1 } from 'viem/op-stack'

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

      // If the status is not waiting to finalize, no further action is deeded
      if (withdrawalStatus != 'ready-to-finalize') {
        return { status: withdrawalStatus, proofSubmitter: undefined }
      }

      // Also nothing else to do if using the legacy OptimismPortal
      const portalAddress = chainPair.l2Chain.contracts.portal[chainPair.l1Chain.id].address
      const portalVersion = await getPortalVersion(l1PublicClient, { chain: chainPair.l1Chain, targetChain: chainPair.l2Chain })
      if (portalVersion.major < 3) {
        return { status: withdrawalStatus, proofSubmitter: undefined }
      }

      const withdrawal = getWithdrawals(transactionReceipt)[0] // relayer doesn't have support for multi withdrawals
      const numProofSubmitters = await readContract(l1PublicClient, {
        abi: [parseAbiItem('function numProofSubmitters(bytes32) external view returns (uint256)')],
        address: portalAddress,
        functionName: 'numProofSubmitters',
        args: [withdrawal.withdrawalHash],
      }).catch(() => 1n)

      // Surface the first submitter that passes checks

      let proofSubmitter: Address | undefined;
      for (let i = 0; i < numProofSubmitters; i++) {
        const submitter = await readContract(l1PublicClient, {
          abi: [parseAbiItem('function proofSubmitters(bytes32,uint256) external view returns (address)')],
          address: portalAddress,
          functionName: 'proofSubmitters',
          args: [withdrawal.withdrawalHash, BigInt(i)],
        }).catch(() => withdrawal.sender)

        const checkedWithdrawalResult = await Promise.allSettled([readContract(l1PublicClient, {
          abi: [parseAbiItem('function checkWithdrawal(bytes32,address) public view')],
          address: portalAddress,
          functionName: 'checkWithdrawal',
          args: [withdrawal.withdrawalHash, submitter],
        })])

        if (checkedWithdrawalResult[0].status !== 'rejected') {
          proofSubmitter = submitter
          break
        }
      }

      if (!proofSubmitter) {
        // Should not reach this branch
        console.error('No valid proof submitter found when viem returned a valid status!!!')
        return { status: 'waiting-to-prove', proofSubmitter: undefined }
      }

      return { status: withdrawalStatus, proofSubmitter }
    },

    refetchInterval: 6 * 1000,
  })
}
