import {
  EKeyboardCode
} from '../enum';
import {
  IKeyData
} from '../types';

export const KEY_DATA_LIST: IKeyData[] = [{
  name: 'esc',
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
  code: EKeyboardCode.POWER
}, {
  name: ['~', '`'],
  code: EKeyboardCode.BACKQUOTE
}, {
  name: ['!', '1'],
  code: EKeyboardCode.D1
}, {
  name: ['@', '2'],
  code: EKeyboardCode.D2
}, {
  name: ['#', '3'],
  code: EKeyboardCode.D3
}, {
  name: ['$', '4'],
  code: EKeyboardCode.D4
}, {
  name: ['%', '5'],
  code: EKeyboardCode.D5
}, {
  name: ['^', '6'],
  code: EKeyboardCode.D6
}, {
  name: ['&', '7'],
  code: EKeyboardCode.D7
}, {
  name: ['*', '8'],
  code: EKeyboardCode.D8
}, {
  name: ['(', '9'],
  code: EKeyboardCode.D9
}, {
  name: [')', '0'],
  code: EKeyboardCode.D0
}, {
  name: ['_', '-'],
  code: EKeyboardCode.MINUS
}, {
  name: ['+', '='],
  code: EKeyboardCode.EQUAL
}, { // 按 Fn 转成 ⌦ / Delete
  name: '⌫',
  code: EKeyboardCode.BACKSPACE
}, {
  name: '⇥',
  code: EKeyboardCode.TAB
}, {
  name: 'Q',
  code: EKeyboardCode.Q
}, {
  name: 'W',
  code: EKeyboardCode.W
}, {
  name: 'E',
  code: EKeyboardCode.E
}, {
  name: 'R',
  code: EKeyboardCode.R
}, {
  name: 'T',
  code: EKeyboardCode.T
}, {
  name: 'Y',
  code: EKeyboardCode.Y
}, {
  name: 'U',
  code: EKeyboardCode.U
}, {
  name: 'I',
  code: EKeyboardCode.I
}, {
  name: 'O',
  code: EKeyboardCode.O
}, {
  name: 'P',
  code: EKeyboardCode.P
}, {
  name: ['{', '['],
  code: EKeyboardCode.BRACKET_LEFT
}, {
  name: ['}', ']'],
  code: EKeyboardCode.BRACKET_RIGHT
}, {
  name: ['|', '\\'],
  code: EKeyboardCode.BACKSLASH
}, {
  name: '⇪',
  code: EKeyboardCode.CAPS_LOCK
}, {
  name: 'A',
  code: EKeyboardCode.A
}, {
  name: 'S',
  code: EKeyboardCode.S
}, {
  name: 'D',
  code: EKeyboardCode.D
}, {
  name: 'F',
  code: EKeyboardCode.F
}, {
  name: 'G',
  code: EKeyboardCode.G
}, {
  name: 'H',
  code: EKeyboardCode.H
}, {
  name: 'J',
  code: EKeyboardCode.J
}, {
  name: 'K',
  code: EKeyboardCode.K
}, {
  name: 'L',
  code: EKeyboardCode.L
}, {
  name: [':', ';'],
  code: EKeyboardCode.SEMICOLON
}, {
  name: ['"', "'"],
  code: EKeyboardCode.QUOTE
}, {
  name: '⏎',
  code: EKeyboardCode.ENTER
}, {
  name: '⇧',
  code: EKeyboardCode.SHIFT_LEFT
}, {
  name: 'Z',
  code: EKeyboardCode.Z
}, {
  name: 'X',
  code: EKeyboardCode.X
}, {
  name: 'C',
  code: EKeyboardCode.C
}, {
  name: 'V',
  code: EKeyboardCode.V
}, {
  name: 'B',
  code: EKeyboardCode.B
}, {
  name: 'N',
  code: EKeyboardCode.N
}, {
  name: 'M',
  code: EKeyboardCode.M
}, {
  name: ['<', ','],
  code: EKeyboardCode.COMMA
}, {
  name: ['>', '.'],
  code: EKeyboardCode.PERIOD
}, {
  name: ['?', '/'],
  code: EKeyboardCode.SLASH
}, {
  name: '⇧',
  code: EKeyboardCode.SHIFT_RIGHT
}, {
  name: 'fn',
  code: EKeyboardCode.FN
}, {
  name: ['⌃', 'control'],
  code: EKeyboardCode.CTRL_LEFT
}, {
  name: ['⌥', 'option'],
  code: EKeyboardCode.ALT_LEFT
}, {
  name: ['⌘', 'command'],
  code: EKeyboardCode.META_LEFT
}, {
  name: [' '],
  code: EKeyboardCode.SPACE
}, {
  name: ['⌘', 'command'],
  code: EKeyboardCode.META_RIGHT
}, {
  name: ['⌥', 'option'],
  code: EKeyboardCode.ALT_RIGHT
}, {
  name: '◀',
  code: EKeyboardCode.ARROW_LEFT
}, {
  name: '▲',
  code: EKeyboardCode.ARROW_UP
}, {
  name: '▶',
  code: EKeyboardCode.ARROW_RIGHT
}, {
  name: '▼',
  code: EKeyboardCode.ARROW_DOWN
}];
