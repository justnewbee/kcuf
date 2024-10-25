import {
  IKeyBindingMap,
  IKeymapOptions
} from '../types';
import {
  DEFAULT_EVENT
} from '../const';

import createKeybindingsHandler from './create-key-bindings-handler';

/**
 * Subscribes to keybindings.
 *
 * Returns an unsubscribe method.
 */
export default function keymap(key: string, callback: () => void, {
  target = window,
  event = DEFAULT_EVENT,
  capture,
  timeout
}: IKeymapOptions = {}): () => void {
  const onKeyEvent = createKeybindingsHandler(key, callback, {
    timeout
  });
  
  target.addEventListener(event, onKeyEvent, capture);
  
  return () => target.removeEventListener(event, onKeyEvent, capture);
}