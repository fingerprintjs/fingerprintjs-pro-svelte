<script lang="ts">
  import FpjsProvider from '../src/lib/providers/FpjsProvider.svelte';
  import { FpjsSvelteOptions, GetDataOptions } from '../src/lib';
  import TestApp from './TestApp.svelte';

  export let ignoreCache = false;
  export let immediate = false;
  export let getDataOptions: GetDataOptions = {};

  const options: FpjsSvelteOptions = {
    loadOptions: {
      apiKey: process.env.API_KEY as string,
    },
  };
</script>

<div>
  <FpjsProvider {options}>
    <TestApp {ignoreCache} {immediate} {getDataOptions} />
  </FpjsProvider>
</div>
