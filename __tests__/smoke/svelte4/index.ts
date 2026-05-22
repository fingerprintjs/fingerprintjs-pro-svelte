/**
 * Smoke test: verify that every public export from the packed tarball
 * resolves and type-checks when installed alongside Svelte 4.
 *
 * Each assignment below is a type-level assertion: if the export is
 * missing from the tarball or its type signature has drifted, tsc fails.
 */
import { FingerprintProvider, useVisitorData, Fingerprint } from '@fingerprint/svelte'
import type { FingerprintSvelteOptions, UseVisitorDataOptions } from '@fingerprint/svelte'

const _provider: typeof FingerprintProvider = FingerprintProvider
const _hook: typeof useVisitorData = useVisitorData
const _start: typeof Fingerprint.start = Fingerprint.start

const _opts: FingerprintSvelteOptions = { apiKey: 'test' }
const _hookOpts: UseVisitorDataOptions = { immediate: true }

console.log('Svelte 4 smoke test passed:', typeof _provider, typeof _hook, typeof _start, _opts, _hookOpts)
