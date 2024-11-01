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

describe('Modifiers', () => {
  test('Control / Alt / Shift / Meta', () => {
    const fnCtrl = vi.fn();
    const fnCtrlAlt = vi.fn();
    const fnCtrlShift = vi.fn();
    const fnCtrlMeta = vi.fn();
    const fnCtrlAltShift = vi.fn();
    const fnCtrlAltMeta = vi.fn();
    const fnCtrlShiftMeta = vi.fn();
    const fnCtrlAltShiftMeta = vi.fn();
    
    const fnAlt = vi.fn();
    const fnAltShift = vi.fn();
    const fnAltMeta = vi.fn();
    const fnAltShiftMeta = vi.fn();
    
    const fnShift = vi.fn();
    const fnShiftMeta = vi.fn();
    
    const fnMeta = vi.fn();
    
    keymap('Control+a', fnCtrl);
    keymap('CONTROL+A', fnCtrl);
    keymap('ctrl+a', fnCtrl);
    keymap('⌃+a', fnCtrl);
    
    keymap('⌃+⌥+a', fnCtrlAlt);
    keymap('⌃+⇧+a', fnCtrlShift);
    keymap('⌃+⌘+a', fnCtrlMeta);
    keymap('⌃+⌥+⇧+a', fnCtrlAltShift);
    keymap('⌃+⌥+⌘+a', fnCtrlAltMeta);
    keymap('⌃+⇧+⌘+a', fnCtrlShiftMeta);
    keymap('⌃+⌥+⇧+⌘+a', fnCtrlAltShiftMeta);
    
    keymap('Alt+a', fnAlt);
    keymap('ALT+A', fnAlt);
    keymap('option+a', fnAlt);
    keymap('⌥+a', fnAlt);
    
    keymap('⌥+⇧+a', fnAltShift);
    keymap('⌥+⌘+a', fnAltMeta);
    keymap('⌥+⇧+⌘+a', fnAltShiftMeta);
    
    keymap('Shift+A', fnShift);
    keymap('SHIFT+a', fnShift);
    keymap('shift+a', fnShift);
    keymap('⇧+a', fnShift);
    
    keymap('⇧+⌘+a', fnShiftMeta);
    
    keymap('Command+a', fnMeta);
    keymap('command+a', fnMeta);
    keymap('CMD+A', fnMeta);
    keymap('⌘+a', fnMeta);
    
    fireEvent.keyDown(window, {
      key: 'A'
    });
    fireEvent.keyDown(window, {
      ...KEY_A,
      ctrlKey: true
    });
    fireEvent.keyDown(window, {
      ...KEY_A,
      ctrlKey: true,
      altKey: true
    });
    fireEvent.keyDown(window, {
      ...KEY_A,
      ctrlKey: true,
      shiftKey: true
    });
    fireEvent.keyDown(window, {
      ...KEY_A,
      ctrlKey: true,
      metaKey: true
    });
    fireEvent.keyDown(window, {
      ...KEY_A,
      ctrlKey: true,
      altKey: true,
      shiftKey: true
    });
    fireEvent.keyDown(window, {
      ...KEY_A,
      ctrlKey: true,
      altKey: true,
      metaKey: true
    });
    fireEvent.keyDown(window, {
      ...KEY_A,
      ctrlKey: true,
      shiftKey: true,
      metaKey: true
    });
    fireEvent.keyDown(window, {
      ...KEY_A,
      ctrlKey: true,
      altKey: true,
      shiftKey: true,
      metaKey: true
    });
    
    fireEvent.keyDown(window, {
      ...KEY_A,
      altKey: true
    });
    fireEvent.keyDown(window, {
      ...KEY_A,
      altKey: true,
      shiftKey: true
    });
    fireEvent.keyDown(window, {
      ...KEY_A,
      altKey: true,
      metaKey: true
    });
    fireEvent.keyDown(window, {
      ...KEY_A,
      altKey: true,
      shiftKey: true,
      metaKey: true
    });
    
    fireEvent.keyDown(window, {
      ...KEY_A,
      shiftKey: true
    });
    fireEvent.keyDown(window, {
      ...KEY_A,
      shiftKey: true,
      metaKey: true
    });
    
    fireEvent.keyDown(window, {
      ...KEY_A,
      metaKey: true
    });
    
    expect(fnCtrl).toHaveBeenCalledTimes(4);
    expect(fnCtrlAlt).toHaveBeenCalledTimes(1);
    expect(fnCtrlAltShift).toHaveBeenCalledTimes(1);
    expect(fnCtrlAltMeta).toHaveBeenCalledTimes(1);
    expect(fnCtrlAltShiftMeta).toHaveBeenCalledTimes(1);
    expect(fnCtrlShift).toHaveBeenCalledTimes(1);
    expect(fnCtrlShiftMeta).toHaveBeenCalledTimes(1);
    expect(fnCtrlMeta).toHaveBeenCalledTimes(1);
    
    expect(fnAlt).toHaveBeenCalledTimes(4);
    expect(fnAltShift).toHaveBeenCalledTimes(1);
    expect(fnAltShiftMeta).toHaveBeenCalledTimes(1);
    expect(fnAltMeta).toHaveBeenCalledTimes(1);
    
    expect(fnShift).toHaveBeenCalledTimes(4);
    expect(fnShiftMeta).toHaveBeenCalledTimes(1);
    
    expect(fnMeta).toHaveBeenCalledTimes(4);
  });
});