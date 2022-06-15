import type { GetOptions, VisitorData } from '@fingerprintjs/fingerprintjs-pro-spa';
import type { FpjsSvelteContext, FpjsSvelteQueryOptions } from './types';
import { writable } from 'svelte/store';
import { getContext, onMount } from 'svelte';
import { FPJS_CONTEXT } from './symbols';
import { UseGetVisitorDataResult } from './useVisitorData.types';

export function useVisitorData<TExtended extends boolean>(
  options: GetOptions<TExtended>,
  { immediate = true }: FpjsSvelteQueryOptions
): UseGetVisitorDataResult<TExtended> {
  const dataValue = writable<VisitorData<TExtended> | undefined>();
  const loadingValue = writable(false);
  const errorValue = writable<Error | undefined>();

  let data: VisitorData<TExtended> | undefined;
  let isLoading = false;
  let error: Error | undefined;

  const context = getContext<FpjsSvelteContext>(FPJS_CONTEXT);

  const getData: UseGetVisitorDataResult<TExtended>['getData'] = async (getDataOptions) => {
    loadingValue.set(true);

    try {
      const result = await context.getVisitorData(options, getDataOptions?.ignoreCache);

      dataValue.set(result);
      errorValue.set(undefined);

      return result;
    } catch (error) {
      dataValue.set(undefined);

      if (error instanceof Error) {
        error.message = `${error.name}: ${error.message}`;
        error.name = 'FPJSAgentError';

        errorValue.set(error);
      }

      return undefined;
    } finally {
      loadingValue.set(false);
    }
  };

  dataValue.subscribe((newData) => {
    data = newData;
  });

  loadingValue.subscribe((newLoading) => {
    isLoading = newLoading;
  });

  errorValue.subscribe((newError) => {
    error = newError;
  });

  onMount(async () => {
    if (immediate) {
      await getData();
    }
  });

  return {
    data,
    error,
    isLoading,
    getData,
  };
}
