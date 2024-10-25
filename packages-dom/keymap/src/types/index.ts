/**
 * A single press of a keybinding sequence
 */
export type TKeyBindingPress = [mods: string[], key: string | RegExp]

/**
 * A map of keybinding strings to event handlers.
 */
export interface IKeyBindingMap {
  [keybinding: string]: (event: KeyboardEvent) => void;
}

export interface IKeyBindingHandlerOptions {
  /**
   * Keybinding sequences will wait this long between key presses before
   * cancelling (default: 1000).
   *
   * **Note:** Setting this value too low (i.e. `300`) will be too fast for many
   * of your users.
   */
  timeout?: number;
}

/**
 * Options to configure the behavior of keybindings.
 */
export interface IKeymapOptions extends IKeyBindingHandlerOptions {
  /**
   * 事件绑在哪个 DOM 上，默认 `window`，也可以指定为 `document`（和 `window` 等价）或特定 DOM。
   */
  target?: Window | Document | HTMLElement;
  /**
   * 是否使用 `keyup` 事件，默认用 `keydown` 事件，不会用到其他事件，`keypress` 已经被标注弃用，因此也不会再支持。
   */
  keyup?: boolean;
  
  /**
   * Key presses will use a capture listener (default: false)
   */
  capture?: boolean;
}