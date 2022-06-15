import type { FpjsClient, GetOptions } from '@fingerprintjs/fingerprintjs-pro-spa';
import { ClearCache, GetVisitorData } from './types';

interface ClientMethods {
  clearCache: ClearCache;
  getVisitorData: GetVisitorData;
}

export function makeClientMethods(client: FpjsClient): ClientMethods {
  const initPromise = client.init();

  const getVisitorData: GetVisitorData = async <TExtended extends boolean>(
    agentOptions: GetOptions<TExtended>,
    ignoreCache?: boolean
  ) => {
    if (typeof window === 'undefined') {
      throw new Error('getVisitorData() can only be called in the browser.');
    }

    await initPromise;

    return client.getVisitorData(agentOptions, ignoreCache);
  };

  const clearCache: ClearCache = client.clearCache.bind(client);

  return {
    clearCache,
    getVisitorData,
  };
}
