import {
  EModifier
} from '../enum';

/**
 * A single press of a keybinding sequence
 */
export type TKeyBindingPress = [mods: string[], key: string | RegExp]

export interface IKeybindingParseResult {
  modifiers: EModifier[];
  key: string | RegExp;
}

export interface IKeymapOptions {
  /**
   * 事件绑在哪个 DOM 上，默认 `window`，也可以指定为 `document`（和 `window` 等价）或特定 DOM。
   */
  target?: Window | Document | HTMLElement;
  /**
   * 是否使用 `keyup` 事件，默认用 `keydown` 事件，不会用到其他事件，`keypress` 已经被标注弃用，因此也不会再支持。
   */
  keyup?: boolean;
  /**
   * 是否时间捕获，默认 true
   */
  capture?: boolean;
  /**
   * Combo 的超时设置，默认 1000ms
   *
   * **Note:** 不建议太小，比如 300 就可能对大多数用户来说太快了
   */
  timeout?: number;
}