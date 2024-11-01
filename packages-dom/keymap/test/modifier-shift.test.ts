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

const KEY_A = {
  key: 'A',
  code: 'KeyA'
};
const KEY_A_LOWER = {
  key: 'a',
  code: 'KeyA'
};
const KEY_A_SHIFT = {
  ...KEY_A,
  shiftKey: true
};
const KEY_A_LOWER_SHIFT = {
  ...KEY_A,
  shiftKey: true
};
const KEY_1 = {
  key: '1',
  code: 'Digit1'
};
const KEY_1_SHIFT = {
  key: '!',
  code: 'Digit1',
  shiftKey: true
};

describe('Modifier Shift', () => {
  test('Case insensitive by default', () => {
    const fn = vi.fn();
    
    keymap('a', fn);
    
    fireEvent.keyDown(window, KEY_A);
    fireEvent.keyDown(window, KEY_A_LOWER);
    
    expect(fn).toHaveBeenCalledTimes(2);
  });
  
  test('Case insensitive by default and will not be affected by shift', () => {
    const fn = vi.fn();
    
    keymap('a', fn);
    
    fireEvent.keyDown(window, KEY_A_SHIFT);
    fireEvent.keyDown(window, KEY_A_LOWER_SHIFT);
    
    expect(fn).toHaveBeenCalledTimes(2);
  });
  
  test('A & Shift A', () => {
    const fn = vi.fn();
    const fnShift = vi.fn();
    
    keymap('A', fn);
    keymap('Shift+A', fnShift);
    
    fireEvent.keyDown(window, KEY_A);
    fireEvent.keyDown(window, KEY_A_LOWER);
    
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fnShift).toHaveBeenCalledTimes(0);
    
    fireEvent.keyDown(window, KEY_A_SHIFT);
    fireEvent.keyDown(window, KEY_A_LOWER_SHIFT);
    
    expect(fn).toHaveBeenCalledTimes(4);
    expect(fnShift).toHaveBeenCalledTimes(2);
  });
  
  test('1 & Shift 1', () => {
    const fn = vi.fn();
    const fnShift = vi.fn();
    
    keymap('1', fn);
    keymap('!', fnShift);
    keymap('Shift+1', fnShift);
    keymap('Shift+!', fnShift);
    
    fireEvent.keyDown(window, KEY_1);
    fireEvent.keyDown(window, KEY_1_SHIFT);
    
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fnShift).toHaveBeenCalledTimes(3);
  });
  
  test('/ & ?', () => {
    const fn = vi.fn();
    const fnShift = vi.fn();
    
    keymap('/', fn);
    keymap('?', fnShift);
    keymap('Shift+/', fnShift);
    keymap('Shift+?', fnShift);
    
    fireEvent.keyDown(window, {
      key: '/',
      code: 'Slash'
    });
    fireEvent.keyDown(window, {
      key: '?',
      code: 'Slash',
      shiftKey: true
    });
    
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fnShift).toHaveBeenCalledTimes(3);
  });
});