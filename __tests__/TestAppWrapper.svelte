<script lang="ts">
  import type { StartOptions } from '@fingerprint/agent'
  import { FingerprintProvider } from '../src/lib'
  import TestApp from './TestApp.svelte'

  export let immediate = true
  export let getDataOptions = {}
  export let providerOptions: StartOptions = {
    apiKey: 'test-api-key',
  }
</script>

<div>
  <FingerprintProvider options={providerOptions}>
    <TestApp {immediate} {getDataOptions} />
  </FingerprintProvider>
</div>
