import type { FingerprintJSPro, VisitorData } from '@fingerprintjs/fingerprintjs-pro-spa'
import type { FpjsVisitorQueryData, GetDataOptions } from './types'
import type { Writable } from 'svelte/store'

export type UseGetVisitorDataResult<TExtended extends boolean> = {
  [Key in keyof FpjsVisitorQueryData<TExtended>]: Writable<FpjsVisitorQueryData<TExtended>[Key]>
} & {
  /**
   * Fetches visitor data.
   * */
  getData: (options?: UseVisitorDataOptions<TExtended>) => Promise<VisitorData<TExtended> | undefined>
}

export type UseVisitorDataOptions<TExtended extends boolean> = FingerprintJSPro.GetOptions<TExtended> &
  Partial<GetDataOptions>
