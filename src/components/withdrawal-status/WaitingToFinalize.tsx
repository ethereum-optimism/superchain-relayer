import { SupportedChainPair } from '@/chain-pairs/supportedChainPairs'
import { useGetTimeToFinalize } from '@/hooks/useGetTimeToFinalize'
import { Hash } from 'viem'

const EstimatedRemainingTime = ({
  transactionHash,
  chainPair,
}: {
  transactionHash: Hash
  chainPair: SupportedChainPair
}) => {
  const { data, isLoading } = useGetTimeToFinalize({
    transactionHash,
    chainPair,
  })
  if (!data || isLoading) return <div>Estimated time loading...</div>

  return (
    <div>
      <div>Estimated remaining time</div>
      <div>{data.seconds} seconds</div>
    </div>
  )
}

export const WaitingToFinalize = ({
  transactionHash,
  chainPair,
}: {
  transactionHash: Hash
  chainPair: SupportedChainPair
}) => {
  return (
    <div>
      <div>Waiting to finalize...</div>
      <EstimatedRemainingTime
        transactionHash={transactionHash}
        chainPair={chainPair}
      />
    </div>
  )
}
