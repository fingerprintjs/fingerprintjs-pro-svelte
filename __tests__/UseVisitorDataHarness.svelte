<script lang="ts">
  import { useVisitorData } from '../src/lib'
  import type { UseVisitorDataOptions } from '../src/lib'

  export let options: UseVisitorDataOptions | undefined = undefined
  export let onApi: (api: ReturnType<typeof useVisitorData>) => void = () => {}

  const api = options === undefined ? useVisitorData() : useVisitorData(options)
  onApi(api)
</script>

<div />
