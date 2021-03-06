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
   <a href="https://opensource.org/licenses/MIT">
     <img src="https://img.shields.io/:license-mit-blue.svg" alt="MIT license">
   </a>
   <a href="https://discord.gg/39EpE2neBg">
     <img src="https://img.shields.io/discord/852099967190433792?style=logo&label=Discord&logo=Discord&logoColor=white" alt="Discord server">
   </a>
</p>

# FingerprintJS Pro Svelte

FingerprintJS Pro Svelte is an easy-to-use Svelte library for [FingerprintJS Pro](https://fingerprint.com/) that also
works with [svelte-kit](https://kit.svelte.dev/).
Example apps can be found in the [examples](./examples) folder.
This package works with FingerprintJS Pro, it is not compatible with open-source FingerprintJS. You can learn more about
the difference between FingerprintJS Pro and open-source FingerprintJS in
the [official documentation](https://dev.fingerprint.com/docs/pro-vs-open-source).

## Installation

```shell
yarn add @fingerprintjs/fingerprintjs-pro-svelte
```

Or:

```shell
npm install @fingerprintjs/fingerprintjs-pro-svelte
```

## Getting started

In order to identify visitors, you'll need a FingerprintJS Pro account (you
can [sign up for free](https://dashboard.fingerprint.com/signup/)).
You can learn more about API keys in
the [official FingerprintJS Pro documentation](https://dev.fingerprint.com/docs/quick-start-guide).

1. Wrap your application (or component) in `FpjsProvider`. You can specify multiple configuration options. \
   Set a region if you have chosen a non-global region during registration. Please refer to
   the [Regions page](https://dev.fingerprint.com/docs/regions).

```svelte
// App.svelte
<script>
  import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-svelte'
  import VisitorData from './VisitorData.svelte'

  const options = {
    loadOptions: {
      apiKey: '<YOUR_API_KEY>'
    },
  };
</script>

<FpjsProvider {options}>
  <VisitorData />
</FpjsProvider>
```

2. Use the `useVisitorData` function in your svelte components to perform visitor identification and get the data.

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

See the full code in example apps located in [examples folder](./examples).

## Caching strategy

:warning: **WARNING** If you use data from `extendedResult`, please pay additional attention to caching strategy.

FingerprintJS Pro uses API calls as the basis for billing.
Our [best practices](https://dev.fingerprint.com/docs/caching-visitor-information) strongly recommend using cache to
optimise API calls rate. The Library uses the SessionStorage cache strategy by default.

Some fields from the [extendedResult](https://dev.fingerprint.com/docs/js-agent#extendedresult) (e.g `ip`
or `lastSeenAt`) might change for the same visitor. If you need exact current data, it is recommended to
pass `ignoreCache=true` inside `getData` function.

## Documentation

You can find API reference [here](https://fingerprintjs.github.io/fingerprintjs-pro-svelte/).

This library uses [FingerprintJS Pro agent](https://fingerprint.com/github/) internally. The documentation for the
FingerprintJS Pro agent is available on https://dev.fingerprint.com/docs.
