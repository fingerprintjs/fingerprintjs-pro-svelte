<script lang="ts">
  import type { FingerprintSvelteContext, FingerprintSvelteOptions } from '../types'
  import { getOptions } from '../config'
  import { makeGetVisitorData } from '../client'
  import { setContext } from 'svelte'
  import { FINGERPRINT_CONTEXT } from '../symbols'
  import { VERSION, INTEGRATION_INFO_PACKAGE_NAME } from '../version'

  export let options: FingerprintSvelteOptions

  if (options && 'loadOptions' in options) {
    throw new Error(
      'The "loadOptions" option has been removed. Pass options directly to FingerprintProvider, e.g. { apiKey: "..." } instead of { loadOptions: { apiKey: "..." } }. See the migration guide for details.'
    )
  }

  if (!options?.apiKey) {
    throw new Error('FingerprintProvider requires an apiKey. Pass { apiKey: "..." } in the options prop.')
  }

  const startOptions = getOptions(options, INTEGRATION_INFO_PACKAGE_NAME, VERSION)
  const getVisitorData = makeGetVisitorData(startOptions)

  setContext<FingerprintSvelteContext>(FINGERPRINT_CONTEXT, { getVisitorData })
</script>

<slot />
