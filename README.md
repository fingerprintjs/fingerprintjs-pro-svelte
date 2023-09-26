<p align="center">
  <a href="https://fingerprint.com">
    <picture>
     <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/fingerprintjs/fingerprintjs-pro-svelte/main/resources/logo_light.svg" />
     <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/fingerprintjs/fingerprintjs-pro-svelte/main/resources/logo_dark.svg" />
      <img src="https://raw.githubusercontent.com/fingerprintjs/fingerprintjs-pro-svelte/main/resources/logo_dark.svg" alt="Fingerprint" width="312px" />
   </picture>
  </a>

</p>
<p align="center">
   <a href="https://github.com/fingerprintjs/fingerprintjs-pro-svelte/actions/workflows/release.yml">
    <img src="https://github.com/fingerprintjs/fingerprintjs-pro-svelte/actions/workflows/release.yml/badge.svg" alt="Release status">
   </a>
<a href="https://github.com/fingerprintjs/fingerprintjs-pro-svelte/actions/workflows/test.yml">
    <img src="https://github.com/fingerprintjs/fingerprintjs-pro-svelte/actions/workflows/test.yml/badge.svg" alt="Tests status">
   </a>
  <a href="https://www.npmjs.com/package/@fingerprintjs/fingerprintjs-pro-svelte">
     <img src="https://img.shields.io/npm/v/@fingerprintjs/fingerprintjs-pro-svelte.svg" alt="Current NPM version">
   </a>
   <a href="https://www.npmjs.com/package/@fingerprintjs/fingerprintjs-pro-svelte">
     <img src="https://img.shields.io/npm/dm/@fingerprintjs/fingerprintjs-pro-svelte.svg" alt="Monthly downloads from NPM">
   </a>
   <a href="https://fingerprintjs.github.io/fingerprintjs-pro-svelte/coverage/">
    <img src="https://fingerprintjs.github.io/fingerprintjs-pro-svelte/coverage/badges.svg" alt="coverage">
   </a>
   <a href="https://opensource.org/licenses/MIT">
     <img src="https://img.shields.io/:license-mit-blue.svg" alt="MIT license">
   </a>
   <a href="https://discord.gg/39EpE2neBg">
     <img src="https://img.shields.io/discord/852099967190433792?style=logo&label=Discord&logo=Discord&logoColor=white" alt="Discord server">
   </a> 
   <a href="https://fingerprintjs.github.io/fingerprintjs-pro-svelte/">
     <img src="https://img.shields.io/badge/-Documentation-green" alt="Discord server">
   </a>
</p>

# FingerprintJS Pro Svelte

[Fingerprint](https://fingerprint.com/) is a device intelligence platform offering 99.5% accurate visitor identification

FingerprintJS Pro Svelte SDK is an easy way to integrate [Fingerprint Pro](https://fingerprint.com/) into your Svelte or [Svelte-kit](https://kit.svelte.dev/) application. See example apps in the [examples](./examples) folder.

## Requirements

- Svelte 3.30.1 or higher
- For TypeScript users: use Typescript 4.8 or higher
- For SvelteKit users: SvelteKit 1.0.0 or higher

This package works with Fingerprint Pro, it is not compatible with open-source FingerprintJS. See our documentation to learn more about the [difference between Fingerprint Pro and the open-source FingerprintJS](https://dev.fingerprint.com/docs/pro-vs-open-source).

## Installation

Yarn:
```shell
yarn add @fingerprintjs/fingerprintjs-pro-svelte
```

Npm:
```shell
npm install @fingerprintjs/fingerprintjs-pro-svelte
```

Pnpm:
```shell
pnpm add @fingerprintjs/fingerprintjs-pro-svelte
```

## Getting started

In order to identify visitors, you'll need a Fingerprint Pro account (you can [sign up for free](https://dashboard.fingerprint.com/signup/)).
To get your API key and get started, see the [Quick start guide in our documentation](https://dev.fingerprint.com/docs/quick-start-guide).

1. Wrap your application (or component) in `FpjsProvider`. You can specify multiple configuration options. Set a [region](https://dev.fingerprint.com/docs/regions) if you have chosen a non-global region during registration. Set `endpoint` and `scriptUrlPattern` if you are using [one of our proxy integrations to increase accuracy](https://dev.fingerprint.com/docs/protecting-the-javascript-agent-from-adblockers) and effectiveness of visitor identification.

```svelte
// App.svelte
<script>
  import { FpjsProvider, /* defaultEndpoint, defaultScriptUrlPattern */  } from '@fingerprintjs/fingerprintjs-pro-svelte'
  import VisitorData from './VisitorData.svelte'

  const options = {
    loadOptions: {
      apiKey: '<YOUR_API_KEY>',
      // region: 'eu',
      // endpoint: ['metrics.yourwebsite.com', defaultEndpoint],
      // scriptUrlPattern: ['metrics.yourwebsite.com/agent-path', defaultScriptUrlPattern],
    },
  };
</script>

<FpjsProvider {options}>
  <VisitorData />
</FpjsProvider>
```

2. Use the `useVisitorData` function in your svelte components to indentify visitors and get the results.

```svelte
// VisitorData.svelte
<script>
  import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-svelte';

  // Set to true fo fetch data when component is mounted
  export let immediate = false;

  const { getData, data, isLoading, error } = useVisitorData({ extendedResult: true }, { immediate });

  $: {
    if ($data) {
      // Do something with visitorData here
    }
  }
</script>

<div>
  <button id='get_data' on:click={() => getData()}> Get data</button>
  {#if $isLoading}
    <div id='loading'>Loading...</div>
  {/if}
  {#if $error}
    <div id='error'>Error occurred: {$error.message}</div>
  {/if}
  {#if $data}
    <div>
      <!--visitorData is available here!-->
    </div>
  {/if}
</div>
```

See the full code in the provided [example applications](./examples).

## Caching strategy

Fingerprint Pro usage is billed per API call. To reduce API calls, it is a good practice to [cache identification results](https://dev.fingerprint.com/docs/caching-visitor-information). The SDK uses SessionStorage to cache results by default.

> :warning: **WARNING** If you use data from `extendedResult`, pay additional attention to the caching strategy. 
>
> Some fields from the [extendedResult](https://dev.fingerprint.com/docs/js-agent#extendedresult) (e.g., `ip` or `lastSeenAt`) might change over time for the same visitor. If you need to get the latest results, pass `{ignoreCache: true}` to the `getData()` function.

## Documentation

See the [generated SDK API reference here](https://fingerprintjs.github.io/fingerprintjs-pro-svelte/).

This library uses Fingerprint Pro JavaScript agent under the hood. See our documentation for the full [JavaScript Agent API reference](https://dev.fingerprint.com/docs/js-agent).

## Error handling

The `getData` function throws errors directly from the JS Agent without changing them. See [JS Agent error handling](https://dev.fingerprint.com/docs/js-agent#error-handling) for more details.

## Support and feedback

To report problems, ask questions or provide feedback, please use [Issues](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/issues). If you need private support, you can email us at [oss-support@fingerprint.com](mailto:oss-support@fingerprint.com).

## License

This project is licensed under the [MIT license](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/blob/main/LICENSE).


