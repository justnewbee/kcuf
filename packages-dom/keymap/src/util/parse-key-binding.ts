import {
  IKeybinding
} from '../types';

import normalizeModifiers from './normalize-modifiers';
import normalizeKey from './normalize-key';

/**
 * Parses a "Key Binding String" into its parts
 *
 * keystroke    = `<sequence>`
 * <sequence>   = `<press> <press> <press> ...`
 * <press>      = `<key>` or `<mods>+<key>`
 * <modifiers>  = `<modifier>+<modifier>+...`
 * <key>        = `<KeyboardEvent.key>` or `<KeyboardEvent.code>` (case-insensitive)
 *
 * 注意 `+` 和空格有特殊含义，当有 combo 或者 modifier 的时候，需要替换：
 *
 * - `+` 用 `Plus` 替换
 * - 空格 用 `Space` 或 `␣` 替换
 *
 * 单独使用的时候，可以直接用 `+` 或 ` `
 */
export default function parseKeybinding(keystroke: string): IKeybinding[] {
  if (keystroke === '+' || keystroke === ' ' || !/[ +]/.test(keystroke)) {
    return [{
      key: normalizeKey(keystroke)
    }];
  }
  
  return keystroke.trim().split(/\s+/).reduce((result: IKeybinding[], v) => {
    if (!v) {
      return result;
    }
    
    const modifiers = v.split('+'); // /\b\+/ 无法匹配 `⇧+C` 这种
    const key = modifiers.pop();
    
    if (key) {
      result.push({
        modifiers: normalizeModifiers(modifiers),
        key: normalizeKey(key)
      });
    }
    
    return result;
  }, []);
}