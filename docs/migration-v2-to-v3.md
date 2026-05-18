# Migrating from v2 to v3

This guide covers breaking changes when upgrading `@fingerprintjs/fingerprintjs-pro-svelte` from v2 (JS Agent v3) to v3 (JS Agent v4).

## JS Agent upgrade (v3 to v4)

The underlying Fingerprint JS Agent has been upgraded from v3 (`@fingerprintjs/fingerprintjs-pro-spa`) to v4 (`@fingerprint/agent`). See the [JS Agent v3 to v4 migration guide](https://docs.fingerprint.com/reference/migrating-from-v3-to-v4) for the full list of agent-level changes.

## Provider changes

The `FpjsProvider` component has been renamed to `FingerprintProvider` with a simplified options format.

**Before (v2):**

```svelte
<script>
  import { FpjsProvider, FingerprintJSPro } from '@fingerprintjs/fingerprintjs-pro-svelte'

  const options = {
    loadOptions: {
      apiKey: '<YOUR_API_KEY>',
      endpoint: ['https://metrics.yourwebsite.com', FingerprintJSPro.defaultEndpoint],
      scriptUrlPattern: [
        'https://metrics.yourwebsite.com/web/v<version>/<apiKey>/loader_v<loaderVersion>.js',
        FingerprintJSPro.defaultScriptUrlPattern,
      ],
      region: 'eu',
    },
  }
</script>

<FpjsProvider {options}>
  <slot />
</FpjsProvider>
```

**After (v3):**

```svelte
<script>
  import { FingerprintProvider } from '@fingerprintjs/fingerprintjs-pro-svelte'

  const options = {
    apiKey: '<YOUR_API_KEY>',
    endpoints: ['https://metrics.yourwebsite.com'],
    region: 'eu',
  }
</script>

<FingerprintProvider {options}>
  <slot />
</FingerprintProvider>
```

Key changes:

- `FpjsProvider` renamed to `FingerprintProvider`
- The `loadOptions` wrapper is removed — pass options directly (flat)
- `FingerprintJSPro.defaultEndpoint` and `FingerprintJSPro.defaultScriptUrlPattern` are no longer needed — the agent automatically falls back to defaults
- `endpoint` renamed to `endpoints` (plural)
- `scriptUrlPattern` removed entirely

## `useVisitorData` changes

The hook now takes a single options object instead of two arguments.

**Before (v2):**

```svelte
<script>
  import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-svelte'

  const { getData, data, isLoading, error } = useVisitorData({ extendedResult: true }, { immediate: true })
</script>
```

**After (v3):**

```svelte
<script>
  import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-svelte'

  const { getData, data, isLoading, isFetched, error } = useVisitorData({
    immediate: true,
  })
</script>
```

Key changes:

- Single options object (merged `GetOptions` + `{ immediate }`)
- New `isFetched` store — `true` after a successful fetch, resets on new calls
- `getData()` now rethrows errors (catch them in your click handlers)
- `ignoreCache` option removed (see caching section below)

## Caching migration

**Caching is now disabled by default.** In v2, results were cached in memory automatically. In v3, you must explicitly configure caching via the `cache` option passed to `FingerprintProvider`. If you relied on the default in-memory cache, add an explicit cache configuration to preserve that behavior.

| v2 (JS Agent v3)                                                       | v3 (JS Agent v4)                                                          |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Cached by default (in-memory)                                          | **No caching by default** — must opt in explicitly                        |
| `cacheLocation: 'memory' \| 'localstorage' \| 'sessionstorage'`        | `cache: { storage: 'sessionStorage', cachePrefix: '...', duration: ... }` |
| `ignoreCache: true` in `useVisitorData` options                        | Removed — no cache to ignore unless explicitly configured                 |
| `LocalStorageCache`, `SessionStorageCache`, `InMemoryCache` re-exports | Removed — configure via `@fingerprint/agent` directly                     |

See the [JS Agent v4 caching documentation](https://docs.fingerprint.com/reference/js-agent-v4#cache) for configuration details.

## Removed exports

The following re-exports from `@fingerprintjs/fingerprintjs-pro-spa` have been removed:

- `FingerprintJSPro` namespace (use `Fingerprint` re-exported from `@fingerprintjs/fingerprintjs-pro-svelte` instead)
- `FpjsClient` class
- `FpjsSvelteContext`, `FpjsVisitorQueryData`, `FpjsSvelteOptions` types (renamed to `FingerprintSvelteContext`, `FingerprintVisitorQueryData`, `FingerprintSvelteOptions`)
- `LocalStorageCache`, `SessionStorageCache`, `InMemoryCache`, `CacheLocation`
- `FpjsProvider` component (renamed to `FingerprintProvider`)
- Granular subpath exports (`/client`, `/types`, `/symbols`, etc.) — import everything from the package root

## Error handling

`getData()` now rethrows errors after storing them in the `error` store (previously it returned `undefined` on failure). If you call `getData()` in a click handler, wrap it in a try/catch.

The `FPJSAgentError` error name rewriting from v2 has been removed — errors now pass through from the JS Agent with their original `name` and `message`. If your code checks `error.name === 'FPJSAgentError'`, update it to use the agent's native error types instead.

```svelte
<script>
  import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-svelte'

  const { getData, data, error } = useVisitorData({ immediate: false })

  async function handleClick() {
    try {
      await getData()
    } catch {
      // Error is available in $error store
    }
  }
</script>

<button on:click={handleClick}>Identify</button>
{#if $error}
  <p>{$error.message}</p>
{/if}
```
