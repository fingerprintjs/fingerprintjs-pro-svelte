/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { render } from '@testing-library/svelte';
import TestApp from './TestAppWrapper.svelte';
import { getVisitorData, init } from './setup';
import userEvent from '@testing-library/user-event';

const testData = {
  visitorId: '#visitor_id',
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('TestApp', () => {
  it('should show visitor data', async () => {
    const delay = 150;

    getVisitorData.mockImplementation(async () => {
      await wait(delay);

      return testData;
    });

    const cmp = render(TestApp);

    expect(init).toHaveBeenCalledTimes(1);

    const btn = cmp.container.querySelector('#get_data')!;
    await userEvent.click(btn);

    expect(cmp.container.querySelector('#loading')).toBeTruthy();
    await wait(delay + 50);
    expect(cmp.container.querySelector('#loading')).toBeFalsy();

    const data = cmp.container.querySelector('#data');
    expect(data).toBeTruthy();
    expect(data?.innerHTML).toMatchInlineSnapshot(`
      "      {
        \\"visitorId\\": \\"#visitor_id\\"
      }
          "
    `);
  });

  it('should show errors', async () => {
    getVisitorData.mockRejectedValue(new Error('Error!'));

    const cmp = render(TestApp);

    const btn = cmp.container.querySelector('#get_data')!;
    await userEvent.click(btn);

    const errorElement = cmp.container.querySelector('#error');
    expect(errorElement).toBeTruthy();
    expect(errorElement?.textContent).toEqual('Error: Error!');
  });
});
