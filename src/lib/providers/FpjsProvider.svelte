<script lang="ts">
  import type { FpjsSvelteContext, FpjsSvelteOptions } from '../types';
  import { getOptions } from '../options';
  import { FpjsClient } from '@fingerprintjs/fingerprintjs-pro-spa';
  import { makeClientMethods } from '../client';
  import { setContext } from 'svelte';
  import { FPJS_CONTEXT } from '../symbols';
  /**
   * Required props for the component.
   *
   * @example {
   *     loadOptions: {
   *       apiKey: '<YOUR_API_KEY>'
   *     },
   *   }
   * */
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

<!--
@component
Provides client for usage with FingerprintJS Pro.
Takes options as props.

@see FpjsSvelteOptions

@example
  ```svelte
<script>
  import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-svelte'
  import VisitorData from './VisitorData.svelte'

  const options = {
    loadOptions: {
      apiKey: '<YOUR_API_KEY>'
    },
  };
</script>

<FpjsProvider {options}>
    <VisitorData />
</FpjsProvider>
```
-->
<slot />
