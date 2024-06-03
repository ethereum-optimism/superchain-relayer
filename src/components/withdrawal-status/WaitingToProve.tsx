import { SupportedChainPair } from '@/chain-pairs/supportedChainPairs'
import { useGetTimeToProve } from '@/hooks/useGetTimeToProve'
import { Hash } from 'viem'

const EstimatedRemainingTime = ({
  transactionHash,
  chainPair,
}: {
  transactionHash: Hash
  chainPair: SupportedChainPair
}) => {
  const { data, isLoading } = useGetTimeToProve({
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

export const WaitingToProve = ({
  transactionHash,
  chainPair,
}: {
  transactionHash: Hash
  chainPair: SupportedChainPair
}) => {
  return (
    <div>
      <div>Waiting to prove...</div>
      <EstimatedRemainingTime
        transactionHash={transactionHash}
        chainPair={chainPair}
      />
    </div>
  )
}
