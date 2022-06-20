import type { VisitorData } from '@fingerprintjs/fingerprintjs-pro-spa';
import type { FpjsVisitorQueryData, GetDataOptions } from './types';
import type { Writable } from 'svelte/store';

export type UseGetVisitorDataResult<TExtended extends boolean> = {
  [Key in keyof FpjsVisitorQueryData<TExtended>]: Writable<FpjsVisitorQueryData<TExtended>[Key]>;
} & {
  /**
   * Fetches visitor data.
   * */
  getData: (options?: GetDataOptions) => Promise<VisitorData<TExtended> | undefined>;
};
