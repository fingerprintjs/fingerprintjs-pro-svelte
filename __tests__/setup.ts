import * as dotenv from 'dotenv';

dotenv.config();

export const init = jest.fn();
export const getVisitorData = jest.fn();
export const clearCache = jest.fn();

jest.mock('@fingerprintjs/fingerprintjs-pro-spa', () => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
