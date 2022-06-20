<script lang="ts">
  import FpjsProvider from '../src/providers/FpjsProvider.svelte';
  import { FpjsSvelteOptions } from '../src';
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
