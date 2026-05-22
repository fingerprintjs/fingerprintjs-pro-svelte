import { describe, expect, it } from 'vitest'
import { start } from '@fingerprint/agent'
import DefaultProvider, { Fingerprint, FingerprintProvider, FINGERPRINT_CONTEXT, useVisitorData } from '../src/lib'

describe('public API', () => {
  it('exports the provider, hook, and Fingerprint agent namespace from the package entrypoint', () => {
    expect(DefaultProvider).toBe(FingerprintProvider)
    expect(typeof useVisitorData).toBe('function')
    expect(Fingerprint.start).toBe(start)
  })

  it('uses a Symbol for the context key', () => {
    expect(typeof FINGERPRINT_CONTEXT).toBe('symbol')
  })
})
