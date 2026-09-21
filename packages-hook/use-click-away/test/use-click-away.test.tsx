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

import {
  DATA_KEY_CLICK_AWAY_IGNORE
} from '../src';

import TestComponent from './test-component';

describe('useClickAway', () => {
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
  
  test('does not call handler when clicking element with DATA_KEY_CLICK_AWAY_IGNORE', async () => {
    const handler = vi.fn();
    
    render(<>
      <TestComponent handler={handler} />
      <div data-testid="ignored" {...{
        [DATA_KEY_CLICK_AWAY_IGNORE]: ''
      }} />
      <div data-testid="not-ignored" />
    </>);
    
    const ignored = screen.getByTestId('ignored');
    const notIgnored = screen.getByTestId('not-ignored');
    
    expect(handler).toHaveBeenCalledTimes(0);
    
    await userEvent.click(ignored);
    expect(handler).toHaveBeenCalledTimes(0);
    
    await userEvent.click(notIgnored);
    expect(handler).toHaveBeenCalledTimes(1);
  });
  
  test('does not call handler when clicking element with matching DATA_KEY_CLICK_AWAY_IGNORE value', async () => {
    const handler = vi.fn();
    
    render(<>
      <TestComponent handler={handler} ignore="my-ignore" />
      <div data-testid="matching-ignore" {...{
        [DATA_KEY_CLICK_AWAY_IGNORE]: 'my-ignore'
      }} />
      <div data-testid="different-ignore" {...{
        [DATA_KEY_CLICK_AWAY_IGNORE]: 'other-ignore'
      }} />
      <div data-testid="no-ignore" />
    </>);
    
    const matchingIgnore = screen.getByTestId('matching-ignore');
    const differentIgnore = screen.getByTestId('different-ignore');
    const noIgnore = screen.getByTestId('no-ignore');
    
    expect(handler).toHaveBeenCalledTimes(0);
    
    await userEvent.click(matchingIgnore);
    expect(handler).toHaveBeenCalledTimes(0);
    
    await userEvent.click(differentIgnore);
    expect(handler).toHaveBeenCalledTimes(1);
    
    await userEvent.click(noIgnore);
    expect(handler).toHaveBeenCalledTimes(2);
  });
});
