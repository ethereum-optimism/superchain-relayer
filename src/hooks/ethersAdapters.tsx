// Adapters since sdk only uses ethers
// https://wagmi.sh/react/ethers-adapters

import * as React from 'react'
import {
  type PublicClient,
  usePublicClient,
  type WalletClient,
  useWalletClient,
} from 'wagmi'
import { providers } from 'ethers'
import { type HttpTransport } from 'viem'

export function publicClientToProvider(publicClient: PublicClient) {
  const { chain, transport } = publicClient
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }

  if (transport.type === 'fallback') {
    // cross-chain-messenger sdk doesn't support FallbackProvider
    // sdk uses a low level JsonRpcProvider.send function, which FallbackProvider doesn't have
    // so just returning the first defined url as a JsonRpcProvider
    const firstDefinedUrl = (
      transport.transports as ReturnType<HttpTransport>[]
    )
      .map(({ value }) => value?.url)
      .find((url) => !!url)

    return new providers.JsonRpcProvider(firstDefinedUrl, network)
  }

  return new providers.JsonRpcProvider(transport.url, network)
}

/** Hook to convert a viem Public Client to an ethers.js Provider. */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const publicClient = usePublicClient({ chainId })
  return React.useMemo(
    () => publicClientToProvider(publicClient),
    [publicClient],
  )
}

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new providers.Web3Provider(transport, network)
  const signer = provider.getSigner(account.address)
  return signer
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId })
  return React.useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient],
  )
}
