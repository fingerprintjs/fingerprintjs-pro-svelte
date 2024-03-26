/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { render } from '@testing-library/svelte'
import TestApp from './TestAppWrapper.svelte'
import { getVisitorData, init } from './setup'
import userEvent from '@testing-library/user-event'

const testData = {
  visitorId: '#visitor_id',
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe('TestApp', () => {
  beforeEach(() => {
    getVisitorData.mockClear()
    init.mockClear()
  })

  it('should show visitor data', async () => {
    const delay = 150

    getVisitorData.mockImplementation(async () => {
      await wait(delay)

      return testData
    })

    const cmp = render(TestApp)

    expect(init).toHaveBeenCalledTimes(1)

    const btn = cmp.container.querySelector('#get_data')!
    await userEvent.click(btn)

    expect(cmp.container.querySelector('#loading')).toBeTruthy()
    await wait(delay + 50)
    expect(cmp.container.querySelector('#loading')).toBeFalsy()

    const data = cmp.container.querySelector('#data')
    expect(data).toBeTruthy()
    expect(data?.innerHTML).toContain(testData.visitorId)
  })

  it('should show errors', async () => {
    getVisitorData.mockRejectedValue(new Error('Error!'))

    const cmp = render(TestApp)

    const btn = cmp.container.querySelector('#get_data')!
    await userEvent.click(btn)

    const errorElement = cmp.container.querySelector('#error')
    expect(errorElement).toBeTruthy()
    expect(errorElement?.textContent).toEqual('Error: Error!')
  })

  describe('Cache', () => {
    it('should ignore cache if it was set to true in useVisitorData', async () => {
      getVisitorData.mockResolvedValue(testData)

      const cmp = render(TestApp, {
        ignoreCache: true,
      })

      const btn = cmp.container.querySelector('#get_data')!
      await userEvent.click(btn)

      const data = cmp.container.querySelector('#data')
      expect(data).toBeTruthy()

      expect(getVisitorData).toHaveBeenCalledTimes(1)
      expect(getVisitorData).toHaveBeenCalledWith({ extendedResult: true }, true)
    })

    it('should not ignore cache if it is set to ignore in useVisitorData and overwritten in getData call', async () => {
      getVisitorData.mockResolvedValue(testData)

      const cmp = render(TestApp, {
        ignoreCache: true,
        immediate: false,
        getDataOptions: {
          ignoreCache: false,
        },
      })

      const btn = cmp.container.querySelector('#get_data')!
      await userEvent.click(btn)

      const data = cmp.container.querySelector('#data')
      expect(data).toBeTruthy()

      expect(getVisitorData).toHaveBeenCalledTimes(1)
      expect(getVisitorData).toHaveBeenCalledWith({ extendedResult: true }, false)
    })
  })
})
