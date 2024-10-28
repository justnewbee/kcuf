import {
  IKeybinding
} from '../types';

import matchKeybindingKey from './match-keybinding-key';
import matchKeybindingModifiers from './match-keybinding-modifiers';

/**
 * This tells us if a single keyboard event matches a single keybinding press.
 */
export default function matchKeybinding(keybinding: IKeybinding, e: KeyboardEvent): boolean {
  return matchKeybindingKey(keybinding, e) && matchKeybindingModifiers(keybinding, e);
}