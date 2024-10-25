import {
  IKeybinding
} from '../types';
import {
  KEYBINDING_MODIFIER_KEYS
} from '../const';

import getModifierState from './get-modifier-state';
import matchKeybindingKey from './match-keybinding-key';

/**
 * This tells us if a single keyboard event matches a single keybinding press.
 */
export default function matchKeybinding(keybinding: IKeybinding, event: KeyboardEvent): boolean {
  const {
    modifiers,
    key
  } = keybinding;
  
  return matchKeybindingKey(keybinding, event) && !(
    // Ensure all the modifiers in the keybinding are pressed.
    modifiers?.find(v => {
      return !getModifierState(event, v);
    }) ||
    
    // KEYBINDING_MODIFIER_KEYS (Shift/Control/etc.) change the meaning of a keybinding.
    // So if they are pressed but aren't part of the current keybinding press, then we don't have a match.
    KEYBINDING_MODIFIER_KEYS.find(v => {
      return !modifiers?.includes(v) && key !== v && getModifierState(event, v);
    })
  );
}