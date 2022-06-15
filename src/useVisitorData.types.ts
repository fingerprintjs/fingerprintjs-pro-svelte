import type { VisitorData } from '@fingerprintjs/fingerprintjs-pro-spa';
import type { FpjsVisitorQueryData, GetDataOptions } from './types';

export type UseGetVisitorDataResult<TExtended extends boolean> = FpjsVisitorQueryData<TExtended> & {
  /**
   * Fetches visitor data.
   * */
  getData: (options?: GetDataOptions) => Promise<VisitorData<TExtended> | undefined>;
};
