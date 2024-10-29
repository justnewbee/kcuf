import {
  IKeymapCallback,
  IKeymapOptions
} from './types';
import {
  createKeybindingsHandler,
  parseKeybindings
} from './util';

/**
 * 绑定 keystroke，返回无参的解绑方法。
 */
export default function keymap(keystroke: string, callback: IKeymapCallback, {
  target = window,
  keyup,
  capture = true,
  // caseSensitive,
  timeout
}: IKeymapOptions = {}): () => void {
  const type = keyup ? 'keyup' : 'keydown';
  const handleKeyEvent = createKeybindingsHandler(parseKeybindings(keystroke), callback, timeout);
  
  target.addEventListener(type, handleKeyEvent, capture);
  
  return () => target.removeEventListener(type, handleKeyEvent, capture);
}