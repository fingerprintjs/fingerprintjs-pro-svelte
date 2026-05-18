<script lang="ts">
  import { useVisitorData } from '../src/lib'
  import type { UseVisitorDataOptions } from '../src/lib/useVisitorData.types'

  export let options: UseVisitorDataOptions = {}
  export let onApi: (api: ReturnType<typeof useVisitorData>) => void = () => {}

  const api = useVisitorData(options)
  onApi(api)
</script>

<div />
