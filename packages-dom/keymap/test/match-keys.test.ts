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

describe('Match keys', () => {
  test('KeyA-Z', () => {
    const fn = vi.fn();
    
    keymap('a', fn);
    
    fireEvent.keyDown(window, {
      key: 'A'
    });
    fireEvent.keyDown(window, {
      key: 'a'
    });
    fireEvent.keyDown(window, {
      key: 'B'
    });
    fireEvent.keyDown(window, {
      key: 'C'
    });
    
    expect(fn).toHaveBeenCalledTimes(2);
  });
  
  test('Digit1-9', () => {
    const fn = vi.fn();
    
    keymap('7', fn);
    
    fireEvent.keyDown(window, {
      key: '5'
    });
    fireEvent.keyDown(window, {
      key: '7'
    });
    fireEvent.keyDown(window, {
      key: '&'
    });
    fireEvent.keyDown(window, {
      key: '9'
    });
    
    expect(fn).toHaveBeenCalledTimes(1);
  });
  
  test('DigitF1-12', () => {
    const fn = vi.fn();
    
    keymap('F3', fn);
    
    fireEvent.keyDown(window, {
      key: 'F1'
    });
    fireEvent.keyDown(window, {
      key: 'F3'
    });
    fireEvent.keyDown(window, {
      key: 'F11'
    });
    
    expect(fn).toHaveBeenCalledTimes(1);
  });
  
  test('Functional', () => {
    const fn = vi.fn();
    
    keymap('Enter', fn);
    
    fireEvent.keyDown(window, {
      key: 'Escape'
    });
    fireEvent.keyDown(window, {
      key: 'Enter'
    });
    fireEvent.keyDown(window, {
      key: 'Backspace'
    });
    
    expect(fn).toHaveBeenCalledTimes(1);
  });
  
  test('Symbol', () => {
    const fn = vi.fn();
    
    keymap('&', fn);
    
    fireEvent.keyDown(window, {
      key: '^'
    });
    fireEvent.keyDown(window, {
      key: '&'
    });
    fireEvent.keyDown(window, {
      key: '7'
    });
    fireEvent.keyDown(window, {
      key: '*'
    });
    
    expect(fn).toHaveBeenCalledTimes(1);
  });
  
  test('Symbol 2', () => {
    const fnSlash = vi.fn();
    const fnQuestion = vi.fn();
    
    keymap('/', fnSlash);
    keymap('?', fnQuestion);
    
    fireEvent.keyDown(window, {
      key: '/'
    });
    fireEvent.keyDown(window, {
      key: '?'
    });
    
    expect(fnSlash).toHaveBeenCalledTimes(1);
    expect(fnQuestion).toHaveBeenCalledTimes(1);
  });
});