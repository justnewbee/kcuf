/**
 * @vitest-environment jsdom
 */
import {
  afterAll,
  describe,
  expect,
  test,
  vi
} from 'vitest';

import {
  render,
  screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import pkgInfo from '../package.json';

import TestComponent from './test-component';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  afterAll(() => {
    vi.clearAllMocks();
  });
  
  test('calls `handler` function when clicked outside target', async () => {
    const handler = vi.fn();
    
    render(<>
      <TestComponent handler={handler} />
      <div data-testid="outside-target" />
    </>);
    
    const target = screen.getByTestId('target');
    const outsideTarget = screen.getByTestId('outside-target');
    
    expect(handler).toHaveBeenCalledTimes(0);
    
    await userEvent.click(target);
    expect(handler).toHaveBeenCalledTimes(0);
    
    await userEvent.click(outsideTarget);
    expect(handler).toHaveBeenCalledTimes(1);
    
    await userEvent.click(outsideTarget);
    expect(handler).toHaveBeenCalledTimes(2);
    
    await userEvent.click(target);
    expect(handler).toHaveBeenCalledTimes(2);
  });
});
