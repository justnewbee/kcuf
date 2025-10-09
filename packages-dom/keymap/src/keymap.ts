import {
  TKeymapTarget,
  TKeymapCallback,
  TKeymapUnbind,
  IKeymapOptions
} from './types';
import {
  DEFAULT_TIMEOUT
} from './const';
import {
  createKeymapHandler
} from './util';

/**
 * 绑定 keystroke，返回无参的解绑方法
 */
function keymap(keystroke: string, callback: TKeymapCallback, options?: IKeymapOptions): TKeymapUnbind;
function keymap(target: TKeymapTarget, keystroke: string, callback: TKeymapCallback, options?: IKeymapOptions): TKeymapUnbind;

function keymap(...args: [string, TKeymapCallback, IKeymapOptions?] | [TKeymapTarget, string, TKeymapCallback, IKeymapOptions?]): TKeymapUnbind {
  let target: TKeymapTarget;
  let keystroke: string;
  let callback: TKeymapCallback;
  let options: IKeymapOptions | undefined;
  
  if (typeof args[0] === 'string') {
    target = window;
    keystroke = args[0];
    callback = args[1] as TKeymapCallback;
    options = args[2] as IKeymapOptions | undefined;
  } else {
    target = args[0];
    keystroke = args[1] as string;
    callback = args[2] as TKeymapCallback;
    options = args[3];
  }
  
  const {
    keyup,
    capture = true,
    caseSensitive = false,
    timeout = DEFAULT_TIMEOUT
  } = options ?? {};
  const eventType = keyup ? 'keyup' : 'keydown';
  const eventHandler = createKeymapHandler(keystroke, callback, caseSensitive, timeout) as (e: Event) => void;
  
  target.addEventListener(eventType, eventHandler, capture);
  
  return (): void => target.removeEventListener(eventType, eventHandler, capture);
}

export default keymap;
