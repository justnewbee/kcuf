import {
  EKeyboardCode
} from '../enum';
import {
  IKeyData
} from '../types';

/**
 * Mac 键盘每行键数有 14、13、12、9，需要保证每行左右齐平
 */
export const KEY_SPACING = 2;
export const KEY_WIDTH = 64;
export const KEY_WIDTH_1 = 70; // 宽度 +1，用于 Command
export const KEY_WIDTH_2 = 73; // 宽度 +2，用于 Escape、Backspace、Tab
export const KEY_WIDTH_3 = 102; // 宽度 +3，用于 CapsLock、Enter
export const KEY_WIDTH_4 = 136; // 宽度 +4，用于 Shift
export const KEY_WIDTH_5 = 333; // 宽度 +5，用于 Space
export const KEY_HEIGHT = 64;
export const KEY_HEIGHT_SHORT = 30;
export const KEYBOARD_PADDING = 10;
export const KEYBOARD_WIDTH = 13 * KEY_WIDTH + KEY_WIDTH_2 + 28 * KEY_SPACING + 2 * KEYBOARD_PADDING;
export const KEYBOARD_HEIGHT = 5 * KEY_HEIGHT + KEY_HEIGHT_SHORT + 12 * KEY_SPACING + 2 * KEYBOARD_PADDING;

export const KEY_DATA_LIST: IKeyData[] = [{
  name: 'esc',
  key: 'Escape',
  code: EKeyboardCode.ESC
}, {
  name: 'F1',
  code: EKeyboardCode.F1
}, {
  name: 'F2',
  code: EKeyboardCode.F2
}, {
  name: 'F3',
  code: EKeyboardCode.F3
}, {
  name: 'F4',
  code: EKeyboardCode.F4
}, {
  name: 'F5',
  code: EKeyboardCode.F5
}, {
  name: 'F6',
  code: EKeyboardCode.F6
}, {
  name: 'F7',
  code: EKeyboardCode.F7
}, {
  name: 'F8',
  code: EKeyboardCode.F8
}, {
  name: 'F9',
  code: EKeyboardCode.F9
}, {
  name: 'F10',
  code: EKeyboardCode.F10
}, {
  name: 'F11',
  code: EKeyboardCode.F11
}, {
  name: 'F12',
  code: EKeyboardCode.F12
}, {
  name: '〇',
  key: '',
  code: EKeyboardCode.POWER
}, {
  key: '`',
  keyShift: '~',
  code: EKeyboardCode.BACKQUOTE
}, {
  key: '1',
  keyShift: '!',
  code: EKeyboardCode.D1
}, {
  key: '2',
  keyShift: '@',
  code: EKeyboardCode.D2
}, {
  key: '3',
  keyShift: '#',
  code: EKeyboardCode.D3
}, {
  key: '4',
  keyShift: '$',
  code: EKeyboardCode.D4
}, {
  key: '5',
  keyShift: '%',
  code: EKeyboardCode.D5
}, {
  key: '6',
  keyShift: '^',
  code: EKeyboardCode.D6
}, {
  key: '7',
  keyShift: '&',
  code: EKeyboardCode.D7
}, {
  key: '8',
  keyShift: '*',
  code: EKeyboardCode.D8
}, {
  name: ['(', '9'],
  key: '9',
  keyShift: '(',
  code: EKeyboardCode.D9
}, {
  name: [')', '0'],
  key: '0',
  keyShift: ')',
  code: EKeyboardCode.D0
}, {
  name: ['_', '-'],
  key: '-',
  keyShift: '_',
  code: EKeyboardCode.MINUS
}, {
  name: ['+', '='],
  key: '=',
  keyShift: '+',
  code: EKeyboardCode.EQUAL
}, { // 按 Fn 转成 ⌦ / Delete
  name: '⌫',
  code: EKeyboardCode.BACKSPACE
}, {
  name: '⇥',
  code: EKeyboardCode.TAB
}, {
  key: 'Q',
  code: EKeyboardCode.Q
}, {
  key: 'W',
  code: EKeyboardCode.W
}, {
  key: 'E',
  code: EKeyboardCode.E
}, {
  key: 'R',
  code: EKeyboardCode.R
}, {
  key: 'T',
  code: EKeyboardCode.T
}, {
  key: 'Y',
  code: EKeyboardCode.Y
}, {
  key: 'U',
  code: EKeyboardCode.U
}, {
  key: 'I',
  code: EKeyboardCode.I
}, {
  key: 'O',
  code: EKeyboardCode.O
}, {
  key: 'P',
  code: EKeyboardCode.P
}, {
  key: '[',
  keyShift: '{',
  code: EKeyboardCode.BRACKET_LEFT
}, {
  key: ']',
  keyShift: '}',
  code: EKeyboardCode.BRACKET_RIGHT
}, {
  key: '\\',
  keyShift: '|',
  code: EKeyboardCode.BACKSLASH
}, {
  name: '⇪',
  code: EKeyboardCode.CAPS_LOCK
}, {
  key: 'A',
  code: EKeyboardCode.A
}, {
  key: 'S',
  code: EKeyboardCode.S
}, {
  key: 'D',
  code: EKeyboardCode.D
}, {
  key: 'F',
  code: EKeyboardCode.F
}, {
  key: 'G',
  code: EKeyboardCode.G
}, {
  key: 'H',
  code: EKeyboardCode.H
}, {
  key: 'J',
  code: EKeyboardCode.J
}, {
  key: 'K',
  code: EKeyboardCode.K
}, {
  name: 'L',
  key: 'L',
  code: EKeyboardCode.L
}, {
  key: ';',
  keyShift: ':',
  code: EKeyboardCode.SEMICOLON
}, {
  key: "'",
  keyShift: '"',
  code: EKeyboardCode.QUOTE
}, {
  name: '⏎',
  key: 'Enter',
  code: EKeyboardCode.ENTER
}, {
  name: '⇧',
  key: 'Shift',
  code: EKeyboardCode.SHIFT_LEFT
}, {
  key: 'Z',
  code: EKeyboardCode.Z
}, {
  key: 'X',
  code: EKeyboardCode.X
}, {
  key: 'C',
  code: EKeyboardCode.C
}, {
  key: 'V',
  code: EKeyboardCode.V
}, {
  key: 'B',
  code: EKeyboardCode.B
}, {
  key: 'N',
  code: EKeyboardCode.N
}, {
  key: 'M',
  code: EKeyboardCode.M
}, {
  key: ',',
  keyShift: '<',
  code: EKeyboardCode.COMMA
}, {
  key: '.',
  keyShift: '>',
  code: EKeyboardCode.PERIOD
}, {
  key: '/',
  keyShift: '?',
  code: EKeyboardCode.SLASH
}, {
  name: '⇧',
  key: 'Shift',
  code: EKeyboardCode.SHIFT_RIGHT
}, {
  name: 'fn',
  key: '',
  code: EKeyboardCode.FN
}, {
  name: ['⌃', 'control'],
  key: 'Control',
  code: EKeyboardCode.CTRL_LEFT
}, {
  name: ['⌥', 'option'],
  key: 'Alt',
  code: EKeyboardCode.ALT_LEFT
}, {
  name: ['⌘', 'command'],
  key: 'Meta',
  code: EKeyboardCode.META_LEFT
}, {
  key: ' ',
  code: EKeyboardCode.SPACE
}, {
  name: ['⌘', 'command'],
  key: 'Meta',
  code: EKeyboardCode.META_RIGHT
}, {
  name: ['⌥', 'option'],
  key: 'Alt',
  code: EKeyboardCode.ALT_RIGHT
}, {
  name: '◀',
  key: 'ArrowLeft',
  code: EKeyboardCode.ARROW_LEFT
}, {
  name: '▲',
  key: 'ArrowUp',
  code: EKeyboardCode.ARROW_UP
}, {
  name: '▶',
  key: 'ArrowRight',
  code: EKeyboardCode.ARROW_RIGHT
}, {
  name: '▼',
  key: 'ArrowDown',
  code: EKeyboardCode.ARROW_DOWN
}];
