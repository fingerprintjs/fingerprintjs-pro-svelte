import { describe, it, expect, beforeEach } from 'vitest'
import { render } from '@testing-library/svelte'
import TestApp from './TestAppWrapper.svelte'
import { mockGet, mockStart } from './setup'
import userEvent from '@testing-library/user-event'
import { VERSION, PACKAGE_NAME } from '../src/lib/version'

const testData = {
  visitor_id: '#visitor_id',
  event_id: 'test-event-id',
  sealed_result: null,
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe('FingerprintProvider + useVisitorData', () => {
  beforeEach(() => {
    mockGet.mockReset()
    mockStart.mockClear()
  })

  it('should show visitor data', async () => {
    const delay = 150

    mockGet.mockImplementation(async () => {
      await wait(delay)
      return testData
    })

    const cmp = render(TestApp, { immediate: false })

    const btn = cmp.container.querySelector('#get_data')!
    await userEvent.click(btn)

    expect(cmp.container.querySelector('#loading')).toBeTruthy()
    await wait(delay + 50)
    expect(cmp.container.querySelector('#loading')).toBeFalsy()

    const data = cmp.container.querySelector('#data')
    expect(data).toBeTruthy()
    expect(data?.innerHTML).toContain(testData.visitor_id)
  })

  it('should show errors', async () => {
    mockGet.mockRejectedValue(new Error('Error!'))

    const cmp = render(TestApp, { immediate: false })

    const btn = cmp.container.querySelector('#get_data')!
    await userEvent.click(btn)

    await wait(50)

    const errorElement = cmp.container.querySelector('#error')
    expect(errorElement).toBeTruthy()
    expect(errorElement?.textContent).toEqual('Error!')
  })

  it('should set isFetched after successful fetch', async () => {
    mockGet.mockResolvedValue(testData)

    const cmp = render(TestApp, { immediate: false })

    expect(cmp.container.querySelector('#fetched')).toBeFalsy()

    const btn = cmp.container.querySelector('#get_data')!
    await userEvent.click(btn)

    expect(cmp.container.querySelector('#fetched')).toBeTruthy()
  })

  it('should append integrationInfo when the agent starts', async () => {
    mockGet.mockResolvedValue(testData)

    const cmp = render(TestApp, { immediate: false })

    expect(mockStart).not.toHaveBeenCalled()

    const btn = cmp.container.querySelector('#get_data')!
    await userEvent.click(btn)

    expect(mockStart).toHaveBeenCalledTimes(1)
    expect(mockStart).toHaveBeenCalledWith(
      expect.objectContaining({
        apiKey: 'test-api-key',
        integrationInfo: expect.arrayContaining([`${PACKAGE_NAME}/${VERSION}`]),
      })
    )
  })

  it('should reuse agent on subsequent calls', async () => {
    mockGet.mockResolvedValue(testData)

    const cmp = render(TestApp, { immediate: false })

    const btn = cmp.container.querySelector('#get_data')!
    await userEvent.click(btn)
    await userEvent.click(btn)

    expect(mockStart).toHaveBeenCalledTimes(1)
  })
})
