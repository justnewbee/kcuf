import {
  IKeybinding
} from '../types';

import normalizeModifiers from './normalize-modifiers';
import normalizeKey from './normalize-key';

/**
 * 将 keystroke 字符串解析成 Keymap 对象
 *
 * ```
 * keystroke    = `<sequence>`
 * <sequence>   = `<press> <press> <press> ...`
 * <press>      = `<key>` or `<mods>+<key>`
 * <modifiers>  = `<modifier>+<modifier>+...`
 * <key>        = `<KeyboardEvent.key>` or `<KeyboardEvent.code>` (case-insensitive)
 * ```
 *
 * 注意 `+` 和空格有特殊含义，当有 combo 或者 modifier 的时候，需要替换：
 *
 * - 尽量用 `+`，但可以在 Combo 中使用，如 `C + +`
 * - 空格用 `Space` 或 `␣` 替换
 *
 * 单独使用的时候，可以直接用 `+` 或 ` `
 */
export default function parseKeybindings(keystroke: string, caseSensitive?: boolean): IKeybinding[] {
  const result: IKeybinding[] = [];
  
  function push(key?: string, modifiers?: string[]): void {
    if (key) {
      result.push({
        key: normalizeKey(key),
        modifiers: modifiers?.length ? normalizeModifiers(modifiers) : undefined,
        caseSensitive
      });
    }
  }
  
  if (keystroke === '+' || keystroke === ' ' || !/[ +]/.test(keystroke)) {
    push(keystroke);
    
    return result;
  }
  
  keystroke.trim().split(/\s+/).forEach(v => {
    if (v === '+') {
      push(v);
    } else {
      const modifiers = v.split('+'); // /\b\+/ 无法匹配 `⇧+C` 这种
      const key = modifiers.pop();
      
      push(key, modifiers);
    }
  });
  
  return result;
}
