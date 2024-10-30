import {
  IKeybinding,
  IKeymapCallback
} from '../types';
import {
  DEFAULT_TIMEOUT
} from '../const';

import matchKeybinding from './match-keybinding';

export default function createKeybindingHandler(keybindings: IKeybinding[], callback: IKeymapCallback, timeout = DEFAULT_TIMEOUT): (e: KeyboardEvent) => void {
  const possibleMatches = new Map<IKeybinding[], IKeybinding[]>();
  let timer: ReturnType<typeof setTimeout> | null = null;
  
  return (e: KeyboardEvent) => {
    const prevKeybinding = possibleMatches.get(keybindings);
    const remainingKeybindings = prevKeybinding || keybindings;
    const currentKeybinding = remainingKeybindings[0];
    const matched = currentKeybinding ? matchKeybinding(e, currentKeybinding) : false;
    
    if (!matched) {
      // Modifier keydown events shouldn't break sequences
      // Note: This works because:
      // - non-modifiers will always return false
      // - if the current keypress is a modifier then it will return true when we check its state
      if (!e.getModifierState(e.key)) {
        possibleMatches.delete(keybindings);
      }
    } else if (remainingKeybindings.length > 1) {
      possibleMatches.set(keybindings, remainingKeybindings.slice(1));
    } else {
      possibleMatches.delete(keybindings);
      
      const callbackResult = callback();
      
      if (callbackResult === false) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
    
    if (timer) {
      clearTimeout(timer);
    }
    
    timer = setTimeout(possibleMatches.clear.bind(possibleMatches), timeout);
  };
}