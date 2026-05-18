<script lang="ts">
  import FingerprintProvider from '../src/lib/providers/FingerprintProvider.svelte'
  import UseVisitorDataHarness from './UseVisitorDataHarness.svelte'
  import type { UseVisitorDataOptions } from '../src/lib/useVisitorData.types'
  import type { UseGetVisitorDataResult } from '../src/lib/useVisitorData.types'

  export let hookOptions: UseVisitorDataOptions = {}
  export let onApi: (api: UseGetVisitorDataResult) => void = () => {}

  const providerOptions = {
    apiKey: 'test-api-key',
  }
</script>

<FingerprintProvider options={providerOptions}>
  <UseVisitorDataHarness options={hookOptions} {onApi} />
</FingerprintProvider>
