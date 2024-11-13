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

function sleep(time: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, time));
}

describe('Combo', () => {
  test('Hello', () => {
    const comboKeys = 'Hello'.split('');
    const fn = vi.fn();
    
    keymap(comboKeys.join(' '), fn);
    
    comboKeys.forEach(v => {
      fireEvent.keyDown(window, {
        key: v
      });
    });
    
    expect(fn).toHaveBeenCalledTimes(1);
  });
  
  test('C++', () => {
    const fn = vi.fn();
    
    keymap('c + +', fn);
    
    fireEvent.keyDown(window, {
      key: 'C'
    });
    fireEvent.keyDown(window, {
      key: '+'
    });
    fireEvent.keyDown(window, {
      key: '+'
    });
    fireEvent.keyDown(window, {
      key: 'C'
    });
    fireEvent.keyDown(window, {
      key: '+'
    });
    fireEvent.keyDown(window, {
      key: '='
    });
    
    expect(fn).toHaveBeenCalledTimes(1);
  });
  
  test('Konami', () => {
    const fn = vi.fn();
    
    keymap('↑ ↑ ↓ ↓ ← → ← → B A ⏎', fn);
    
    fireEvent.keyDown(window, {
      key: 'ArrowUp'
    });
    fireEvent.keyDown(window, {
      key: 'ArrowUp'
    });
    fireEvent.keyDown(window, {
      key: 'ArrowDown'
    });
    fireEvent.keyDown(window, {
      key: 'ArrowDown'
    });
    fireEvent.keyDown(window, {
      key: 'ArrowLeft'
    });
    fireEvent.keyDown(window, {
      key: 'ArrowRight'
    });
    fireEvent.keyDown(window, {
      key: 'ArrowLeft'
    });
    fireEvent.keyDown(window, {
      key: 'ArrowRight'
    });
    fireEvent.keyDown(window, {
      key: 'B'
    });
    fireEvent.keyDown(window, {
      key: 'A'
    });
    fireEvent.keyDown(window, {
      key: 'Enter'
    });
    
    expect(fn).toHaveBeenCalledTimes(1);
  });
  
  test('Combo timeout', async () => {
    const comboKeys = 'timeout'.split('');
    const fn = vi.fn();
    
    keymap(comboKeys.join(' '), fn, {
      timeout: 80
    });
    
    comboKeys.slice(0, comboKeys.length - 1).forEach(v => {
      fireEvent.keyDown(window, {
        key: v
      });
    });
    
    await sleep(20); // will not timeout
    
    fireEvent.keyDown(window, {
      key: comboKeys.at(-1)
    });
    
    expect(fn).toHaveBeenCalledTimes(1);
    
    comboKeys.slice(0, comboKeys.length - 1).forEach(v => {
      fireEvent.keyDown(window, {
        key: v
      });
    });
    
    await sleep(100); // will timeout
    
    fireEvent.keyDown(window, {
      key: comboKeys.at(-1)
    });
    
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
