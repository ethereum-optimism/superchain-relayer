import * as React from 'react'
import { OverridedMixpanel } from 'mixpanel-browser'
import { useContext } from 'react'

export const MixpanelContext = React.createContext<
  OverridedMixpanel | undefined
>(undefined)

export function useMixpanel() {
  const mixpanel = useContext(MixpanelContext)
  if (mixpanel === undefined) {
    throw new Error('useMixpane must be used within a MixpanelProvider')
  }
  return mixpanel
}
