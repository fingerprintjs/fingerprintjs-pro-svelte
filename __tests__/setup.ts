/* eslint-disable @typescript-eslint/no-explicit-any */

import * as dotenv from 'dotenv';
import { jest } from '@jest/globals';

dotenv.config();

export const init = jest.fn<any>();
export const getVisitorData = jest.fn<any>();
export const clearCache = jest.fn<any>();

jest.mock('@fingerprintjs/fingerprintjs-pro-spa', () => {
  return {
    ...(jest.requireActual('@fingerprintjs/fingerprintjs-pro-spa') as any),
    FpjsClient: jest.fn(() => {
      return {
        init,
        getVisitorData,
        clearCache,
      };
    }),
  };
});
