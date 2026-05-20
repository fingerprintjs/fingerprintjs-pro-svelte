<script lang="ts">
  import { FingerprintProvider } from '../src/lib'
  import UseVisitorDataHarness from './UseVisitorDataHarness.svelte'
  import type { UseGetVisitorDataResult, UseVisitorDataOptions } from '../src/lib'

  export let hookOptions: UseVisitorDataOptions | undefined = undefined
  export let onApi: (api: UseGetVisitorDataResult) => void = () => {}

  const providerOptions = {
    apiKey: 'test-api-key',
  }
</script>

<FingerprintProvider options={providerOptions}>
  <UseVisitorDataHarness options={hookOptions} {onApi} />
</FingerprintProvider>
