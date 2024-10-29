import {
  IKeybinding,
  IKeymapCallback
} from '../types';
import {
  DEFAULT_TIMEOUT
} from '../const';

import matchKeybinding from './match-keybinding';
import getModifierState from './get-modifier-state';

/**
 * Creates an event listener for handling keybindings.
 *
 * @example
 * ```js
 * import { createKeybindingsHandler } from "../src/keybindings"
 *
 * let handler = createKeybindingsHandler({
 *    "Shift+d": () => {
 *        alert("The 'Shift' and 'd' keys were pressed at the same time")
 *    },
 *    "y e e t": () => {
 *        alert("The keys 'y', 'e', 'e', and 't' were pressed in order")
 *    },
 *    "$mod+d": () => {
 *        alert("Either 'Control+d' or 'Meta+d' were pressed")
 *    },
 * })
 *
 * window.addEvenListener("keydown", handler)
 * ```
 */
export default function createKeybindingHandler(keybindings: IKeybinding[], callback: IKeymapCallback, timeout = DEFAULT_TIMEOUT): (event: Event) => void {
  const possibleMatches = new Map<IKeybinding[], IKeybinding[]>();
  let timer: ReturnType<typeof setTimeout> | null = null;
  
  return (e: Event) => {
    const prev = possibleMatches.get(keybindings);
    const remainingExpectedPresses = prev || keybindings;
    const currentExpectedPress = remainingExpectedPresses[0];
    const matches = currentExpectedPress ? matchKeybinding(currentExpectedPress, e) : false;
    
    if (!matches) {
      // Modifier keydown events shouldn't break sequences
      // Note: This works because:
      // - non-modifiers will always return false
      // - if the current keypress is a modifier then it will return true when we check its state
      // MDN: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState
      if (!getModifierState(e, e.key)) {
        possibleMatches.delete(keybindings);
      }
    } else if (remainingExpectedPresses.length > 1) {
      possibleMatches.set(keybindings, remainingExpectedPresses.slice(1));
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