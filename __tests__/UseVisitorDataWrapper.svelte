<!-- FingerprintProvider + UseVisitorDataHarness. Mount point for hook-level tests.
     Svelte 4 syntax so it compiles under both Svelte 4 and 5. -->
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
