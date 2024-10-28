import {
  IKeybinding
} from '../types';

/**
 * KeyboardEvent.code 对应的符号
 */
const CODE_SYMBOLS: Record<string, string[]> = {
  Backquote: ['`', '~'],
  Digit1: ['!'],
  Digit2: ['@'],
  Digit3: ['#'],
  Digit4: ['$'],
  Digit5: ['%'],
  Digit6: ['^'],
  Digit7: ['&'],
  Digit8: ['*'],
  Digit9: ['('],
  Digit0: [')'],
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
/**
 * KeyboardEvent.code 按 Shift 对应的符号
 */
const CODE_SYMBOLS_SHIFT: Record<string, string> = {
  Backquote: '~',
  Digit1: '!',
  Digit2: '@',
  Digit3: '#',
  Digit4: '$',
  Digit5: '%',
  Digit6: '^',
  Digit7: '&',
  Digit8: '*',
  Digit9: '(',
  Digit0: ')',
  Minus: '_',
  Equal: '+',
  BracketLeft: '{',
  BracketRight: '}',
  Backslash: '|',
  Semicolon: ':',
  Quote: '"',
  Comma: '<',
  Period: '>',
  Slash: '?'
};

function cleanCodeKey(code: string): string | undefined {
  return code.match(/^Key([A-Z])/)?.[1];
}

function cleanCodeDigit(code: string): string | undefined {
  return code.match(/^Digit(\d)/)?.[1];
}

function cleanCodeNumpad(code: string): string | undefined {
  return code.match(/^Numpad(\d)/)?.[1];
}

function cleanCode(code: string): string {
  return cleanCodeKey(code) || cleanCodeDigit(code) || cleanCodeNumpad(code) || code;
}

/**
 * 同时兼容 [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) 和 [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
 */
export default function matchKeybindingKey(keybinding: IKeybinding, e: KeyboardEvent): boolean {
  const {
    key
  } = keybinding;
  const keyU = key.toUpperCase();
  
  if (keyU === e.key.toUpperCase() || keyU === e.code.toUpperCase() || keyU === cleanCode(e.code)) {
    return true;
  }
  
  // 以上逻辑，在有 Shift 或 Alt 的时候，按键不是字母或数字的情况下不能成立，比如 `Shift+/`、`Alt+"` 等，需要进一步处理
  const arr = e.altKey || e.shiftKey ? CODE_SYMBOLS[e.code] : undefined;
  
  return arr ? arr.includes(keyU) : false;
}