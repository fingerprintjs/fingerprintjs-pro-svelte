<script lang="ts">
  import FpjsProvider from '../src/lib/providers/FpjsProvider.svelte';
  import { FpjsSvelteOptions } from '../src/lib';
  import TestApp from './TestApp.svelte';

  const options: FpjsSvelteOptions = {
    loadOptions: {
      apiKey: process.env.API_KEY as string,
    },
  };
</script>

<div>
  <FpjsProvider {options}>
    <TestApp />
  </FpjsProvider>
</div>
