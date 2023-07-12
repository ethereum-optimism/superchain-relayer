import { useState } from 'react'
import { CrossChainMessenger, MessageStatus } from '@eth-optimism/sdk'
import { L1ChainIdByL2ChainId } from '../constants'
import { useEthersProvider, useEthersSigner } from '../hooks/ethersAdapters'

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
  const [indexValue, setIndexValue] = useState<number>(0)
  const [value, setValue] = useState('')
  const [numMessages, setNumMessages] = useState<number>(0)
  const [messageStatus, setMessageStatus] = useState('')
  const [l2ChainId, setL2ChainId] = useState(10) // Set default L2 Chain ID to OP Mainnet
  const l1ChainId = L1ChainIdByL2ChainId[l2ChainId]
  const [loading, setLoading] = useState(false) // Loading state

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
        l1SignerOrProvider: l1Provider, // replace with your L1 provider or signer
        l2SignerOrProvider: l2Provider, // replace with your L2 provider or signer
        l1ChainId: l1ChainId, // replace with your L1 chain ID
        l2ChainId: l2ChainId, // replace with your L2 chain ID
        bedrock: true,
      })
      console.log('L1 chain ID:', l1ChainId)
      console.log('L2 chain ID:', l2ChainId)
      console.log('Value:', value)
      const messages = await messenger.getMessagesByTransaction(value);
      const status = await messenger.getMessageStatus(value)
      setMessageStatus(getStatusDescription(status))
      setNumMessages(messages.length)
    } catch (error) {
      console.error(error)
      setMessageStatus('Invalid transaction hash')
      console.log('Status:', status)
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

      if (messageStatus === 'Message is ready to be proved') {
        console.log('Proving message...')
        await messenger.proveMessage(value)
        console.log('Message proved.')
      } else if (messageStatus === 'Message is ready to be relayed') {
        console.log('Relaying message...')
        await messenger.finalizeMessage(value)
        console.log('Message relayed.')
      }
    }
  }

  const canExecute =
    messageStatus === 'Message is ready to be relayed' ||
    messageStatus === 'Message is ready to be proved'
  

    const renderNumMessages = () => {
      if (loading) {
        return ''
      } else if (numMessages > 1) {
        return 'Number of messages associated with the transaction: ' + numMessages
      } else {
        return ''
      }
    }
  
  
    const renderMessage = () => {
    if (loading) {
      return 'Loading message status...'
    } else if (numMessages < 2 && messageStatus) {
      return 'Message status: '  + messageStatus
    } else if (numMessages > 1 && messageStatus) {
      return 'Message status of message ' + indexValue + ': '  + messageStatus
    } else {
      return ''
    }
  }

  const renderIndex = () => {
    if (loading) {
      return '';
    } else if (numMessages > 1) {
      return (
        <div>
          This transaction has multiple messages associated with it. To check the status of other messages select the index of the index then press search:
          <input
            type="number"
            name="index"
            min="1"
            max={numMessages}
            defaultValue="1"
            onChange={handleIndexChange}
          />
        </div>
      );
    } else {
      return '';
    }
  };
  
  const handleIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= numMessages) {
      setIndexValue(value);
    }
  };

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
            <option value={7777777} disabled>
              Zora Mainnet
            </option>
            <option value={420}>OP Goerli</option>
            <option value={84531} disabled>
              Base Goerli
            </option>
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
      <div>{renderIndex()}</div>
      <div>{renderNumMessages()}</div>
      <div>{renderMessage()}</div>
    </div>
  )
}
