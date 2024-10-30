import {
  IKeybinding
} from '../types';

import matchKeybindingKey from './match-keybinding-key';
import matchKeybindingModifiers from './match-keybinding-modifiers';

export default function matchKeybinding(e: KeyboardEvent, keybinding: IKeybinding): boolean {
  return matchKeybindingKey(e, keybinding) && matchKeybindingModifiers(e, keybinding);
}