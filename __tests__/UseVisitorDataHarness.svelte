<!-- Calls useVisitorData() and exposes the API via onApi callback. No UI.
     Svelte 4 syntax so it compiles under both Svelte 4 and 5. -->
<script lang="ts">
  import { useVisitorData } from '../src/lib'
  import type { UseVisitorDataOptions } from '../src/lib'

  export let options: UseVisitorDataOptions | undefined = undefined
  export let onApi: (api: ReturnType<typeof useVisitorData>) => void = () => {}

  const api = options === undefined ? useVisitorData() : useVisitorData(options)
  onApi(api)
</script>

<div></div>
