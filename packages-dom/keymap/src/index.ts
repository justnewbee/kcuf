import {
  IKeymapOptions
} from './types';
import {
  createKeybindingsHandler,
  parseKeybindings
} from './util';

/**
 * Subscribes to keybindings.
 *
 * Returns an unsubscribe method.
 *
 * @example
 * ```js
 * import { tinykeys } from "../src"
 *
 * tinykeys(window, {
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
 * ```
 */
export default function keymap(keystroke: string, callback, {
  target = window,
  keyup,
  capture = true,
  caseSensitive,
  timeout
}: IKeymapOptions = {}): () => void {
  const type = keyup ? 'keyup' : 'keydown';
  const handleKeyEvent = createKeybindingsHandler(parseKeybindings(keystroke), callback, timeout);
  
  target.addEventListener(type, handleKeyEvent, capture);
  
  return () => target.removeEventListener(type, handleKeyEvent, capture);
}