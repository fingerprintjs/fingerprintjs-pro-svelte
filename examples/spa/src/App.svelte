<script lang="ts">
  import { FingerprintProvider } from '@fingerprintjs/fingerprintjs-pro-svelte'
  import VisitorData from './lib/VisitorData.svelte'

  const options = {
    apiKey: import.meta.env.VITE_API_KEY,
    // cache: {
    //   storage: 'sessionStorage' as const,
    //   duration: 3600,
    // },
  }
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <FingerprintProvider {options}>
    <VisitorData />
  </FingerprintProvider>
</section>
