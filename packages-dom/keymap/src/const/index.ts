import {
  EModifierKey
} from '../enum';

/**
 * Combo 序列间隔超时时间，超过即取消 Combo。
 */
export const DEFAULT_TIMEOUT = 1000;

export const MODIFIER_ALIAS: Record<string, EModifierKey> = {
  CONTROL: EModifierKey.CONTROL,
  CTRL: EModifierKey.CONTROL,
  '⌃': EModifierKey.CONTROL,
  ALT: EModifierKey.ALT,
  OPTION: EModifierKey.ALT,
  '⌥': EModifierKey.ALT,
  SHIFT: EModifierKey.SHIFT,
  '⇧': EModifierKey.SHIFT,
  META: EModifierKey.META,
  COMMAND: EModifierKey.META,
  CMD: EModifierKey.META,
  '⌘': EModifierKey.META,
  $MOD: /Mac OS X/i.test(navigator.userAgent) ? EModifierKey.META : EModifierKey.CONTROL
};

/**
 * 设置的时候，可以用简化的 Alias 代替 key 值
 */
export const KEY_ALIAS: Record<string, string> = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  '↑': 'ArrowUp',
  '↓': 'ArrowDown',
  '←': 'ArrowLeft',
  '→': 'ArrowRight',
  '↵': 'Enter',
  '↩': 'Enter',
  '⏎': 'Enter',
  SPACE: ' ',
  '␣': ' ',
  '⎋': 'Escape',
  '⇥': 'Tab',
  '⇞': 'PageUp',
  '⇟': 'PageDown',
  '⌫': 'Backspace',
  '⌦': 'Delete'
};

/**
 * 按住 Alt+Shift 的时候，需要通过 `code` 还原真实的 `key`，这里没有字母（字母可以通过 `code` 转换）。
 */
export const CODE_TO_KEYS: Record<string, [string, string]> = {
  Digit1: ['1', '!'],
  Digit2: ['2', '@'],
  Digit3: ['3', '#'],
  Digit4: ['4', '$'],
  Digit5: ['5', '%'],
  Digit6: ['6', '^'],
  Digit7: ['7', '&'],
  Digit8: ['8', '*'],
  Digit9: ['9', '('],
  Digit0: ['0', ')'],
  Backquote: ['`', '~'],
  Minus: ['-', '_'],
  Equal: ['=', '+'],
  BracketLeft: ['[', '{'],
  BracketRight: [']', '}'],
  Backslash: ['\\', '|'],
  Semicolon: [';', ':'],
  Quote: ['\'', '"'],
  Comma: [',', '<'],
  Period: ['.', '>'],
  Slash: ['/', '?']
};
