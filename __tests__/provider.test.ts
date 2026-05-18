import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { render } from '@testing-library/svelte'
import { mockGet, mockStart } from './setup'
import { makeGetVisitorData } from '../src/lib/client'
import { getOptions } from '../src/lib/config'
import { VERSION, PACKAGE_NAME } from '../src/lib/version'
import FingerprintProvider from '../src/lib/providers/FingerprintProvider.svelte'
import TestApp from './TestApp.svelte'

describe('makeGetVisitorData', () => {
  beforeEach(() => {
    mockGet.mockReset()
    mockStart.mockClear()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('rejects getVisitorData outside the browser before starting the agent', async () => {
    const startOptions = getOptions({ apiKey: 'test-key' }, PACKAGE_NAME, VERSION)
    const getVisitorData = makeGetVisitorData(startOptions)

    vi.stubGlobal('window', undefined)

    await expect(getVisitorData()).rejects.toThrow(/only be called in the browser/)
    expect(mockStart).not.toHaveBeenCalled()
  })

  it('lazily starts the agent on first call and reuses it', async () => {
    const testData = { visitor_id: 'test', event_id: 'e1', sealed_result: null }
    mockGet.mockResolvedValue(testData)

    const startOptions = getOptions({ apiKey: 'test-key' }, PACKAGE_NAME, VERSION)
    const getVisitorData = makeGetVisitorData(startOptions)

    expect(mockStart).not.toHaveBeenCalled()

    await getVisitorData()
    await getVisitorData()

    expect(mockStart).toHaveBeenCalledTimes(1)
  })

  it('preserves existing integrationInfo entries', async () => {
    mockGet.mockResolvedValue({ visitor_id: 'test', event_id: 'e1', sealed_result: null })

    const startOptions = getOptions({ apiKey: 'test-key', integrationInfo: ['custom/1.0'] }, PACKAGE_NAME, VERSION)
    const getVisitorData = makeGetVisitorData(startOptions)

    await getVisitorData()

    expect(mockStart).toHaveBeenCalledWith(
      expect.objectContaining({
        integrationInfo: expect.arrayContaining(['custom/1.0', `${PACKAGE_NAME}/${VERSION}`]),
      })
    )
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
