import { inferSchemas, parseEnv } from 'znv'
import { z } from 'zod'

export const envVars = parseEnv(
  import.meta.env,
  inferSchemas({
    VITE_MIXPANEL_TOKEN: {
      schema: z.string(),
    },
    VITE_ENVIRONMENT: {
      schema: z.enum(['development', 'production']),
    },
    VITE_WALLETCONNECT_PROJECT_ID: {
      schema: z.string(),
    },
  }),
)
