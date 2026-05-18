import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { render } from '@testing-library/svelte'
import { get } from 'svelte/store'
import { mockGet, mockStart } from './setup'
import UseVisitorDataWrapper from './UseVisitorDataWrapper.svelte'
import type { UseGetVisitorDataResult } from '../src/lib/useVisitorData.types'

const testData = {
  visitor_id: '#visitor_id',
  event_id: 'test-event-id',
  sealed_result: null,
}

function mountUseVisitorData(hookOptions = {}) {
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

describe('useVisitorData', () => {
  beforeEach(() => {
    mockGet.mockReset()
    mockStart.mockClear()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('rejects imperative getData() and stores the error', async () => {
    const testError = new Error('Test error')
    mockGet.mockRejectedValue(testError)

    const { api } = mountUseVisitorData({ immediate: false })

    await expect(api.getData()).rejects.toThrow('Test error')

    expect(get(api.error)).toBe(testError)
    expect(get(api.isFetched)).toBe(false)
    expect(get(api.isLoading)).toBe(false)
  })

  it('normalizes non-Error rejections into Error objects', async () => {
    mockGet.mockRejectedValue('string error')

    const { api } = mountUseVisitorData({ immediate: false })

    await expect(api.getData()).rejects.toThrow('string error')

    expect(get(api.error)).toBeInstanceOf(Error)
    expect(get(api.error)?.message).toBe('string error')
    expect(get(api.isFetched)).toBe(false)
  })

  it('resets isFetched and data when a new fetch begins', async () => {
    mockGet.mockResolvedValue(testData)

    const { api } = mountUseVisitorData({ immediate: false })

    await api.getData()
    expect(get(api.isFetched)).toBe(true)
    expect(get(api.data)).toEqual(testData)

    const delayed = new Promise((resolve) => setTimeout(() => resolve(testData), 100))
    mockGet.mockReturnValueOnce(delayed)

    const pending = api.getData()

    expect(get(api.isFetched)).toBe(false)
    expect(get(api.data)).toBeUndefined()
    expect(get(api.isLoading)).toBe(true)

    await pending

    expect(get(api.isFetched)).toBe(true)
    expect(get(api.data)).toEqual(testData)
  })

  it('merges default options with per-call options', async () => {
    mockGet.mockResolvedValue(testData)

    const { api } = mountUseVisitorData({ immediate: false, tag: 'default-tag', linkedId: 'default-link' })

    await api.getData({ tag: 'override-tag' })

    expect(mockGet).toHaveBeenCalledWith({ tag: 'override-tag', linkedId: 'default-link' })
  })

  it('passes default options when no per-call options given', async () => {
    mockGet.mockResolvedValue(testData)

    const { api } = mountUseVisitorData({ immediate: false, linkedId: 'my-link' })

    await api.getData()

    expect(mockGet).toHaveBeenCalledWith({ linkedId: 'my-link' })
  })

  it('provides fresh data after a failed fetch', async () => {
    mockGet.mockRejectedValueOnce(new Error('fail'))

    const { api } = mountUseVisitorData({ immediate: false })

    await expect(api.getData()).rejects.toThrow('fail')

    mockGet.mockResolvedValueOnce(testData)

    await expect(api.getData()).resolves.toEqual(testData)

    expect(get(api.data)).toEqual(testData)
    expect(get(api.error)).toBeUndefined()
    expect(get(api.isFetched)).toBe(true)
  })

  // Note: immediate=true (onMount) tests are not feasible with @testing-library/svelte v4 + jsdom.
  // The onMount lifecycle does not flush async operations in this environment.
  // The immediate path is a thin wrapper around getData() which is thoroughly tested above.
})
