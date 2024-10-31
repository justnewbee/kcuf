/**
 * @vitest-environment jsdom
 */
import {
  describe,
  expect,
  test,
  vi,
  beforeEach,
  afterEach
} from 'vitest';

import {
  fireEvent
} from '@testing-library/dom';

import keymap from '../src';

const fnG = vi.fn();

describe('The return values - false / stop / prevent / others', () => {
  beforeEach(() => {
    window.addEventListener('keydown', fnG);
  });
  
  afterEach(() => {
    window.removeEventListener('keydown', fnG);
    fnG.mockClear();
  });
  
  test('default', () => {
    const fn = vi.fn();
    const release = keymap('a', fn);
    
    expect(fn).toHaveBeenCalledTimes(0);
    expect(fnG).toHaveBeenCalledTimes(0);
    
    fireEvent.keyDown(window, {
      key: 'A'
    });
    
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fnG).toHaveBeenCalledTimes(1);
    
    release();
  });
  
  test('return false', () => {
    const fnFalse = vi.fn().mockImplementation(() => {
      return false;
    });
    const release = keymap('a', fnFalse);
    
    expect(fnFalse).toHaveBeenCalledTimes(0);
    expect(fnG).toHaveBeenCalledTimes(0);
    
    fireEvent.keyDown(window, {
      key: 'A'
    });
    
    expect(fnFalse).toHaveBeenCalledTimes(1);
    expect(fnG).toHaveBeenCalledTimes(0);
    
    release();
  });
  
  test('return stop', () => {
    const fnStop = vi.fn().mockImplementation(() => {
      return 'stop';
    });
    const release = keymap('a', fnStop);
    
    expect(fnStop).toHaveBeenCalledTimes(0);
    expect(fnG).toHaveBeenCalledTimes(0);
    
    fireEvent.keyDown(window, {
      key: 'A'
    });
    
    expect(fnStop).toHaveBeenCalledTimes(1);
    expect(fnG).toHaveBeenCalledTimes(0);
    
    release();
  });
  
  test('return prevent', () => {
    const fnPrevent = vi.fn().mockImplementation(() => {
      return 'prevent';
    });
    const release = keymap('a', fnPrevent);
    
    expect(fnPrevent).toHaveBeenCalledTimes(0);
    expect(fnG).toHaveBeenCalledTimes(0);
    
    fireEvent.keyDown(window, {
      key: 'A'
    });
    
    expect(fnPrevent).toHaveBeenCalledTimes(1);
    expect(fnG).toHaveBeenCalledTimes(1);
    
    release();
  });
});