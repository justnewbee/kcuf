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

describe('Modifier Alt', () => {
  test('Alt KeyA-Z', () => {
    const fn = vi.fn();
    
    keymap('Alt+A', fn);
    
    fireEvent.keyDown(window, {
      key: 'å',
      code: 'KeyA',
      altKey: true
    });
    
    expect(fn).toHaveBeenCalledTimes(1);
  });
  
  test('Alt Digit1-9', () => {
    const fn = vi.fn();
    
    keymap('⌥+1', fn);
    
    fireEvent.keyDown(window, {
      key: '¡',
      code: 'Digit1',
      altKey: true
    });
    
    expect(fn).toHaveBeenCalledTimes(1);
  });
  
  // test('Alt Shift Digit1-9', () => {
  //   const fn = vi.fn();
  //
  //   keymap('⌥+@', fn);
  //
  //   fireEvent.keyDown(window, {
  //     key: '€',
  //     code: 'Digit2',
  //     altKey: true,
  //     shiftKey: true
  //   });
  //
  //   expect(fn).toHaveBeenCalledTimes(1);
  // });
});
