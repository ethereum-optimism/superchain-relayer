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

import { Search } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

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

  const { status, proofSubmitter } = withdrawalStatus ?? {}

  if (isTransactionReceiptLoading) {
    return (
      <Alert>
        <AlertDescription>Loading transaction...</AlertDescription>
      </Alert>
    )
  }

  if (!transactionReceipt) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Transaction not found</AlertDescription>
      </Alert>
    )
  }

  if (logs.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          No withdrawal messages found in transaction
        </AlertDescription>
      </Alert>
    )
  }

  if (isWithdrawalStatusLoading || !withdrawalStatus) {
    return (
      <Alert>
        <AlertDescription>Loading withdrawal status...</AlertDescription>
      </Alert>
    )
  }

  if (status === 'waiting-to-prove') {
    return (
      <WaitingToProve transactionHash={transactionHash} chainPair={chainPair} />
    )
  }
  if (status === 'ready-to-prove') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ready to Prove</CardTitle>
        </CardHeader>
        <CardContent>
          <ReadyToProve
            transactionHash={transactionHash}
            chainPair={chainPair}
          />
        </CardContent>
      </Card>
    )
  }

  if (status === 'waiting-to-finalize') {
    return (
      <WaitingToFinalize
        transactionHash={transactionHash}
        chainPair={chainPair}
      />
    )
  }

  if (status === 'ready-to-finalize') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ready to Finalize</CardTitle>
        </CardHeader>
        <CardContent>
          <ReadyToFinalize
            transactionHash={transactionHash}
            chainPair={chainPair}
            proofSubmitter={proofSubmitter}
          />
        </CardContent>
      </Card>
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
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            L2 to L1 Withdrawal Relayer
          </CardTitle>
          <CardDescription>
            Search for your L2 transaction to execute a manual withdrawal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Select
              value={selectedChainPair.l2Chain.id.toString()}
              onValueChange={(value) => {
                const chainPair = supportedChainPairByL2ChainId[Number(value)]
                if (chainPair) {
                  setSelectedChainPair(chainPair)
                }
              }}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select L2 Chain" />
              </SelectTrigger>
              <SelectContent>
                {supportedChainPairs.map((chainPair) => (
                  <SelectItem
                    key={chainPair.l2Chain.id}
                    value={chainPair.l2Chain.id.toString()}
                  >
                    {chainPair.l2Chain.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-1 gap-2 font-mono">
              <Input
                placeholder="0xabcdbeef..."
                value={withdrawalTransactionHashText}
                onChange={(e) =>
                  setWithdrawalTransactionHashText(e.target.value)
                }
                className="flex-1"
              />
              <Button
                onClick={() =>
                  setSelectedTransactionHash(
                    withdrawalTransactionHashText as Hash,
                  )
                }
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {selectedTransactionHash && (
            <WithdrawalTransactionStatus
              transactionHash={selectedTransactionHash}
              chainPair={selectedChainPair}
            />
          )}
        </CardContent>
      </Card>
    </>
  )
}
