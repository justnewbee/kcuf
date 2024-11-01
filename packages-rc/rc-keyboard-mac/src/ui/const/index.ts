import {
  KeyboardCode,
  KeyData
} from '@kcuf/rc-headless-keyboard-mac';

/**
 * Mac 键盘每行键数有 14、13、12、9，需要保证每行左右齐平
 */
export const KEY_SPACING = 2;
export const KEY_PADDING = 8;
export const KEY_WIDTH = 64;
export const KEY_WIDTH_1 = 70; // 宽度 +1，用于 Command
export const KEY_WIDTH_2 = 73; // 宽度 +2，用于 Escape、Backspace、Tab
export const KEY_WIDTH_3 = 102; // 宽度 +3，用于 CapsLock、Enter
export const KEY_WIDTH_4 = 136; // 宽度 +4，用于 Shift
export const KEY_WIDTH_5 = 333; // 宽度 +5，用于 Space
export const KEY_HEIGHT = 64;
export const KEY_HEIGHT_SHORT = 30;
export const KEY_FONT_SIZE = 14;
export const KEYBOARD_PADDING = 10;
export const KEYBOARD_WIDTH = 13 * KEY_WIDTH + KEY_WIDTH_2 + 28 * KEY_SPACING + 2 * KEYBOARD_PADDING;
export const KEYBOARD_HEIGHT = 5 * KEY_HEIGHT + KEY_HEIGHT_SHORT + 12 * KEY_SPACING + 2 * KEYBOARD_PADDING;

export const KEY_DATA_LIST: KeyData[] = [{
  name: 'esc',
  key: 'Escape',
  code: KeyboardCode.ESC
}, {
  name: 'F1',
  code: KeyboardCode.F1
}, {
  name: 'F2',
  code: KeyboardCode.F2
}, {
  name: 'F3',
  code: KeyboardCode.F3
}, {
  name: 'F4',
  code: KeyboardCode.F4
}, {
  name: 'F5',
  code: KeyboardCode.F5
}, {
  name: 'F6',
  code: KeyboardCode.F6
}, {
  name: 'F7',
  code: KeyboardCode.F7
}, {
  name: 'F8',
  code: KeyboardCode.F8
}, {
  name: 'F9',
  code: KeyboardCode.F9
}, {
  name: 'F10',
  code: KeyboardCode.F10
}, {
  name: 'F11',
  code: KeyboardCode.F11
}, {
  name: 'F12',
  code: KeyboardCode.F12
}, {
  name: '〇',
  key: '',
  code: KeyboardCode.POWER
}, {
  key: '`',
  keyShift: '~',
  code: KeyboardCode.BACKQUOTE
}, {
  key: '1',
  keyShift: '!',
  code: KeyboardCode.D1
}, {
  key: '2',
  keyShift: '@',
  code: KeyboardCode.D2
}, {
  key: '3',
  keyShift: '#',
  code: KeyboardCode.D3
}, {
  key: '4',
  keyShift: '$',
  code: KeyboardCode.D4
}, {
  key: '5',
  keyShift: '%',
  code: KeyboardCode.D5
}, {
  key: '6',
  keyShift: '^',
  code: KeyboardCode.D6
}, {
  key: '7',
  keyShift: '&',
  code: KeyboardCode.D7
}, {
  key: '8',
  keyShift: '*',
  code: KeyboardCode.D8
}, {
  name: ['(', '9'],
  key: '9',
  keyShift: '(',
  code: KeyboardCode.D9
}, {
  name: [')', '0'],
  key: '0',
  keyShift: ')',
  code: KeyboardCode.D0
}, {
  name: ['_', '-'],
  key: '-',
  keyShift: '_',
  code: KeyboardCode.MINUS
}, {
  name: ['+', '='],
  key: '=',
  keyShift: '+',
  code: KeyboardCode.EQUAL
}, { // 按 Fn 转成 ⌦ / Delete
  name: '⌫',
  code: KeyboardCode.BACKSPACE
}, {
  name: '⇥',
  code: KeyboardCode.TAB
}, {
  key: 'Q',
  code: KeyboardCode.Q
}, {
  key: 'W',
  code: KeyboardCode.W
}, {
  key: 'E',
  code: KeyboardCode.E
}, {
  key: 'R',
  code: KeyboardCode.R
}, {
  key: 'T',
  code: KeyboardCode.T
}, {
  key: 'Y',
  code: KeyboardCode.Y
}, {
  key: 'U',
  code: KeyboardCode.U
}, {
  key: 'I',
  code: KeyboardCode.I
}, {
  key: 'O',
  code: KeyboardCode.O
}, {
  key: 'P',
  code: KeyboardCode.P
}, {
  key: '[',
  keyShift: '{',
  code: KeyboardCode.BRACKET_LEFT
}, {
  key: ']',
  keyShift: '}',
  code: KeyboardCode.BRACKET_RIGHT
}, {
  key: '\\',
  keyShift: '|',
  code: KeyboardCode.BACKSLASH
}, {
  name: '⇪',
  code: KeyboardCode.CAPS_LOCK
}, {
  key: 'A',
  code: KeyboardCode.A
}, {
  key: 'S',
  code: KeyboardCode.S
}, {
  key: 'D',
  code: KeyboardCode.D
}, {
  key: 'F',
  code: KeyboardCode.F
}, {
  key: 'G',
  code: KeyboardCode.G
}, {
  key: 'H',
  code: KeyboardCode.H
}, {
  key: 'J',
  code: KeyboardCode.J
}, {
  key: 'K',
  code: KeyboardCode.K
}, {
  name: 'L',
  key: 'L',
  code: KeyboardCode.L
}, {
  key: ';',
  keyShift: ':',
  code: KeyboardCode.SEMICOLON
}, {
  key: "'",
  keyShift: '"',
  code: KeyboardCode.QUOTE
}, {
  name: '⏎',
  key: 'Enter',
  code: KeyboardCode.ENTER
}, {
  name: '⇧',
  key: 'Shift',
  code: KeyboardCode.SHIFT_LEFT
}, {
  key: 'Z',
  code: KeyboardCode.Z
}, {
  key: 'X',
  code: KeyboardCode.X
}, {
  key: 'C',
  code: KeyboardCode.C
}, {
  key: 'V',
  code: KeyboardCode.V
}, {
  key: 'B',
  code: KeyboardCode.B
}, {
  key: 'N',
  code: KeyboardCode.N
}, {
  key: 'M',
  code: KeyboardCode.M
}, {
  key: ',',
  keyShift: '<',
  code: KeyboardCode.COMMA
}, {
  key: '.',
  keyShift: '>',
  code: KeyboardCode.PERIOD
}, {
  key: '/',
  keyShift: '?',
  code: KeyboardCode.SLASH
}, {
  name: '⇧',
  key: 'Shift',
  code: KeyboardCode.SHIFT_RIGHT
}, {
  name: 'fn',
  key: '',
  code: KeyboardCode.FN
}, {
  name: ['⌃', 'control'],
  key: 'Control',
  code: KeyboardCode.CONTROL_LEFT
}, {
  name: ['⌥', 'option'],
  key: 'Alt',
  code: KeyboardCode.ALT_LEFT
}, {
  name: ['⌘', 'command'],
  key: 'Meta',
  code: KeyboardCode.META_LEFT
}, {
  key: ' ',
  code: KeyboardCode.SPACE
}, {
  name: ['⌘', 'command'],
  key: 'Meta',
  code: KeyboardCode.META_RIGHT
}, {
  name: ['⌥', 'option'],
  key: 'Alt',
  code: KeyboardCode.ALT_RIGHT
}, {
  name: '◀',
  key: 'ArrowLeft',
  code: KeyboardCode.ARROW_LEFT
}, {
  name: '▲',
  key: 'ArrowUp',
  code: KeyboardCode.ARROW_UP
}, {
  name: '▶',
  key: 'ArrowRight',
  code: KeyboardCode.ARROW_RIGHT
}, {
  name: '▼',
  key: 'ArrowDown',
  code: KeyboardCode.ARROW_DOWN
}];
