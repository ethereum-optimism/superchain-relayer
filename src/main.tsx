import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import mixpanel from 'mixpanel-browser'

import { App } from './App'
import { chains, config } from './wagmi'
import { MixpanelContext } from './utils/mixpanel'

/**
 * Root providers and initialization of app
 * @see https://reactjs.org/docs/strict-mode.html
 * @see https://wagmi.sh/react/WagmiConfig
 * @see https://www.rainbowkit.com/docs/installation
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  (() => {
    mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN)
    mixpanel.register_once({
      app: 'superchain-relayer',
    })
    if (import.meta.env.DEV) {
      mixpanel.disable()
    }
    return (
      <React.StrictMode>
        <WagmiConfig config={config}>
          <RainbowKitProvider chains={chains}>
            <MixpanelContext.Provider value={mixpanel}>
              <App />
            </MixpanelContext.Provider>
          </RainbowKitProvider>
        </WagmiConfig>
      </React.StrictMode>
    )
  })(),
)
