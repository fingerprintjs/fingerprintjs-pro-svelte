export type {
  CacheLocation,
  Cacheable,
  ICache,
  LoadOptions,
  VisitorData,
  GetResult,
  ExtendedGetResult,
  GetOptions,
} from '@fingerprintjs/fingerprintjs-pro-spa';
export {
  defaultEndpoint,
  defaultTlsEndpoint,
  defaultScriptUrlPattern,
  LocalStorageCache,
  SessionStorageCache,
  InMemoryCache,
  FingerprintJSPro,
} from '@fingerprintjs/fingerprintjs-pro-spa';

export * from './types';
export * from './symbols';
export * from './useVisitorData';
export * from './useVisitorData.types';

export { default as FpjsProvider, default as default } from './providers/FpjsProvider.svelte';
