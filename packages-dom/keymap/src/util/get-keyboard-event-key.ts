import {
  CODE_TO_KEYS
} from '../const';

import isKeyboardEventCodeAlphabet from './is-keyboard-event-code-alphabet';

/**
 * 获取 KeyboardEvent 对应的 key，这里将去除 altKey 带来的副作用
 */
export default function getKeyboardEventKey(e: KeyboardEvent): string {
  const capsLock = e.getModifierState('CapsLock');
  const keyIsAlphabet = isKeyboardEventCodeAlphabet(e);
  let eventKey = e.key;
  
  // MAC 下 CapsLock + Shift 没有反转大写效果，这里仅处理字母
  if (capsLock && e.shiftKey && keyIsAlphabet) {
    eventKey = eventKey.toLowerCase();
  }
  
  if (!e.altKey) {
    return eventKey;
  }
  
  if (keyIsAlphabet) { // 字母正常化，使用 code 去其前缀，并取正确的大小写
    const key = e.code.replace('Key', ''); // 大写
    const inCaps = capsLock ? !e.shiftKey : e.shiftKey;

    return inCaps ? key : key.toLowerCase();
  }
  
  const keys = CODE_TO_KEYS[e.code];
  
  if (keys) {
    return e.shiftKey ? keys[1] : keys[0];
  }
  
  return e.key;
}
