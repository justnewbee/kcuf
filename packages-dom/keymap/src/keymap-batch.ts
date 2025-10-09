import _map from 'lodash/map';

import {
  TKeymapTarget,
  TKeymapCallback,
  TKeymapUnbind,
  IKeymapOptions,
  TKeymapBatch
} from './types';
import {
  keymapOnTarget
} from './util';

/**
 * 批量绑定 `keystroke` 到 `window` 或指定的 `target`，返回无参的解绑方法
 */
export default function keymapBatch(batch: TKeymapBatch, target: TKeymapTarget = window): TKeymapUnbind {
  const unbindArr = _map(batch, (v, keystroke) => {
    let callback: TKeymapCallback;
    let options: IKeymapOptions | undefined;
    
    if (typeof v === 'function') {
      callback = v;
    } else {
      [callback, options] = v;
    }
    
    return keymapOnTarget(target, keystroke, callback, options);
  });
  
  return () => unbindArr.forEach(v => v());
}
