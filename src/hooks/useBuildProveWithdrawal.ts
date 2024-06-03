import {
  SupportedChainPair,
  SupportedL2Chain,
} from '@/chain-pairs/supportedChainPairs'
import { useQuery } from '@tanstack/react-query'
import {
  GetL2OutputReturnType,
  GetWithdrawalsReturnType,
  publicActionsL2,
} from 'viem/op-stack'
import { usePublicClient } from 'wagmi'

export const useBuildProveWithdrawal = ({
  withdrawal,
  output,
  chainPair,
}: {
  withdrawal?: GetWithdrawalsReturnType[number]
  output?: GetL2OutputReturnType
  chainPair: SupportedChainPair
}) => {
  const publicClientL2 = usePublicClient({ chainId: chainPair.l2Chain.id })
  return useQuery({
    enabled: !!publicClientL2 && !!withdrawal && !!output,
    queryKey: [
      'build-prove-withdrawal',
      chainPair.id,
      withdrawal?.withdrawalHash,
      output?.l2BlockNumber.toString(),
    ],
    queryFn: async () => {
      if (!publicClientL2 || !withdrawal || !output) {
        return
      }
      return await publicClientL2
        .extend(publicActionsL2())
        .buildProveWithdrawal<SupportedL2Chain>({
          output,
          withdrawal,
        })
    },
  })
}
