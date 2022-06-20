<script context="module" lang="ts">
  export const prerender = false;
</script>

<script lang="ts">
  import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-svelte';
  import VisitorData from '../lib/VisitorData.svelte';

  const options = {
    loadOptions: {
      apiKey: 'KCgNWtQyyOrqloz8PkFv',
    },
  };
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <FpjsProvider {options}>
    <VisitorData />
  </FpjsProvider>
</section>
