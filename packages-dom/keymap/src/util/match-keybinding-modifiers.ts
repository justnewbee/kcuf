import _xor from 'lodash/xor';

import {
  EModifierKey
} from '../enum';
import {
  IKeybinding
} from '../types';
import {
  CODE_TO_KEYS
} from '../const';

import isKeyboardEventCodeAlphabet from './is-keyboard-event-code-alphabet';
import getKeyboardEventModifiers from './get-keyboard-event-modifiers';

export default function matchKeybindingModifiers(e: KeyboardEvent, keybinding: IKeybinding): boolean {
  const {
    modifiers = []
  } = keybinding;
  const eventModifiers = getKeyboardEventModifiers(e);
  
  // 只有 Shift 的时候，情况稍稍特殊，字母则返回 true
  if (!modifiers.length && eventModifiers.length === 1 && eventModifiers[0] === EModifierKey.SHIFT) {
    if (isKeyboardEventCodeAlphabet(e)) { // true
      return true;
    }
    
    const keys = CODE_TO_KEYS[e.code];
    
    if (e.key === keys?.[1]) {
      return true;
    }
  }
  
  return !_xor(modifiers, eventModifiers).length;
}
