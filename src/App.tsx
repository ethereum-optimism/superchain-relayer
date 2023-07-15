import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useEffect } from 'react'

import { Relayer } from './components'
import { useMixpanel } from './utils/mixpanel'

export function App() {
  /**
   * Wagmi hook for getting account information
   * @see https://wagmi.sh/docs/hooks/useAccount
   */
  const { isConnected, address } = useAccount()
  const mixpanel = useMixpanel()
  let didInit = false
  let didConnect = false
  useEffect(() => {
    if (!didInit) {
      didInit = true
      mixpanel.track_pageview()
    }
  }, [])
  useEffect(() => {
    if (isConnected && !didConnect) {
      didConnect = true
      mixpanel.identify(address)
      mixpanel.track('wallet-connect')
    }
  }, [isConnected])

  return (
    <>
      <h1>Superchain L2 to L1 Message Relayer</h1>

      {/** @see https://www.rainbowkit.com/docs/connect-button */}
      <ConnectButton chainStatus="none" />

      {isConnected && (
        <>
          <hr />
          <Relayer />
          <hr />
        </>
      )}
      <div style={{ marginTop: '20px' }}>
        <a
          href="https://github.com/ethereum-optimism/superchain-relayer"
          target="_blank"
          rel="noopener noreferrer"
        >
          Share your feedback on the GitHub Repo
        </a>
      </div>
    </>
  )
}
