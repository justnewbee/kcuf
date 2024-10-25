import {
  IKeybindingParseResult,
  TKeyBindingPress
} from '../types';
import {
  KEYBINDING_MODIFIER_KEYS
} from '../const';

import getModifierState from './get-modifier-state';

/**
 * This tells us if a single keyboard event matches a single keybinding press.
 */
export default function matchKeyBindingPress(event: KeyboardEvent, o: IKeybindingParseResult): boolean {
  const {
    modifiers,
    key
  } = o;
  
  return !(
    // Allow either the `event.key` or the `event.code`
    // MDN event.key: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
    // MDN event.code: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
    (
      key instanceof RegExp ? !(key.test(event.key) || key.test(event.code)) :
        (key.toUpperCase() !== event.key.toUpperCase() &&
          key !== event.code)
    ) ||
    
    // Ensure all the modifiers in the keybinding are pressed.
    modifiers.find(mod => {
      return !getModifierState(event, mod);
    }) ||
    
    // KEYBINDING_MODIFIER_KEYS (Shift/Control/etc) change the meaning of a
    // keybinding. So if they are pressed but aren't part of the current
    // keybinding press, then we don't have a match.
    KEYBINDING_MODIFIER_KEYS.find(v => {
      return !modifiers.includes(v) && key !== v && getModifierState(event, v);
    })
  );
}