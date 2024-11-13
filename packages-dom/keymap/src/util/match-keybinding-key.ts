import {
  EModifierKey
} from '../enum';
import {
  IKeybinding
} from '../types';
import {
  CODE_TO_KEYS
} from '../const';

import getKeyboardEventKey from './get-keyboard-event-key';

/**
 * 同时兼容 [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) 和 [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
 */
export default function matchKeybindingKey(e: KeyboardEvent, keybinding: IKeybinding): boolean {
  const {
    key,
    caseSensitive,
    modifiers
  } = keybinding;
  const modifierHasShift = modifiers?.includes(EModifierKey.SHIFT);
  const eventKey = getKeyboardEventKey(e);
  
  if (caseSensitive && /^[A-Z]$/i.test(eventKey)) {
    return key === eventKey;
  }
  
  const keyU = key.toUpperCase();
  
  if (keyU === eventKey.toUpperCase()) {
    return true;
  }
  
  // 若有 Shift 的情况下，应支持 `Shift+x` === `Shift+X`，`Shift+/` === `Shift+?`
  if (!modifierHasShift || !e.shiftKey) {
    return false;
  }
  
  return (CODE_TO_KEYS[e.code] || [] as string[]).includes(key);
}
