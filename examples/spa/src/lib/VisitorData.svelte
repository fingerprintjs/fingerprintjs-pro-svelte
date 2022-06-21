<script>
  import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-svelte';

  export let immediate = false;

  const { getData, data, isLoading, error } = useVisitorData({ extendedResult: true }, { immediate });
</script>

<div>
  <button id="get_data" on:click={() => getData()}> Get visitor data </button>
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
