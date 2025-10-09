import {
  TKeymapTarget,
  TKeymapCallback,
  TKeymapUnbind,
  IKeymapOptions
} from '../types';

import createKeymapHandler from './create-keymap-handler';

/**
 * 绑定 `keystroke` 到 `target`
 */
export default function keymapOnTarget(target: TKeymapTarget, keystroke: string, callback: TKeymapCallback, options: IKeymapOptions = {}): TKeymapUnbind {
  const {
    keyup,
    capture = true
  } = options;
  const eventType = keyup ? 'keyup' : 'keydown';
  const eventHandler = createKeymapHandler(keystroke, callback, options) as (e: Event) => void;
  
  target.addEventListener(eventType, eventHandler, capture);
  
  return (): void => target.removeEventListener(eventType, eventHandler, capture);
}
