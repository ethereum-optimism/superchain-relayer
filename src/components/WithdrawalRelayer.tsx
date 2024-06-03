import {
  optimismSepoliaChainPair,
  SupportedChainPair,
  supportedChainPairByL2ChainId,
  supportedChainPairs,
} from '@/chain-pairs/supportedChainPairs'
import { useState } from 'react'
import { Hash } from 'viem'
import { useTransactionReceipt } from 'wagmi'
import { extractWithdrawalMessageLogs } from 'viem/op-stack'
import { useGetWithdrawalStatus } from '@/hooks/useGetWithdrawalStatus'
import { ReadyToProve } from '@/components/withdrawal-status/ReadyToProve'
import { WaitingToProve } from '@/components/withdrawal-status/WaitingToProve'
import { ReadyToFinalize } from '@/components/withdrawal-status/ReadyToFinalize'
import { WaitingToFinalize } from '@/components/withdrawal-status/WaitingToFinalize'
import { Finalized } from '@/components/withdrawal-status/Finalized'

const WithdrawalTransactionStatus = ({
  transactionHash,
  chainPair,
}: {
  transactionHash: Hash
  chainPair: SupportedChainPair
}) => {
  const { data: transactionReceipt, isLoading: isTransactionReceiptLoading } =
    useTransactionReceipt({
      hash: transactionHash,
      chainId: chainPair.l2Chain.id,
    })

  const logs = transactionReceipt
    ? extractWithdrawalMessageLogs(transactionReceipt)
    : []

  const { data: withdrawalStatus, isLoading: isWithdrawalStatusLoading } =
    useGetWithdrawalStatus({
      transactionReceipt,
      chainPair: chainPair,
    })

  if (isTransactionReceiptLoading) {
    return <div>Loading transaction...</div>
  }

  if (!transactionReceipt) {
    return <div>Transaction not found</div>
  }

  if (logs.length === 0) {
    return <div>No withdrawal messages found in transaction</div>
  }

  if (isWithdrawalStatusLoading || !withdrawalStatus) {
    return <div>Loading withdrawal status...</div>
  }

  if (withdrawalStatus === 'waiting-to-prove') {
    return (
      <WaitingToProve transactionHash={transactionHash} chainPair={chainPair} />
    )
  }
  if (withdrawalStatus === 'ready-to-prove') {
    return (
      <div>
        <div>Ready to prove</div>
        <ReadyToProve transactionHash={transactionHash} chainPair={chainPair} />
      </div>
    )
  }

  if (withdrawalStatus === 'waiting-to-finalize') {
    return (
      <WaitingToFinalize
        transactionHash={transactionHash}
        chainPair={chainPair}
      />
    )
  }

  if (withdrawalStatus === 'ready-to-finalize') {
    return (
      <div>
        <div>Ready to finalize</div>
        <ReadyToFinalize
          transactionHash={transactionHash}
          chainPair={chainPair}
        />
      </div>
    )
  }

  return <Finalized />
}

export const WithdrawalRelayer = () => {
  const [selectedChainPair, setSelectedChainPair] =
    useState<SupportedChainPair>(optimismSepoliaChainPair)
  const [withdrawalTransactionHashText, setWithdrawalTransactionHashText] =
    useState<string>('')

  const [selectedTransactionHash, setSelectedTransactionHash] = useState<
    Hash | undefined
  >()

  return (
    <div>
      <h2>Search for your L2 transaction to execute a manual withdrawal:</h2>
      <div>
        <select
          value={selectedChainPair.l2Chain.id}
          onChange={(e) => {
            const chainPair =
              supportedChainPairByL2ChainId[Number(e.target.value)]
            if (chainPair) {
              setSelectedChainPair(chainPair)
            }
          }}
        >
          {supportedChainPairs.map((chainPair) => (
            <option key={chainPair.l2Chain.id} value={chainPair.l2Chain.id}>
              {chainPair.l2Chain.name}
            </option>
          ))}
        </select>
        <input
          placeholder="0xabcdbeef..."
          onChange={(e) => setWithdrawalTransactionHashText(e.target.value)}
          value={withdrawalTransactionHashText}
        />
        <button
          onClick={() => {
            setSelectedTransactionHash(withdrawalTransactionHashText as Hash)
          }}
        >
          Search
        </button>
      </div>

      {selectedTransactionHash && (
        <WithdrawalTransactionStatus
          transactionHash={selectedTransactionHash}
          chainPair={selectedChainPair}
        />
      )}
    </div>
  )
}
