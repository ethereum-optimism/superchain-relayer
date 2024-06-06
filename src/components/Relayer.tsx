import { useState } from 'react'
import { CrossChainMessenger, MessageStatus } from '@eth-optimism/sdk'
import { L1ChainIdByL2ChainId } from '@/constants'
import { useEthersProvider, useEthersSigner } from '@/hooks/ethersAdapters'
import { useMixpanel } from '@/global-context/mixpanelContext'

function getStatusDescription(status: MessageStatus) {
  switch (status) {
    case MessageStatus.UNCONFIRMED_L1_TO_L2_MESSAGE:
      return 'Message is an L1 to L2 message and has not been processed by the L2'
    case MessageStatus.FAILED_L1_TO_L2_MESSAGE:
      return 'Message is an L1 to L2 message and the transaction to execute the message failed'
    case MessageStatus.STATE_ROOT_NOT_PUBLISHED:
      return 'Message is an L2 to L1 message and no state root has been published yet'
    case MessageStatus.READY_TO_PROVE:
      return 'Message is ready to be proved'
    case MessageStatus.IN_CHALLENGE_PERIOD:
      return 'Message is a proved L2 to L1 message and is undergoing the challenge period'
    case MessageStatus.READY_FOR_RELAY:
      return 'Message is ready to be relayed'
    case MessageStatus.RELAYED:
      return 'Message has been relayed'
    default:
      return 'Unknown status'
  }
}

export function Relayer() {
  const [value, setValue] = useState('')
  const [messageStatus, setMessageStatus] = useState<
    { status: string; index: number }[]
  >([])
  const [l2ChainId, setL2ChainId] = useState(10) // Set default L2 Chain ID to OP Mainnet
  const l1ChainId = L1ChainIdByL2ChainId[l2ChainId]
  const [loading, setLoading] = useState(false) // Loading state
  const mixpanel = useMixpanel()
  const handleNetworkChange = (newL2ChainId: number) => {
    setL2ChainId(newL2ChainId)
  }

  const l1Signer = useEthersSigner({ chainId: l1ChainId })
  const l1Provider = useEthersProvider({ chainId: l1ChainId })
  const l2Provider = useEthersProvider({ chainId: l2ChainId })

  if (!l1Signer) {
    // Handle the case where the signer is not available
    console.error('No signer available')
    return null
  }

  const fetchMessageStatus = async () => {
    try {
      setLoading(true) // Set loading state to true
      const messenger = new CrossChainMessenger({
        l1SignerOrProvider: l1Signer, // replace with your L1 provider or signer
        l2SignerOrProvider: l2Provider, // replace with your L2 provider or signer
        l1ChainId: l1ChainId, // replace with your L1 chain ID
        l2ChainId: l2ChainId, // replace with your L2 chain ID
        bedrock: true,
      })
      console.log('L1 chain ID:', l1ChainId)
      console.log('L2 chain ID:', l2ChainId)
      console.log('Value:', value)
      const messages = await messenger.getMessagesByTransaction(value)
      const statuses = await Promise.all(
        messages.map(async (message, index) => {
          const status = await messenger.getMessageStatus(value, index)
          return { status: getStatusDescription(status), index }
        }),
      )
      setMessageStatus(statuses)
      mixpanel.track('fetch-message-status', {
        value,
        statuses,
      })
    } catch (error) {
      console.error(error)
      setMessageStatus([{ status: 'Invalid transaction hash', index: 0 }])
    } finally {
      setLoading(false) // Set loading state to false
    }
  }

  const executeMessage = async () => {
    console.log(
      'Execute button pressed. Current message status:',
      messageStatus,
    )
    if (value) {
      const messenger = new CrossChainMessenger({
        l1SignerOrProvider: l1Signer,
        l2SignerOrProvider: l2Provider,
        l1ChainId: l1ChainId,
        l2ChainId: l2ChainId,
        bedrock: true,
      })

      for (const { status, index } of messageStatus) {
        console.log('Executing message at index:', index)
        if (status === 'Message is ready to be proved') {
          console.log('Proving message...')
          await messenger.proveMessage(value, undefined, index)
          console.log('Message proved.')
          mixpanel.track('message-proved', {
            value,
            status,
            index,
          })
        } else if (status === 'Message is ready to be relayed') {
          console.log('Relaying message...')
          await messenger.finalizeMessage(value, undefined, index)
          console.log('Message relayed.')
          mixpanel.track('message-relayed', {
            value,
            status,
            index,
          })
        }
      }
    }
  }

  const canExecute = messageStatus.some(
    (message) =>
      message.status === 'Message is ready to be relayed' ||
      message.status === 'Message is ready to be proved',
  )

  return (
    <div>
      <h2>Search for your L2 transaction to execute a manual withdrawal:</h2>
      <div>
        <label>
          Select L2 network:
          <select
            value={l2ChainId}
            onChange={(e) => handleNetworkChange(Number(e.target.value))}
          >
            <option value={10}>OP Mainnet</option>
            <option value={7777777}>Zora </option>
            <option value={420}>OP Goerli</option>
            <option value={999}>Zora Testnet </option>
            <option value={84531}> Base Goerli</option>
          </select>
        </label>
      </div>
      <input onChange={(e) => setValue(e.target.value)} value={value} />
      <button onClick={fetchMessageStatus}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      <button disabled={!canExecute} onClick={executeMessage}>
        {loading ? 'Loading...' : 'Execute'}
      </button>
      <div>
        {loading
          ? 'Loading message status...'
          : messageStatus.map((message) => (
              <div key={message.index}>
                Status at index {message.index}: {message.status}
              </div>
            ))}
      </div>
    </div>
  )
}
