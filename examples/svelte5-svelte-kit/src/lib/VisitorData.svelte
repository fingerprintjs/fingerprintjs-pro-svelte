<script lang="ts">
  // The SDK exposes Svelte stores (not runes), so we use $store syntax even in Svelte 5.
  // Svelte 5 supports this via its built-in legacy mode.
  import { useVisitorData } from '@fingerprint/svelte'

  const { getData, data, isLoading, error } = useVisitorData({ immediate: false })

  async function handleClick() {
    try {
      await getData()
    } catch {
      // Error is available in the $error store
    }
  }
</script>

<div>
  <button id="get_data" on:click={handleClick}> Get visitor data </button>
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
