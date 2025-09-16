import {
  TKeymapCallback,
  IKeymapOptions
} from './types';
import {
  createKeybindingsHandler,
  parseKeybindings
} from './util';

/**
 * 绑定 keystroke，返回无参的解绑方法
 *
 * TODO
 *
 * - 批量绑定，即每个 DOM 只一个事件
 * - 带 DOM，即 keymap.bind(dom) → typeof keymap
 */
export default function keymap(keystroke: string, callback: TKeymapCallback, {
  target = window,
  keyup,
  capture = true,
  caseSensitive,
  timeout
}: IKeymapOptions = {}): () => void {
  const type = keyup ? 'keyup' : 'keydown';
  const keybindings = parseKeybindings(keystroke, caseSensitive);
  const handleKeyEvent = createKeybindingsHandler(keybindings, callback, timeout) as (e: Event) => void;
  
  target.addEventListener(type, handleKeyEvent, capture);
  
  return () => target.removeEventListener(type, handleKeyEvent, capture);
}

export {
  EModifierKey as ModifierKey
} from './enum';

export * from './helper';
