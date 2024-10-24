import {
  IKeyBindingHandlerOptions,
  IKeyBindingMap,
  TKeyBindingPress
} from '../types';
import { DEFAULT_TIMEOUT } from '../const';
import parseKeybinding from './parse-key-binding';
import matchKeyBindingPress from './match-key-binding-press';
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
export default function createKeybindingsHandler(
  keyBindingMap: IKeyBindingMap,
  options: IKeyBindingHandlerOptions = {}
): EventListener {
  let timeout = options.timeout ?? DEFAULT_TIMEOUT;
  let keyBindings = Object.keys(keyBindingMap).map(key => {
    return [parseKeybinding(key), keyBindingMap[key]] as const;
  });
  let possibleMatches = new Map<TKeyBindingPress[], TKeyBindingPress[]>();
  let timer: number | null = null;
  
  return event => {
    // Ensure and stop any event that isn't a full keyboard event.
    // Autocomplete option navigation and selection would fire a instanceof Event,
    // instead of the expected KeyboardEvent
    if (!(event instanceof KeyboardEvent)) {
      return;
    }
    
    keyBindings.forEach(keyBinding => {
      let sequence = keyBinding[0];
      let callback = keyBinding[1];
      
      let prev = possibleMatches.get(sequence);
      let remainingExpectedPresses = prev ? prev : sequence;
      let currentExpectedPress = remainingExpectedPresses[0];
      
      let matches = matchKeyBindingPress(event, currentExpectedPress);
      
      if (!matches) {
        // Modifier keydown events shouldn't break sequences
        // Note: This works because:
        // - non-modifiers will always return false
        // - if the current keypress is a modifier then it will return true when we check its state
        // MDN: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState
        if (!getModifierState(event, event.key)) {
          possibleMatches.delete(sequence);
        }
      } else if (remainingExpectedPresses.length > 1) {
        possibleMatches.set(sequence, remainingExpectedPresses.slice(1));
      } else {
        possibleMatches.delete(sequence);
        callback(event);
      }
    });
    
    if (timer) {
      clearTimeout(timer);
    }
    
    timer = setTimeout(possibleMatches.clear.bind(possibleMatches), timeout);
  };
}