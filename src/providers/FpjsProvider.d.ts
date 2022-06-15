import { SvelteComponentTyped } from 'svelte';
import type { FpjsSvelteOptions } from '../types';
export default class FpjsProvider extends SvelteComponentTyped<
  FpjsProviderProps,
  FpjsProviderEvents,
  FpjsProviderSlots
> {}
declare const _FpjsProviderProps: {
  options: FpjsSvelteOptions;
};
declare const _FpjsProviderEvents: {
  [evt: string]: CustomEvent<any>;
};
declare const _FpjsProviderSlots: {
  default: {};
};
export declare type FpjsProviderProps = typeof _FpjsProviderProps;
export declare type FpjsProviderEvents = typeof _FpjsProviderEvents;
export declare type FpjsProviderSlots = typeof _FpjsProviderSlots;
export {};
