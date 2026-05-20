import type { GetOptions, GetResult, StartOptions } from '@fingerprint/agent'

export type FingerprintSvelteOptions = StartOptions

export type GetVisitorData = (options?: GetOptions) => Promise<GetResult>

export interface FingerprintSvelteContext {
  getVisitorData: GetVisitorData
}

export interface FingerprintVisitorQueryData {
  /** True while visitor data is being fetched. */
  isLoading: boolean
  /** True after a successful fetch, resets when a new fetch begins. */
  isFetched: boolean
  /** The most recent successful identification result. */
  data: GetResult | undefined
  /** The error from the most recent failed fetch, if any. */
  error: Error | undefined
}
