<script lang="ts">
  import FingerprintProvider from '../src/lib/providers/FingerprintProvider.svelte'
  import TestApp from './TestApp.svelte'

  export let immediate = true
  export let getDataOptions = {}

  const options = {
    apiKey: 'test-api-key',
  }
</script>

<div>
  <FingerprintProvider {options}>
    <TestApp {immediate} {getDataOptions} />
  </FingerprintProvider>
</div>
