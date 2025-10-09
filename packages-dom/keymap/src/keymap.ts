import {
  TKeymapTarget,
  TKeymapCallback,
  TKeymapUnbind,
  IKeymapOptions
} from './types';
import {
  keymapOnTarget
} from './util';

/**
 * 绑定 `keystroke` 到 `window`
 */
function keymap(keystroke: string, callback: TKeymapCallback, options?: IKeymapOptions): TKeymapUnbind;
/**
 * 绑定 `keystroke` 到 `target`
 */
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
  
  return keymapOnTarget(target, keystroke, callback, options);
}

/**
 * 绑定 `keystroke` 到 `window` 或指定的 `target`，返回无参的解绑方法
 */
export default keymap;
