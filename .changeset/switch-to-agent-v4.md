---
'@fingerprintjs/fingerprintjs-pro-svelte': major
---

Switch to JS Agent v4 (`@fingerprint/agent`). This is a breaking change.

- `FpjsProvider` renamed to `FingerprintProvider` with flat options (no `loadOptions` wrapper)
- `useVisitorData` takes a single merged options object instead of two arguments
- `getData()` now rethrows errors after storing them in the error store
- Added `isFetched` store to track successful fetches
- Removed cache-related exports (`LocalStorageCache`, `SessionStorageCache`, `InMemoryCache`, `CacheLocation`, `ignoreCache`)
- Removed granular subpath exports — import everything from the package root
- Removed `FingerprintJSPro` namespace re-export (use `Fingerprint` from `@fingerprint/agent`)
