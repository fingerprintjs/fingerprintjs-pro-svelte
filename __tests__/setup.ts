// Shared setup for both Svelte 4 and Svelte 5 test runs.
// Mocks @fingerprint/agent so tests never make real network calls.
import { type MockInstance, vi } from 'vitest'
import '@testing-library/svelte/vitest'
import * as dotenv from 'dotenv'

dotenv.config()

export const mockGet: MockInstance = vi.fn()
export const mockStart: MockInstance = vi.fn(() => ({
  get: mockGet,
}))

vi.mock('@fingerprint/agent', async () => {
  const actual = await vi.importActual('@fingerprint/agent')
  return {
    ...actual,
    start: mockStart,
  }
})
