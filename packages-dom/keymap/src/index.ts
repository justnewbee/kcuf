import {
  IKeyBindingMap,
  IKeymapOptions
} from './types';
import {
  createKeybindingsHandler
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
export default function keymap(keyBindingMap: IKeyBindingMap, {
  target = window,
  keyup,
  capture,
  timeout
}: IKeymapOptions = {}): () => void {
  const onKeyEvent = createKeybindingsHandler(keyBindingMap, {timeout});
  
  const event = keyup ? 'keyup' : 'keydown';
  
  target.addEventListener(event, onKeyEvent, capture);
  
  return () => target.removeEventListener(event, onKeyEvent, capture);
}