<script>
  import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-svelte';
  import VisitorData from '../lib/VisitorData.svelte';

  const options = {
    loadOptions: {
      apiKey: import.meta.env.VITE_API_KEY,
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
