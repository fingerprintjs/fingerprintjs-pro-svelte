import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { render } from '@testing-library/svelte'
import { mockGet, mockStart } from './setup'
import { FingerprintProvider } from '../src/lib'
import TestApp from './TestApp.svelte'
import UseVisitorDataWrapper from './UseVisitorDataWrapper.svelte'
import type { UseGetVisitorDataResult } from '../src/lib'

function mountUseVisitorData(hookOptions = { immediate: false }) {
  let api!: UseGetVisitorDataResult

  render(UseVisitorDataWrapper, {
    props: {
      hookOptions,
      onApi: (result: UseGetVisitorDataResult) => {
        api = result
      },
    },
  })

  return { api }
}

describe('FingerprintProvider browser guard', () => {
  beforeEach(() => {
    mockGet.mockReset()
    mockStart.mockClear()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('rejects getData outside the browser before starting the agent', async () => {
    const { api } = mountUseVisitorData()

    vi.stubGlobal('window', undefined)

    await expect(api.getData()).rejects.toThrow(/only be called in the browser/)
    expect(mockStart).not.toHaveBeenCalled()
  })
})

describe('FingerprintProvider validation', () => {
  it('throws when useVisitorData is called without FingerprintProvider', () => {
    expect(() => render(TestApp, { immediate: false })).toThrow(/Fingerprint context is missing/)
  })

  it('rejects the old loadOptions format', () => {
    expect(() =>
      render(FingerprintProvider, { props: { options: { loadOptions: { apiKey: 'test' } } as any } })
    ).toThrow(/loadOptions/)
  })

  it('throws when apiKey is missing', () => {
    expect(() => render(FingerprintProvider, { props: { options: {} as any } })).toThrow(/apiKey/)
  })
})
