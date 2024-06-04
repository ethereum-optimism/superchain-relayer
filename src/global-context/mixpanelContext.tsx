import { OverridedMixpanel } from 'mixpanel-browser'
import { createContext, useContext } from 'react'

export const mixpanelContext = createContext<OverridedMixpanel | undefined>(
  undefined,
)

export const MixpanelContextProvider = mixpanelContext.Provider

export function useMixpanel() {
  const mixpanel = useContext(mixpanelContext)
  if (mixpanel === undefined) {
    throw new Error('useMixpanel must be used within a MixpanelProvider')
  }
  return mixpanel
}
