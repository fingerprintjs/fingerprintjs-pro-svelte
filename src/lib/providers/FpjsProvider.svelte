<script lang="ts">
  import type { FpjsSvelteContext, FpjsSvelteOptions } from '../types';
  import { getOptions } from '../options';
  import { FpjsClient } from '@fingerprintjs/fingerprintjs-pro-spa';
  import { makeClientMethods } from '../client';
  import { setContext } from 'svelte';
  import { FPJS_CONTEXT } from '../symbols';

  export let options: FpjsSvelteOptions;

  if (!options) {
    throw new TypeError('options are missing. Did you forget to pass props to provider?');
  }

  if (typeof window !== 'undefined') {
    const parsedOptions = getOptions(options);
    const client = new FpjsClient(parsedOptions);

    const methods = makeClientMethods(client);

    setContext<FpjsSvelteContext>(FPJS_CONTEXT, methods);
  }
</script>

<slot />
