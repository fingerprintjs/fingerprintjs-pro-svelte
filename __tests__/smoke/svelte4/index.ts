/**
 * Smoke test: verify that the packed tarball can be imported and types resolve
 * when installed alongside Svelte 4.
 */
import { FingerprintProvider, useVisitorData, Fingerprint } from '@fingerprintjs/fingerprintjs-pro-svelte'
import type { FingerprintSvelteOptions, UseVisitorDataOptions } from '@fingerprintjs/fingerprintjs-pro-svelte'

// Type-level assertions — these verify that the types are correctly exported.
const _provider: typeof FingerprintProvider = FingerprintProvider
const _hook: typeof useVisitorData = useVisitorData
const _start: typeof Fingerprint.start = Fingerprint.start

const _opts: FingerprintSvelteOptions = { apiKey: 'test' }
const _hookOpts: UseVisitorDataOptions = { immediate: true }

console.log('Svelte 4 smoke test passed:', typeof _provider, typeof _hook, typeof _start, _opts, _hookOpts)
