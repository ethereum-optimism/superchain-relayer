import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useEffect } from 'react'

import { useMixpanel } from '@/global-context/mixpanelContext'
import { WithdrawalRelayer } from '@/components/WithdrawalRelayer'

import { ExternalLink } from 'lucide-react'

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
    <div className="container max-w-3xl p-4 mx-auto space-y-6">
      <div className="text-2xl font-bold sm:text-3xl">
        Superchain L2 to L1 Message Relayer
      </div>

      <ConnectButton chainStatus={'none'} />

      <WithdrawalRelayer />

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ExternalLink className="w-4 h-4" />
        <a
          href="https://github.com/ethereum-optimism/superchain-relayer"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary hover:underline"
        >
          Share your feedback on the GitHub Repo
        </a>
      </div>
    </div>
  )
}
