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

describe('Space and plus sign has special meanings', () => {
  test('Solo use of space', () => {
    const fn = vi.fn();
    
    keymap(' ', fn);
    
    fireEvent.keyDown(window, {
      key: ' '
    });
    
    expect(fn).toHaveBeenCalledTimes(1);
  });
  
  test('Solo use of space', () => {
    const fn = vi.fn();
    
    keymap('Space', fn);
    
    fireEvent.keyDown(window, {
      key: ' '
    });
    
    expect(fn).toHaveBeenCalledTimes(1);
  });
  
  test('Alt space', () => {
    const fn = vi.fn();
    
    keymap('Alt+␣', fn);
    keymap('Alt+Space', fn);
    
    fireEvent.keyDown(window, {
      key: ' ',
      altKey: true
    });
    
    expect(fn).toHaveBeenCalledTimes(2);
  });
  
  test('Solo use off +', () => {
    const fn = vi.fn();
    
    keymap('+', fn);
    
    fireEvent.keyDown(window, {
      key: '+',
      code: 'Equal',
      shiftKey: true
    });
    
    expect(fn).toHaveBeenCalledTimes(1);
  });
});