import { useState } from "react";
import { useSigner, useProvider } from "wagmi";
import { CrossChainMessenger, MessageStatus, CrossChainMessage } from '@eth-optimism/sdk';
import { ethers } from 'ethers

const l2Provider = new ethers.providers.JsonRpcProvider('https://mainnet.optimism.io', 10)


function getStatusDescription(status: MessageStatus) {
  switch (status) {
    case MessageStatus.UNCONFIRMED_L1_TO_L2_MESSAGE:
      return "Message is an L1 to L2 message and has not been processed by the L2";
    case MessageStatus.FAILED_L1_TO_L2_MESSAGE:
      return "Message is an L1 to L2 message and the transaction to execute the message failed";
    case MessageStatus.STATE_ROOT_NOT_PUBLISHED:
      return "Message is an L2 to L1 message and no state root has been published yet";
    case MessageStatus.READY_TO_PROVE:
      return "Message is ready to be proved";
    case MessageStatus.IN_CHALLENGE_PERIOD:
      return "Message is a proved L2 to L1 message and is undergoing the challenge period";
    case MessageStatus.READY_FOR_RELAY:
      return "Message is ready to be relayed";
    case MessageStatus.RELAYED:
      return "Message has been relayed";
    default:
      return "Unknown status";
  }
}

export function Relayer() {
  const [value, setValue] = useState("");
  const [messageStatus, setMessageStatus] = useState("");

  const { data: signer } = useSigner();
  const l1Provider = useProvider({ chainId: 1 })
  const l2Provider = useProvider({ chainId: 10 })

  if (!signer) {
    // Handle the case where the signer is not available
    console.error("No signer available");
    return null;
  }

  const fetchMessageStatus = async () => {
    try {
      const messenger = new CrossChainMessenger({
        l1SignerOrProvider: l1Provider, // replace with your L1 provider or signer
        l2SignerOrProvider: l2Provider, // replace with your L2 provider or signer
        l1ChainId: 1, // replace with your L1 chain ID
        l2ChainId: 10, // replace with your L2 chain ID
        bedrock: true,
      });
      // const messages = await messenger.getMessagesByTransaction(value);
      const status = await messenger.getMessageStatus(value);
      setMessageStatus(getStatusDescription(status));
    } catch (error) {
      console.error(error)
      setMessageStatus("Invalid transaction hash");
    }
  }

  const executeMessage = async () => {
    console.log("Execute button pressed. Current message status:", messageStatus);
    if (value) {
      const messenger = new CrossChainMessenger({
        l1SignerOrProvider: signer,
        l2SignerOrProvider: l2Provider,
        l1ChainId: 1,
        l2ChainId: 10,
        bedrock: true,
      });

      if (messageStatus === "Message is ready to be proved") {
        console.log("Proving message...");
        await messenger.proveMessage(value);
        console.log("Message proved.");
      } else if (messageStatus === "Message is ready to be relayed") {
        console.log("Relaying message...");
        await messenger.finalizeMessage(value);
        console.log("Message relayed.");
      }
    }
  }


  const canExecute = messageStatus === "Message is ready to be relayed" || messageStatus === "Message is ready to be proved";

  return (
    <div>
      <h2>Search for your L2 transaction to execute a manual withdrawal:</h2>
      <div>

      </div>
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <button onClick={fetchMessageStatus}>
        Search
      </button>
      <button disabled={!canExecute} onClick={executeMessage}>
        Execute
      </button>
      <div>
        {messageStatus}
      </div>
    </div>
  );
}
