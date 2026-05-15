/* eslint-disable @typescript-eslint/no-explicit-any */

import '@testing-library/svelte/vitest'
import * as dotenv from 'dotenv'
import { vi } from 'vitest'

dotenv.config()

export const init = vi.fn<any>()
export const getVisitorData = vi.fn<any>()
export const clearCache = vi.fn<any>()

vi.mock('@fingerprintjs/fingerprintjs-pro-spa', async () => {
  const actual = await vi.importActual<any>('@fingerprintjs/fingerprintjs-pro-spa')
  return {
    ...actual,
    FpjsClient: vi.fn(() => {
      return {
        init,
        getVisitorData,
        clearCache,
      }
    }),
  }
})
