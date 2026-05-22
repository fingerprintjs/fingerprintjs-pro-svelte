<!-- Renders useVisitorData state (button, loading, error, data) for component tests.
     Svelte 4 syntax so it compiles under both Svelte 4 and 5. -->
<script lang="ts">
  import { useVisitorData } from '../src/lib'
  export let immediate = true
  export let getDataOptions = {}

  const { getData, data, isLoading, isFetched, error } = useVisitorData({ immediate })

  async function handleClick() {
    try {
      await getData(getDataOptions)
    } catch {
      // Error is stored in the error store; swallow the rethrow for UI handling.
    }
  }
</script>

<div>
  <button id="get_data" on:click={handleClick}> Get data </button>
  {#if $isLoading}
    <div id="loading">Loading...</div>
  {/if}
  {#if $error}
    <div id="error">{$error.message}</div>
  {/if}
  {#if $isFetched}
    <div id="fetched">Fetched</div>
  {/if}
  {#if $data}
    <pre id="data">
      {JSON.stringify($data, null, 2)}
    </pre>
  {/if}
</div>
