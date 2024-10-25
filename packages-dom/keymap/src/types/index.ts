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
   * Which dom target to bind the event to. Default is window.
   */
  target?: Window | Document | HTMLElement;
  
  /**
   * Key presses will listen to this event (default: "keydown").
   */
  event?: 'keydown' | 'keyup';
  
  /**
   * Key presses will use a capture listener (default: false)
   */
  capture?: boolean;
}