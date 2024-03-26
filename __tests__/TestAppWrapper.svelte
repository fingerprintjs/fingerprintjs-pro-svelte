<script lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any */

  import FpjsProvider from '../src/lib/providers/FpjsProvider.svelte'
  import TestApp from './TestApp.svelte'

  export let ignoreCache = false
  export let immediate = false
  export let getDataOptions: any = {}

  const options = {
    loadOptions: {
      apiKey: process.env.API_KEY as string,
    },
  }
</script>

<div>
  <FpjsProvider {options}>
    <TestApp {ignoreCache} {immediate} {getDataOptions} />
  </FpjsProvider>
</div>
