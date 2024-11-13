/**
 * @vitest-environment jsdom
 */
import {
  describe,
  expect,
  test,
  vi
} from 'vitest';

import {
  fireEvent
} from '@testing-library/dom';

import keymap from '../src';

describe('Case sensitive', () => {
  test('caseSensitive from default to true', () => {
    const fnUpper = vi.fn();
    const fnLower = vi.fn();
    
    keymap('a', fnLower, {
      caseSensitive: true
    });
    keymap('A', fnUpper, {
      caseSensitive: true
    });
    
    fireEvent.keyDown(window, {
      key: 'A',
      capsLock: true
    });
    fireEvent.keyDown(window, {
      key: 'a'
    });
    fireEvent.keyDown(window, {
      key: '·',
      code: 'Unknown'
    });
    
    expect(fnUpper).toHaveBeenCalledTimes(1);
    expect(fnLower).toHaveBeenCalledTimes(1);
  });
});
