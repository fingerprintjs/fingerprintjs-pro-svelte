<script lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any */

  import { useVisitorData } from '../src/lib'
  export let immediate = false
  export let ignoreCache = false
  export let getDataOptions: any = {}

  const { getData, data, isLoading, error } = useVisitorData({ extendedResult: true, ignoreCache }, { immediate })
</script>

<div>
  <button id="get_data" on:click={() => getData(getDataOptions)}> Get data </button>
  {#if $isLoading}
    <div id="loading">Loading...</div>
  {/if}
  {#if $error}
    <div id="error">{$error.message}</div>
  {/if}
  {#if $data}
    <pre id="data">
      {JSON.stringify($data, null, 2)}
    </pre>
  {/if}
</div>
