import type { GetOptions, GetResult } from '@fingerprint/agent'
import type { FingerprintVisitorQueryData } from './types'
import type { Writable } from 'svelte/store'

export type UseGetVisitorDataResult = {
  [Key in keyof FingerprintVisitorQueryData]: Writable<FingerprintVisitorQueryData[Key]>
} & {
  /** Fetches visitor data. Throws on failure. */
  getData: (options?: GetOptions) => Promise<GetResult>
}

export type UseVisitorDataOptions = GetOptions & {
  /**
   * Determines whether getData() will be called immediately on mount.
   * @default true
   */
  immediate?: boolean
}
