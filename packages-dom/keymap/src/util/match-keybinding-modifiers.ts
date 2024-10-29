import _xor from 'lodash/xor';

import {
  EModifierKey
} from '../enum';
import {
  IKeybinding
} from '../types';

import getKeyboardEventModifiers from './get-keyboard-event-modifiers';

export default function matchKeybindingModifiers(keybinding: IKeybinding, e: KeyboardEvent): boolean {
  const {
    modifiers = []
  } = keybinding;
  const eventModifiers = getKeyboardEventModifiers(e);
  
  if (!modifiers.length && eventModifiers.length === 1 && eventModifiers[0] === EModifierKey.SHIFT) {
    return true;
  }
  
  return !_xor(modifiers, getKeyboardEventModifiers(e)).length;
  
  // return !(
  //   // Ensure all the modifiers in the keybinding are pressed.
  //   modifiers?.find(v => {
  //     return !getModifierState(e, v);
  //   }) ||
  //
  //   // KEYBINDING_MODIFIER_KEYS (Shift/Control/etc.) change the meaning of a keybinding.
  //   // So if they are pressed but aren't part of the current keybinding press, then we don't have a match.
  //   KEYBINDING_MODIFIER_KEYS.find(v => {
  //     return !modifiers?.includes(v) && key !== v && getModifierState(e, v);
  //   })
  // );
}